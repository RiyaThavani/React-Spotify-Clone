import { useMemo, useState } from 'react';
import songs from 'data/songs';
import SongItem from 'components/SongItem';
import Category from 'components/SearchContent/Category';
import categories from 'data/categories';

function Search() {
  const [query, setQuery] = useState('');

  const filteredSongs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return songs.filter(song =>
      song.title.toLowerCase().includes(normalized) ||
      song.artist.toLowerCase().includes(normalized) ||
      song.desc.toLowerCase().includes(normalized) ||
      song.genres.some(genre => genre.toLowerCase().includes(normalized))
    );
  }, [query]);

  const showResults = query.trim().length > 0;

  return (
    <div>
      {/* ── Search Bar ── */}
      <div className='sticky top-0 z-10 pb-4 pt-2'>
        <div className='relative max-w-md'>
          <svg
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            width='16' height='16' viewBox='0 0 24 24' fill='currentColor'
          >
            <path d='M10.533 1.279c-5.18 0-9.407 4.214-9.407 9.407 0 5.193 4.226 9.407 9.407 9.407 2.234 0 4.29-.79 5.907-2.097l4.557 4.556a1 1 0 1 0 1.414-1.414l-4.543-4.543A9.377 9.377 0 0 0 19.94 10.686c0-5.193-4.226-9.407-9.407-9.407zm-7.407 9.407c0-4.074 3.320-7.407 7.407-7.407s7.407 3.333 7.407 7.407-3.32 7.407-7.407 7.407-7.407-3.273-7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z' />
          </svg>
          <input
            id='search-input'
            type='text'
            placeholder='What do you want to listen to?'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2.5 md:py-3 rounded-full bg-white text-black text-sm font-medium placeholder-gray-500 outline-none focus:ring-2 focus:ring-white'
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black text-lg leading-none'
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Search Results ── */}
      {showResults ? (
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-4'>
            {filteredSongs.length > 0
              ? `Results for "${query}"`
              : `No results for "${query}"`}
          </h2>
          {filteredSongs.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4'>
              {filteredSongs.map(song => (
                <SongItem key={song.id} item={song} />
              ))}
            </div>
          ) : (
            <p className='text-gray-400 mt-4'>
              Try searching for a song, artist, album, or genre.
            </p>
          )}
        </section>
      ) : (
        /* ── Browse Categories ── */
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-4'>Browse all</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4'>
            {categories.map(category => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Search;
