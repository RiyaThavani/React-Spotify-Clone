import { useSelector } from 'react-redux';
import SongItem from 'components/SongItem';
import songs from 'data/songs';
import { Icon } from 'Icons';

function LikedSongs() {
  const likedSongIds = useSelector(state => state.likes.likedSongIds);
  const likedSongs = songs.filter(song => likedSongIds.includes(song.id));

  return (
    <section className='pt-4'>
      <div className='flex items-end gap-5 mt-5 mb-8'>
        <div className='w-32 h-32 rounded flex items-center justify-center shadow-spotify bg-indigo-500 text-white [&_path]:fill-current'>
          <Icon name='heart' size={64} />
        </div>
        <div>
          <p className='text-sm font-semibold'>PLAYLIST</p>
          <h1 className='text-4xl font-bold mt-1'>Liked Songs</h1>
          <p className='text-sm text-link mt-3'>
            {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
          </p>
        </div>
      </div>

      {likedSongs.length > 0 ? (
        <div className='grid grid-cols-5 gap-6'>
          {likedSongs.map(song => (
            <SongItem key={song.id} item={song} />
          ))}
        </div>
      ) : (
        <p className='text-gray-400 mt-4'>
          Songs you like will appear here. Tap the ♥ heart icon on any song to save it.
        </p>
      )}
    </section>
  );
}

export default LikedSongs;