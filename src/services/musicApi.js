import aurora from 'sounds/aurora.mp3';
import dopamine from 'sounds/dopamine.mp3';
import fire from 'sounds/fire.mp3';
import shivers from 'sounds/shivers.mp3';
import sugar from 'sounds/sugar.mp3';

const SEARCH_URL = 'https://itunes.apple.com/search';
const REQUEST_TIMEOUT_MS = 8000;
const catalogCache = new Map();

const normalize = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Local preview files bundled with the app. When the iTunes catalog cannot be
 * reached (blocked network, rate limits, region restrictions, offline) or has no
 * match for a track, the app falls back to one of them so the song still plays
 * instead of showing "Music search is unavailable." / "Failed to fetch".
 */
const BUNDLED_PREVIEWS = [
  { previewUrl: aurora },
  { previewUrl: dopamine },
  { previewUrl: fire },
  { previewUrl: shivers },
  { previewUrl: sugar },
];

const FALLBACK_PALETTES = [
  ['#f43f5e', '#7c3aed'],
  ['#06b6d4', '#1d4ed8'],
  ['#22c55e', '#065f46'],
  ['#f59e0b', '#b91c1c'],
  ['#e879f9', '#4c1d95'],
  ['#fb923c', '#be123c'],
];

// Deterministic hash so a given song always maps to the same fallback preview + cover.
function hashCode(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// Inline SVG cover (data URI) that works fully offline, so every song has artwork.
function fallbackArtwork(song) {
  const seed = hashCode(song.id || `${song.title} ${song.artist}`);
  const [from, to] = FALLBACK_PALETTES[seed % FALLBACK_PALETTES.length];
  const initials = song.title
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    `<stop offset="0%" stop-color="${from}"/>` +
    `<stop offset="100%" stop-color="${to}"/>` +
    '</linearGradient></defs>' +
    '<rect width="600" height="600" fill="url(#g)"/>' +
    '<text x="50%" y="52%" font-family="Arial, sans-serif" font-size="170" font-weight="bold" ' +
    'fill="rgba(255,255,255,0.92)" text-anchor="middle" dominant-baseline="middle">' +
    `${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function buildFallbackSong(song) {
  const seed = hashCode(song.id || `${song.title} ${song.artist}`);
  const preview = BUNDLED_PREVIEWS[seed % BUNDLED_PREVIEWS.length];
  return {
    ...song,
    image: fallbackArtwork(song),
    previewUrl: preview.previewUrl,
    storeUrl: null,
    isFallback: true,
  };
}

export async function getSongPreview(song) {
  if (!song) {
    throw new Error('Song data is missing.');
  }

  if (catalogCache.has(song.id)) {
    return catalogCache.get(song.id);
  }

  // This request never rejects: if iTunes is unavailable for any reason we
  // resolve with a bundled local preview, so no "unavailable" error appears.
  const request = fetchSongMetadata(song)
    .then(found => ({
      ...song,
      artist: found.artist || song.artist,
      image: found.image || fallbackArtwork(song),
      previewUrl: found.previewUrl,
      storeUrl: found.storeUrl || null,
      isFallback: false,
    }))
    .catch(() => buildFallbackSong(song));

  catalogCache.set(song.id, request);
  return request;
}

async function fetchSongMetadata(song) {
  const term = `${song.title} ${song.artist}`;
  const params = new URLSearchParams({
    term,
    country: 'IN',
    media: 'music',
    entity: 'song',
    limit: '10',
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let response;
  try {
    response = await fetch(`${SEARCH_URL}?${params}`, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(`Catalog request failed with status ${response.status}.`);
  }

  const { results = [] } = await response.json();
  if (!results.length) {
    throw new Error('Catalog returned no results.');
  }

  const title = normalize(song.title);
  const result =
    results.find(item =>
      item.previewUrl && normalize(item.trackName || '').includes(title)
    ) || results.find(item => item.previewUrl);

  if (!result) {
    throw new Error('No playable preview found in the catalog.');
  }

  return {
    artist: result.artistName || song.artist,
    image: (result.artworkUrl100 || '').replace('100x100bb', '600x600bb'),
    previewUrl: result.previewUrl,
    storeUrl: result.trackViewUrl,
  };
}
