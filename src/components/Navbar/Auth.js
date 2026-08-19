import { Menu } from '@headlessui/react'
import { Icon } from 'Icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'stores/auth'

export default function Auth() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  if (!user) {
    return (
      <div className="flex items-center gap-x-3 md:gap-x-4">
        <Link
          to="/signup"
          className="h-8 md:h-9 px-4 md:px-5 rounded-full bg-white text-black text-xs md:text-sm font-bold flex items-center justify-center hover:scale-105 transition-transform"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="h-8 md:h-9 px-4 md:px-5 rounded-full bg-black text-white text-xs md:text-sm font-bold flex items-center justify-center hover:scale-105 transition-transform border border-white/10"
        >
          Log In
        </Link>
      </div>
    )
  }

  const initials = user.name
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')

  return (
    <Menu as="nav" className="flex items-center relative">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center h-8 rounded-3xl bg-black pl-0.5 pr-2 hover:bg-active transition-colors">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full p-px mr-2 object-cover"
              />
            ) : (
              <span className="w-8 h-8 rounded-full mr-2 bg-primary text-black flex items-center justify-center text-sm font-bold">
                {initials}
              </span>
            )}
            <span className="text-sm font-semibold hidden md:block">{user.name}</span>
            <span className={open ? 'rotate-180 transition-transform' : 'transition-transform'}>
              <Icon name="downdir" size={16} className="ml-2" />
            </span>
          </Menu.Button>
          <Menu.Items className="absolute top-full right-0 w-48 bg-active rounded-lg translate-y-2 z-20 p-1 shadow-lg border border-white/5">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`h-9 flex items-center px-3 rounded text-sm font-semibold ${active ? 'bg-white bg-opacity-10' : ''}`}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/collection/liked"
                  className={`h-9 flex items-center px-3 rounded text-sm font-semibold ${active ? 'bg-white bg-opacity-10' : ''}`}
                >
                  Liked Songs
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`w-full h-9 flex items-center px-3 rounded text-sm font-semibold text-left ${active ? 'bg-white bg-opacity-10' : ''}`}
                >
                  Log Out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}