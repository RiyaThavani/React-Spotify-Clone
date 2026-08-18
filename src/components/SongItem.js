import { Icon } from 'Icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrent, setPlaying } from 'stores/player';
import { toggleLike } from 'stores/likes';
import { getSongPreview } from 'services/musicApi';
import { useEffect, useState } from 'react';

function SongItem({ item }) {
  const dispatch = useDispatch();
  const { current, playing } = useSelector(state => state.player);
  const likedSongIds = useSelector(state => state.likes.likedSongIds);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [catalogSong, setCatalogSong] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getSongPreview(item)
      .then(song => !cancelled && setCatalogSong(song))
      .catch(() => !cancelled && setCatalogSong(null));

    return () => { cancelled = true; };
  }, [item]);

  const isActive = current?.id === item.id;
  const isLiked = likedSongIds.includes(item.id);
  const displaySong = catalogSong || item;

  const updateCurrent = async () => {
    if (isActive) {
      window.dispatchEvent(new CustomEvent('player-command', { detail: { action: 'toggle' } }));
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const playableSong = catalogSong || await getSongPreview(item);
      dispatch(setCurrent(playableSong));
      dispatch(setPlaying(true));
      window.dispatchEvent(new CustomEvent('player-command', {
        detail: { action: 'play', previewUrl: playableSong.previewUrl },
      }));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={updateCurrent}
      className={`p-4 rounded group cursor-pointer transition-colors duration-150 ${
        isActive ? 'bg-active' : 'bg-footer hover:bg-active'
      }`}
    >
      <div className='relative'>
        {displaySong.image ? (
          <img
            src={displaySong.image}
            className='aspect-square rounded w-full object-cover bg-active'
            alt={`${item.title} album cover`}
          />
        ) : (
          <div className='aspect-square rounded w-full bg-active flex items-end p-4 text-sm text-link'>
            Loading official album artwork…
          </div>
        )}
        <button
          type='button'
          aria-label={isLiked ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
          onClick={e => { e.stopPropagation(); dispatch(toggleLike(item.id)); }}
          className={`w-8 h-8 items-center justify-center rounded-full bg-black/60 [&_path]:fill-current absolute top-2 right-2 z-10 transition-transform hover:scale-110 ${
            isLiked ? 'flex text-green-500' : 'hidden group-hover:flex group-focus:flex text-white/90 hover:text-white'
          }`}
        >
          <Icon name={isLiked ? 'heart' : 'heartEmpty'} size={18} />
        </button>
        <button
          type='button'
          onClick={e => { e.stopPropagation(); updateCurrent(); }}
          className={`w-10 h-10 rounded-full bg-primary absolute bottom-2 right-2 items-center justify-center shadow-lg transition-all duration-150 ${
            isActive ? 'flex' : 'hidden group-hover:flex group-focus:flex'
          }`}
        >
          <Icon name={isActive && playing ? 'pause' : 'play'} size={16} />
        </button>
      </div>
      <div className='font-semibold mt-2 truncate'>{item.title}</div>
      {displaySong.artist && (
        <div className='text-xs mt-1 text-link truncate'>{displaySong.artist}</div>
      )}
      <div className='text-xs mt-1 text-link truncate opacity-70'>{item.desc}</div>
      {isLoading && <div className='text-xs mt-1 text-primary'>Loading official preview…</div>}
      {error && <div className='text-xs mt-1 text-red-400'>{error}</div>}
    </div>
  );
}

export default SongItem;
