
import logo from "img/logo.svg";
import Menu from 'components/Sidebar/Menu';
import { Icon } from 'Icons'
import Playlist from "./Sidebar/Playlist_new";
import PlaylistModal from "./Sidebar/PlaylistModal";
import DownloadApp from "./Sidebar/DownloadApp";
import ProfileFooter from "./Sidebar/ProfileFooter";
import { NavLink } from "react-router-dom";
import { useState } from 'react'

function Sidebar({ open, onClose }) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-30 md:hidden ${open ? 'block' : 'hidden'}`} onClick={onClose} />
      <aside className={`w-60 pt-6 flex flex-col bg-black flex-shrink-0 fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <a href='/' className="mb-7 px-6">
          <img src={logo} alt='Spotify' className='h-10' />
        </a>

        <Menu />

        <nav className="mt-6">
          <ul>
            <li>
              <button
                onClick={() => setShowCreateModal(true)}
                className="py-2 px-6 flex items-center text-sm group text-link font-semibold hover:text-white w-full text-left"
              >
                <span className="w-6 h-6 flex items-center justify-center mr-4 bg-white rounded-sm bg-opacity-60 group-hover:bg-opacity-100">
                  <Icon name="plus" size={16} />
                </span>
                Create Playlist
              </button>
            </li>
            <li>
              <NavLink
                to='/collection/liked'
                style={({ isActive }) => (isActive ? { color: 'white' } : undefined)}
                className="py-2 px-6 flex items-center group text-sm text-link font-semibold hover:text-white w-full text-left"
              >
                <span className="w-6 h-6 flex items-center justify-center mr-4 bg-indigo-500 rounded-sm bg-opacity-60 group-hover:bg-opacity-100">
                  <Icon name="heart" size={16} />
                </span>
                Liked Songs
              </NavLink>
            </li>
          </ul>

        </nav>

        <Playlist onOpenCreate={() => setShowCreateModal(true)} />

        <DownloadApp />

        <ProfileFooter />

        {showCreateModal && (
          <PlaylistModal onClose={() => setShowCreateModal(false)} />
        )}
      </aside>
    </>
  )

}

export default Sidebar;