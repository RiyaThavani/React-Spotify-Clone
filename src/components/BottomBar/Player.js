import { Icon } from 'Icons'
import { useAudio } from 'react-use';
import { secondsToTime } from 'utils';
import CostumRange from './CostumRange';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCurrent, setPlaying } from 'stores/player';
import songs from 'data/songs';
import { getSongPreview } from 'services/musicApi';

export default function Player() {
    const dispatch = useDispatch();
    const { current, playing } = useSelector(state => state.player);

  async function changeTrack(direction) {
    if (!songs.length) return;
    const currentIndex = songs.findIndex(song => song.id === current?.id);
    const nextIndex = currentIndex === -1
      ? 0
      : (currentIndex + direction + songs.length) % songs.length;

    try {
      const playableSong = await getSongPreview(songs[nextIndex]);
      dispatch(setCurrent(playableSong));
      dispatch(setPlaying(true));
    } catch {
      dispatch(setPlaying(false));
    }
  }

  const [audio, state, controls, audioRef] = useAudio({
    src: current?.previewUrl,
    onEnded: () => changeTrack(1),
  });

  useEffect(() => {
    const handlePlayerCommand = event => {
      const element = audioRef.current;
      if (!element) return;

      if (event.detail?.action === 'toggle') {
        if (element.paused) {
          element.play().catch(() => dispatch(setPlaying(false)));
        } else {
          element.pause();
        }
        return;
      }

      const { previewUrl } = event.detail || {};
      if (!previewUrl) return;
      element.src = previewUrl;
      element.load();
      element.play().catch(() => dispatch(setPlaying(false)));
    };

    window.addEventListener('player-command', handlePlayerCommand);
    return () => window.removeEventListener('player-command', handlePlayerCommand);
  }, [audioRef, dispatch]);

    useEffect(() => {
        if (!current?.src) return;
        if (playing) {
            controls.play();
        } else {
            controls.pause();
        }
        // `controls` is recreated by react-use on each render; it must not be a
        // dependency or this effect would repeatedly restart the audio.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current?.src, playing]);

    useEffect(() => {
        dispatch(setPlaying(state.playing));
    }, [state.playing, dispatch]);

    return (
        <div className="flex justify-between items-center h-full px-4">
            {/* ── Left: Current Song Info ── */}
            <div className="min-w-[11.25rem] w-[30%] flex items-center">
                {current && (
                    <div className='flex items-center gap-3'>
                        <div className='h-14 w-14 flex-shrink-0'>
                            <img
                                src={current.image}
                                alt={current.title}
                                className='h-full w-full object-cover rounded'
                            />
                        </div>
                        <div className='overflow-hidden'>
                            <h6 className='text-sm font-semibold hover:underline truncate'>
                                {current.title}
                            </h6>
              {current.artist && (
                <p className='text-xs text-gray-400 truncate hover:underline cursor-pointer'>
                  {current.artist}
                </p>
              )}
              {current.storeUrl && (
                <a
                  href={current.storeUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='block text-[0.65rem] text-link hover:underline truncate'
                >
                  Preview courtesy of iTunes · View song
                </a>
              )}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Centre: Controls + Progress ── */}
            <div className="flex flex-col items-center max-w-[45.125rem] w-[40%]">
                <div className="flex items-center gap-x-2">
                    <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                        <Icon name='shuffle' size={16} />
                    </button>
                    <button
                        aria-label="Previous track"
                        onClick={() => changeTrack(-1)}
                        className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100"
                    >
                        <Icon name='playerPrev' size={16} />
                    </button>
          <button
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:scale-[1.06] transition-transform"
            onClick={() => {
              if (!current) return;
              if (state.playing) {
                controls.pause();
                dispatch(setPlaying(false));
              } else {
                controls.play().catch(() => dispatch(setPlaying(false)));
                dispatch(setPlaying(true));
              }
            }}
                    >
                        <Icon name={state?.playing ? 'pause' : 'play'} size={16} />
                    </button>
                    <button
                        aria-label="Next track"
                        onClick={() => changeTrack(1)}
                        className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100"
                    >
                        <Icon name='playerNext' size={16} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                        <Icon name='repeat' size={16} />
                    </button>
                </div>

                <div className='w-full flex items-center gap-x-2'>
                    {audio}
                    <div className='text-[0.7rem] text-white text-opacity-70 flex items-center justify-center w-10 text-right'>
                        {secondsToTime(state?.time)}
                    </div>
                    <CostumRange
                        step={0.1}
                        min={0}
                        max={state?.duration || 1}
                        value={state?.time}
                        onChange={value => controls.seek(value)}
                    />
                    <div className='text-[0.7rem] text-white text-opacity-70 flex items-center justify-center w-10'>
                        {secondsToTime(state?.duration)}
                    </div>
                </div>
            </div>

            {/* ── Right: Volume Controls ── */}
            <div className="min-w-[11.25rem] w-[30%] flex justify-end items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                    <Icon name='queue' size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                    <Icon name='device' size={16} />
                </button>
                <button
                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100"
                    onClick={() => controls.volume(state?.volume === 0 ? 0.7 : 0)}
                >
                    <Icon name={state?.volume === 0 ? 'volumeMute' : 'volumeNormal'} size={16} />
                </button>
                <div className='w-[5.8rem] max-w-full'>
                    <CostumRange
                        step={0.01}
                        min={0}
                        max={1}
                        value={state?.volume}
                        onChange={value => controls.volume(value)}
                    />
                </div>
                <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                    <Icon name='fullScreen' size={16} />
                </button>
            </div>
        </div>
    );
}
