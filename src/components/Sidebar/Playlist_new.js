import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deletePlaylist } from 'stores/playlists'

function Playlist({ onOpenCreate }) {
  const playlists = useSelector(state => state.playlists.playlists)
  const dispatch = useDispatch()

  return (
    <div className="text-link mx-6 mt-4 flex-auto overflow-auto border-t border-white border-opacity-10 pt-4">
      {playlists.length === 0 ? (
        <p className="text-xs leading-5 text-gray-400">
          Create a playlist to save the songs you like.
        </p>
      ) : (
        <ul className="flex flex-col gap-0.5">
          {playlists.map(playlist => (
            <li key={playlist.id} className="group flex items-center gap-1">
              <NavLink
                to={`/playlist/${playlist.id}`}
                style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}
                className="flex-1 min-w-0 py-1.5 px-2 text-sm font-semibold text-link hover:text-white truncate rounded"
              >
                {playlist.name}
              </NavLink>
              <button
                type="button"
                onClick={() => dispatch(deletePlaylist(playlist.id))}
                className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-full text-xs text-link hover:text-white hover:bg-active transition-opacity flex-shrink-0"
                aria-label="Delete playlist"
                title="Delete playlist"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Playlist