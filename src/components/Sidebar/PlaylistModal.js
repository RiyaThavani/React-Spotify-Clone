import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPlaylist } from 'stores/playlists'

function PlaylistModal({ onClose }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Please enter a playlist name.')
      return
    }
    dispatch(createPlaylist({ id: `playlist-${Date.now()}`, name: trimmed }))
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-footer rounded-2xl p-6 shadow-spotify"
        onClick={event => event.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white">New Playlist</h2>
        <p className="text-sm text-link mt-1">Give your playlist a name.</p>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <input
            autoFocus
            type="text"
            value={name}
            onChange={event => {
              setName(event.target.value)
              setError('')
            }}
            placeholder="My Playlist"
            className="h-12 rounded-lg bg-backdrop border border-white/10 px-4 text-sm text-white placeholder-link outline-none focus:border-primary"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-full border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-full bg-primary text-black text-sm font-bold hover:scale-[1.02] transition-transform"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaylistModal