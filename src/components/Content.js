
import Navbar from 'components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from 'views/Home';
import Search from 'views/Search';
import Collection from 'views/Collection';
import Genre from 'views/Genre';
import LikedSongs from 'views/LikedSongs';
import Profile from 'views/Profile';
import Playlist from 'views/Playlist';
function Content() {



    return (<div className='flex-auto overflow-auto'>
        <Navbar />
        <div className='px-4 pt-4 md:px-8 md:pt-4'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/genre/:categoryId" element={<Genre />} />
                <Route path="/collection/liked" element={<LikedSongs />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/playlist/:playlistId" element={<Playlist />} />
            </Routes>
        </div>
    </div>)

}

export default Content;