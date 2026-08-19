import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Section from 'components/Section.js';
import songs from 'data/songs';

const GENRES = ['Featured', 'Bollywood', 'English', 'Hip-Hop', 'Electronic', 'Punjabi', 'Rock', 'R&B'];

const GENRE_LABELS = {
  Featured:   'Featured tracks',
  Bollywood:  '🎵 Bollywood Hits',
  English:    '🎧 English Pop',
  'Hip-Hop':  '🔥 Hip-Hop',
  Electronic: '⚡ Electronic',
  Punjabi:    '🥁 Punjabi Beats',
  Rock:       '🎸 Rock Classics',
  'R&B':      '🎶 R&B & Soul',
};

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function Home() {
  const likedSongIds = useSelector(state => state.likes.likedSongIds)
  const playlists = useSelector(state => state.playlists.playlists)

  const likedSongs = useMemo(
    () => songs.filter(song => likedSongIds.includes(song.id)),
    [likedSongIds]
  )

  const quickAccess = useMemo(() => {
    const items = []
    if (likedSongs.length > 0) {
      items.push({
        id: 'liked',
        name: 'Liked Songs',
        image: `https://misc.scdn.co/liked-songs/liked-songs-640.png`,
        to: '/collection/liked',
      })
    }
    playlists.slice(0, 6).forEach(playlist => {
      const first = playlist.songIds
        .map(id => songs.find(s => s.id === id))
        .find(Boolean)
      items.push({
        id: playlist.id,
        name: playlist.name,
        image: first?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(playlist.name)}&background=1db954&color=000`,
        to: `/playlist/${playlist.id}`,
      })
    })
    return items
  }, [likedSongs, playlists])

  const madeForYou = useMemo(() => {
    const shuffled = [...songs].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 6)
  }, [])

  const recentlyPlayed = useMemo(() => {
    const shuffled = [...songs].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 6)
  }, [])

  return (
    <div>
      {/* ── Greeting & Quick Access ── */}
      <div className='mt-6 mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold mb-4'>{getGreeting()}</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4'>
          {quickAccess.map(item => (
            <Link
              key={item.id}
              to={item.to}
              className='bg-white/5 hover:bg-white/10 transition-colors rounded flex items-center gap-3 overflow-hidden group'
            >
              <img
                src={item.image}
                alt={item.name}
                className='w-12 h-12 md:w-16 md:h-16 rounded shadow-spotify object-cover flex-shrink-0'
              />
              <span className='text-sm font-semibold truncate pr-4'>{item.name}</span>
            </Link>
          ))}
          {quickAccess.length === 0 && (
            <div className='col-span-full text-link text-sm py-4'>
              Start liking songs and creating playlists to see them here.
            </div>
          )}
        </div>
      </div>

      {/* ── Made For You ── */}
      <Section
        title="Made for you"
        more="#"
        items={madeForYou}
      />

      {/* ── Recently Played ── */}
      <Section
        title="Recently played"
        more="#"
        items={recentlyPlayed}
      />

      {/* ── Genre Sections ── */}
      {GENRES.map(genre => {
        const genreSongs = songs.filter(s => s.genres.includes(genre));
        if (!genreSongs.length) return null;
        return (
          <Section
            key={genre}
            title={GENRE_LABELS[genre] || genre}
            more='#'
            items={genreSongs.slice(0, 6)}
          />
        );
      })}
    </div>
  );
}

export default Home;
