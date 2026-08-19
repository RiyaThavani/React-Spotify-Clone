import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from 'stores/auth'

function ProfileFooter() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="px-4 pt-3 pb-3 border-t border-white/10">
        <div className="flex gap-2">
          <Link
            to="/signup"
            className="flex-1 h-9 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center hover:scale-[1.02] transition-transform"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="flex-1 h-9 rounded-full bg-active text-white text-sm font-bold flex items-center justify-center hover:scale-[1.02] transition-transform"
          >
            Log In
          </Link>
        </div>
      </div>
    )
  }

  const initials = user.name
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')

  return (
    <div className="px-4 pt-3 pb-3 border-t border-white/10 mt-auto">
      <Link to="/profile" className="flex items-center gap-3 hover:bg-active px-2 py-1.5 rounded flex-1 min-w-0">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        ) : (
          <span className="w-9 h-9 rounded-full bg-primary text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
            {initials}
          </span>
        )}
        <div className='min-w-0 flex-1'>
          <span className="text-sm font-semibold truncate text-white block">{user.name}</span>
          <span className="text-xs text-link truncate block">{user.email}</span>
        </div>
      </Link>
      <button
        onClick={() => {
          dispatch(logout())
          navigate('/login', { replace: true })
        }}
        className="mt-2 w-full h-8 text-xs font-semibold text-link hover:text-white hover:bg-active rounded transition-colors"
        aria-label="Log out"
        title="Log Out"
      >
        Log Out
      </button>
    </div>
  )
}

export default ProfileFooter