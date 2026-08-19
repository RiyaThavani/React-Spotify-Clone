import { Link } from 'react-router-dom'

export default function Title({ title, more = false }) {
  return (
    <div className="flex items-center justify-between mb-3 md:mb-4">
      <h3 className="text-xl md:text-2xl text-white font-semibold tracking-tight hover:underline cursor-pointer"> {title}</h3>
      {more && (
        <Link className="text-xs md:text-sm text-link font-semibold hover:underline" to={more}>
          Show all
        </Link>
      )}
    </div>
  )
}