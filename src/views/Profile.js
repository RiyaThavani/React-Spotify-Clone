import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Icon } from 'Icons'
import { logout } from 'stores/auth'
import songs from 'data/songs'
import SongItem from 'components/SongItem'
import { useEffect, useState } from 'react'

function Profile() {
  const user = useSelector(state => state.auth.user)
  const likedSongIds = useSelector(state => state.likes.likedSongIds)
  const playlists = useSelector(state => state.playlists.playlists)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    if (!user) navigate('/login', { replace: true })
  }, [user, navigate])

  if (!user) return null

  const likedCount = songs.filter(song => likedSongIds.includes(song.id)).length
  const playlistCount = playlists.length
  const initials = user.name
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')

  const likedSongs = songs.filter(song => likedSongIds.includes(song.id))
  const recentLiked = likedSongs.slice(0, 6)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <section className="pt-2 md:pt-6 pb-8">
      {/* ── Profile Header ── */}
      <div className="relative mb-8">
        <div className="h-48 md:h-64 rounded-xl bg-gradient-to-br from-primary via-emerald-600 to-blue-700 mb-16 md:mb-20" />
        <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-8">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 md:w-48 md:h-48 rounded-full object-cover shadow-spotify border-4 border-black"
            />
          ) : (
            <div className="w-28 h-28 md:w-48 md:h-48 rounded-full flex items-center justify-center bg-black text-primary text-5xl md:text-7xl font-bold shadow-spotify border-4 border-black">
              {initials}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 md:mt-20 px-4 md:px-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">{user.name}</h1>
          <p className="text-sm text-link mt-2 break-all">{user.email}</p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="p-4 md:p-5 rounded-lg bg-footer">
            <p className="text-2xl md:text-3xl font-bold">{likedCount}</p>
            <p className="text-xs md:text-sm text-link mt-1">Liked Songs</p>
          </div>
          <div className="p-4 md:p-5 rounded-lg bg-footer">
            <p className="text-2xl md:text-3xl font-bold">{playlistCount}</p>
            <p className="text-xs md:text-sm text-link mt-1">Playlists</p>
          </div>
          <Link
            to="/collection/liked"
            className="p-4 md:p-5 rounded-lg bg-active hover:bg-white/10 transition-colors flex flex-col justify-center"
          >
            <Icon name="heart" size={24} className="text-primary [&_path]:fill-current" />
            <p className="text-xs md:text-sm font-semibold mt-2">Liked Songs</p>
          </Link>
          <Link
            to="/collection"
            className="p-4 md:p-5 rounded-lg bg-active hover:bg-white/10 transition-colors flex flex-col justify-center"
          >
            <Icon name="library" size={24} className="text-link [&_path]:fill-current" />
            <p className="text-xs md:text-sm font-semibold mt-2">Your Library</p>
          </Link>
        </div>

        {/* ── Liked Songs Grid ── */}
        {recentLiked.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Liked Songs</h2>
              <Link to="/collection/liked" className="text-xs md:text-sm font-semibold text-link hover:underline">
                Show all
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {recentLiked.map(song => (
                <SongItem key={song.id} item={song} />
              ))}
            </div>
          </section>
        )}

        {/* ── Your Playlists ── */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold">Your Playlists</h2>
            {playlists.length > 0 && (
              <Link to="/collection" className="text-xs md:text-sm font-semibold text-link hover:underline">
                Show all
              </Link>
            )}
          </div>
          {playlists.length === 0 ? (
            <div className="bg-footer rounded-lg p-6 md:p-8 text-center">
              <Icon name="library" size={48} className="text-link mx-auto mb-3 [&_path]:fill-current" />
              <h3 className="text-lg font-bold mb-1">Create your first playlist</h3>
              <p className="text-sm text-link mb-4">It's easy, we will help you</p>
              <button
                onClick={() => navigate('/collection')}
                className="h-10 px-6 rounded-full bg-primary text-black text-sm font-bold hover:scale-[1.02] transition-transform"
              >
                Create playlist
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {playlists.map(playlist => {
                const playlistSongs = playlist.songIds
                  .map(id => songs.find(s => s.id === id))
                  .filter(Boolean)
                const coverSong = playlistSongs[0]
                return (
                  <Link
                    key={playlist.id}
                    to={`/playlist/${playlist.id}`}
                    className="bg-footer hover:bg-active p-3 md:p-4 rounded-lg transition-colors group"
                  >
                    <div className="aspect-square rounded-md bg-active flex items-center justify-center mb-3 shadow-spotify relative overflow-hidden">
                      {coverSong ? (
                        <img
                          src={coverSong.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(playlist.name)}&background=1db954&color=000`}
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon name="plus" size={32} className="text-link" />
                      )}
                      <button
                        type="button"
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          navigate(`/playlist/${playlist.id}`)
                        }}
                        className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon name={playlistSongs.length > 0 ? 'play' : 'plus'} size={16} />
                      </button>
                    </div>
                    <h3 className="text-sm font-semibold truncate">{playlist.name}</h3>
                    <p className="text-xs text-link mt-1">{playlistSongs.length} songs</p>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* ── Logout Section ── */}
        <div className="mt-8">
          {showLogoutConfirm ? (
            <div className="bg-footer rounded-lg p-4 md:p-6 max-w-md">
              <h3 className="text-lg font-bold mb-1">Log out?</h3>
              <p className="text-sm text-link mb-4">You can always log back in at any time.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="h-10 px-6 rounded-full border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="h-10 px-6 rounded-full bg-white text-black text-sm font-bold hover:scale-[1.02] transition-transform"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="h-10 px-6 rounded-full border border-white/10 text-link text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Profile