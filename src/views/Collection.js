
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon } from 'Icons'
import SongItem from 'components/SongItem'
import songs from 'data/songs'

function Collection() {
  const likedSongIds = useSelector(state => state.likes.likedSongIds)
  const playlists = useSelector(state => state.playlists.playlists)

  const likedSongs = useMemo(
    () => songs.filter(song => likedSongIds.includes(song.id)),
    [likedSongIds]
  )

  return (
    <section className='pt-2 md:pt-4'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl md:text-3xl font-bold'>Your Library</h1>
        <Link
          to="/profile"
          className="text-xs md:text-sm font-semibold text-link hover:underline"
        >
          View profile
        </Link>
      </div>

      {/* ── Liked Songs ── */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg md:text-xl font-bold'>Liked Songs</h2>
          <Link to="/collection/liked" className='text-xs md:text-sm font-semibold text-link hover:underline'>
            Show all
          </Link>
        </div>
        {likedSongs.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4'>
            {likedSongs.slice(0, 5).map(song => (
              <SongItem key={song.id} item={song} />
            ))}
          </div>
        ) : (
          <div className='bg-footer rounded-lg p-6 md:p-8 text-center'>
            <Icon name="heart" size={48} className="text-link mx-auto mb-3 [&_path]:fill-current" />
            <h3 className='text-lg font-bold mb-1'>Songs you like will appear here</h3>
            <p className='text-sm text-link'>Tap the heart on any song to save it.</p>
          </div>
        )}
      </div>

      {/* ── Playlists ── */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg md:text-xl font-bold'>Playlists</h2>
          {playlists.length > 0 && (
            <Link to="/" className='text-xs md:text-sm font-semibold text-link hover:underline'>
              Create new
            </Link>
          )}
        </div>
        {playlists.length === 0 ? (
          <div className='bg-footer rounded-lg p-6 md:p-8 text-center'>
            <Icon name="library" size={48} className="text-link mx-auto mb-3 [&_path]:fill-current" />
            <h3 className='text-lg font-bold mb-1'>Create your first playlist</h3>
            <p className='text-sm text-link mb-4'>It's easy, we will help you</p>
            <Link
              to="/"
              className="inline-block h-10 px-6 rounded-full bg-primary text-black text-sm font-bold hover:scale-[1.02] transition-transform"
            >
              Create playlist
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4'>
            {playlists.map(playlist => {
              const playlistSongs = playlist.songIds
                .map(id => songs.find(s => s.id === id))
                .filter(Boolean)
              const coverSong = playlistSongs[0]
              return (
                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className='bg-footer hover:bg-active p-3 md:p-4 rounded-lg transition-colors group'
                >
                  <div className='aspect-square rounded-md bg-active flex items-center justify-center mb-3 shadow-spotify relative overflow-hidden'>
                    {coverSong ? (
                      <img
                        src={coverSong.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(playlist.name)}&background=1db954&color=000`}
                        alt={playlist.name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <Icon name="plus" size={32} className="text-link" />
                    )}
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name={playlistSongs.length > 0 ? 'play' : 'plus'} size={16} />
                    </button>
                  </div>
                  <h3 className='text-sm font-semibold truncate'>{playlist.name}</h3>
                  <p className='text-xs text-link mt-1'>{playlistSongs.length} songs</p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Collection