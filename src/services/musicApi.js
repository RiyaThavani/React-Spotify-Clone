const SEARCH_URL = 'https://itunes.apple.com/search';
const catalogCache = new Map();

const normalize = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');

export async function getSongPreview(song) {
  if (catalogCache.has(song.id)) {
    return { ...song, ...(await catalogCache.get(song.id)) };
  }

  const request = fetchSongMetadata(song);
  catalogCache.set(song.id, request);

  try {
    return { ...song, ...(await request) };
  } catch (error) {
    catalogCache.delete(song.id);
    throw error;
  }
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
  const response = await fetch(`${SEARCH_URL}?${params}`);

  if (!response.ok) {
    throw new Error('Music search is unavailable.');
  }

  const { results = [] } = await response.json();
  const title = normalize(song.title);
  const result = results.find(item =>
    item.previewUrl && normalize(item.trackName || '').includes(title)
  ) || results.find(item => item.previewUrl);

  if (!result) {
    throw new Error(`No playable preview was found for ${song.title}.`);
  }

  return {
    artist: result.artistName || song.artist,
    image: (result.artworkUrl100 || song.image || '').replace('100x100bb', '600x600bb'),
    previewUrl: result.previewUrl,
    storeUrl: result.trackViewUrl,
  };
}
