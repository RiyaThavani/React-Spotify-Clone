
import logo from  "img/logo.svg";
import Menu from 'components/Sidebar/Menu';
import {Icon} from 'Icons'
import Playlist from "./Sidebar/Playlist";
import DownloadApp from "./Sidebar/DownloadApp";
function Sidebar (){



    return (<aside className='w-60 pt-6 flex flex-col bg-black flex-shrink-0'>

        <a href='/' className="mb-7 px-6">
        <img src={logo} alt='Spotify' className='h-10' />
        </a>

        <Menu />

        <nav className="mt-6">
            <ul>
                <li>
                    <button className="py-2 px-6 flex items-center text-sm group  text-link font-semibold hover:text-white w-full text-left" >
                    <span className="w-6 h-6 flex  items-center justify-center mr-4 bg-white rounded-sm bg-opacity-60 group-hover:bg-opacity-100">
                        <Icon name="plus" size={16} />
                    </span>
                    Create Playlist
                    </button>
                </li>
                <li>
                    <button className="py-2 px-6 flex items-center group text-sm text-link font-semibold hover:text-white w-full text-left">
                    <span  className="w-6 h-6 flex  items-center justify-center mr-4 bg-indigo-500 rounded-sm bg-opacity-60 group-hover:bg-opacity-100">
                        <Icon name="heart" size={16} />
                    </span>
                    Liked Songs
                    </button>
                </li>
            </ul>

        </nav>

        <Playlist />


         <DownloadApp />

    </aside>)

}

export default Sidebar;