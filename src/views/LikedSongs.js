import { useSelector } from 'react-redux';
import songs from 'data/songs';
import { Icon } from 'Icons';

function LikedSongs() {
  const likedSongIds = useSelector(state => state.likes.likedSongIds);
  const likedSongs = songs.filter(song => likedSongIds.includes(song.id));

  return (
    <section className='pt-2 md:pt-4'>
      <div className='flex items-end gap-4 md:gap-5 mt-4 md:mt-5 mb-6 md:mb-8'>
        <div className='w-28 h-28 md:w-32 md:h-32 rounded flex items-center justify-center shadow-spotify bg-indigo-500 text-white [&_path]:fill-current flex-shrink-0'>
          <Icon name='heart' size={48} />
        </div>
        <div className='min-w-0'>
          <p className='text-xs font-semibold text-link uppercase tracking-widest'>Playlist</p>
          <h1 className='text-2xl md:text-4xl font-bold mt-1 truncate'>Liked Songs</h1>
          <p className='text-xs md:text-sm text-link mt-2 md:mt-3'>
            {likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}
          </p>
        </div>
      </div>

      {likedSongs.length > 0 ? (
        <ul className='mt-2'>
          {likedSongs.map((song, index) => (
            <li
              key={song.id}
              className="flex items-center gap-3 md:gap-4 py-2 px-2 md:px-3 rounded hover:bg-active group"
            >
              <span className="w-5 md:w-6 text-center text-link text-xs md:text-sm flex-shrink-0">{index + 1}</span>
              <div className='flex-1 min-w-0'>
                <span className="block font-semibold text-white text-sm truncate">{song.title}</span>
                <span className="block text-xs text-link truncate">{song.artist}</span>
              </div>
              <button
                type="button"
                onClick={() => { }}
                className="flex-shrink-0 text-link hover:text-white text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove from Liked Songs"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className='bg-footer rounded-lg p-6 md:p-8 text-center mt-4'>
          <Icon name="heart" size={48} className="text-link mx-auto mb-3 [&_path]:fill-current" />
          <h3 className='text-lg font-bold mb-1'>Songs you like will appear here</h3>
          <p className='text-sm text-link'>Tap the heart icon on any song to save it.</p>
        </div>
      )}
    </section>
  );
}

export default LikedSongs;