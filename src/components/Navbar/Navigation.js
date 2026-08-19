import { useNavigate } from 'react-router-dom'
import { Icon } from 'Icons'

export default function Navigaton() {
  const navigate = useNavigate()

  return (<nav className="flex items-center gap-x-2">
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white hover:bg-white/10 transition-colors"
      aria-label="Go back"
    >
      <Icon name="prev" size={22} />
    </button>
    <button
      type="button"
      onClick={() => navigate('/', { replace: true })}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white hover:bg-white/10 transition-colors"
      aria-label="Go to Home"
    >
      <Icon name="home" size={22} />
    </button>
  </nav>)
}