import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setCurrent, setPlaying } from 'stores/player'
import { deletePlaylist, removeSongFromPlaylist } from 'stores/playlists'
import { getSongPreview } from 'services/musicApi'
import songs from 'data/songs'
import { useEffect, useState } from 'react'
import { Icon } from 'Icons'

function Playlist() {
  const { playlistId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const playlist = useSelector(state =>
    state.playlists.playlists.find(p => p.id === playlistId)
  )
  const [isPlayingAll, setIsPlayingAll] = useState(false)

  useEffect(() => {
    if (!playlist) return
  }, [playlist])

  if (!playlist) {
    return (
      <div className="pt-8">
        <h1 className="text-3xl font-bold text-white">Playlist not found</h1>
        <Link to="/" className="inline-block mt-4 text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    )
  }

  const playlistSongs = playlist.songIds
    .map(id => songs.find(song => song.id === id))
    .filter(Boolean)

  const handleDeletePlaylist = () => {
    dispatch(deletePlaylist(playlist.id))
    navigate('/', { replace: true })
  }

  const playSong = async song => {
    const playableSong = await getSongPreview(song)
    dispatch(setCurrent(playableSong))
    dispatch(setPlaying(true))
    window.dispatchEvent(new CustomEvent('player-command', {
      detail: { action: 'play', previewUrl: playableSong.previewUrl },
    }))
  }

  const handlePlayAll = async () => {
    if (playlistSongs.length === 0) return
    setIsPlayingAll(true)
    try {
      const playableSong = await getSongPreview(playlistSongs[0])
      dispatch(setCurrent(playableSong))
      dispatch(setPlaying(true))
      window.dispatchEvent(new CustomEvent('player-command', {
        detail: { action: 'play', previewUrl: playableSong.previewUrl },
      }))
    } catch {
      setIsPlayingAll(false)
    }
  }

  return (
    <section className="pt-2 md:pt-4">
      <div className="flex items-end gap-4 md:gap-6 mt-4 md:mt-5 mb-6 md:mb-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded shadow-spotify bg-gradient-to-br from-green-500 via-emerald-600 to-blue-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-5xl md:text-7xl font-black">
            {playlist.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-link uppercase tracking-widest">Playlist</p>
          <h1 className="text-2xl md:text-5xl font-bold text-white mt-1 truncate">{playlist.name}</h1>
          <p className="text-xs md:text-sm text-link mt-2 md:mt-3">
            {playlistSongs.length} {playlistSongs.length === 1 ? 'song' : 'songs'}
          </p>
        </div>
      </div>

      {playlistSongs.length > 0 && (
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={handlePlayAll}
            disabled={isPlayingAll}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center hover:scale-[1.06] transition-transform shadow-lg"
          >
            <Icon name={isPlayingAll ? 'pause' : 'play'} size={20} />
          </button>
        </div>
      )}

      {playlistSongs.length > 0 ? (
        <ul className="mt-2">
          {playlistSongs.map((song, index) => (
            <li
              key={song.id}
              className="flex items-center gap-3 md:gap-4 py-2 px-2 md:px-3 rounded hover:bg-active group"
            >
              <span className="w-5 md:w-6 text-center text-link text-xs md:text-sm flex-shrink-0 group-hover:hidden">{index + 1}</span>
              <button type="button" onClick={() => playSong(song)} className="w-5 md:w-6 flex-shrink-0 hidden group-hover:block text-center">
                <Icon name={song.id === playlistSongs[0]?.id ? 'play' : 'play'} size={14} />
              </button>
              <div className='flex-1 min-w-0'>
                <button type="button" onClick={() => playSong(song)} className="block font-semibold text-white text-sm truncate text-left hover:underline">
                  {song.title}
                </button>
                <span className="block text-xs text-link truncate">{song.artist}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  dispatch(removeSongFromPlaylist({ playlistId: playlist.id, songId: song.id }))
                }
                className="flex-shrink-0 text-link hover:text-white text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className='bg-footer rounded-lg p-6 md:p-8 text-center mt-4'>
          <Icon name="library" size={48} className="text-link mx-auto mb-3 [&_path]:fill-current" />
          <h3 className='text-lg font-bold mb-1'>This playlist is empty</h3>
          <p className='text-sm text-link mb-4'>Add songs from the home page or search.</p>
          <Link
            to="/"
            className="inline-block h-10 px-6 rounded-full bg-primary text-black text-sm font-bold hover:scale-[1.02] transition-transform"
          >
            Find songs
          </Link>
        </div>
      )}

      {playlistSongs.length > 0 && (
        <button
          onClick={handleDeletePlaylist}
          className="mt-8 h-10 px-6 rounded-full border border-white/10 text-link text-sm font-semibold hover:bg-white/10 transition-colors"
        >
          Delete playlist
        </button>
      )}
    </section>
  )
}

export default Playlist