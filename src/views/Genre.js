import { Link, useParams } from 'react-router-dom';
import SongItem from 'components/SongItem';
import categories from 'data/categories';
import songs from 'data/songs';

function Genre() {
  const { categoryId } = useParams();
  const category = categories.find(item => String(item.id) === categoryId);
  const categorySongs = songs.filter(song => song.genres.includes(category?.title));

  if (!category) {
    return (
      <div className='pt-8'>
        <h1 className='text-3xl font-bold'>Category not found</h1>
        <Link className='inline-block mt-4 text-primary hover:underline' to='/search'>Back to Browse</Link>
      </div>
    );
  }

  return (
    <section className='pt-2 md:pt-4'>
      <Link className='text-sm text-link hover:text-white hover:underline' to='/search'>← Browse all</Link>
      <div className='flex items-end gap-4 md:gap-5 mt-4 md:mt-5 mb-6 md:mb-8'>
        <img src={category.cover} alt='' className='w-28 h-28 md:w-32 md:h-32 rounded object-cover shadow-spotify flex-shrink-0' />
        <div className='min-w-0'>
          <p className='text-xs font-semibold text-link uppercase tracking-widest'>Category</p>
          <h1 className='text-2xl md:text-4xl font-bold mt-1 truncate'>{category.title}</h1>
          <p className='text-xs md:text-sm text-link mt-2 md:mt-3'>Select any track to play it.</p>
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4'>
        {categorySongs.map(song => <SongItem key={song.id} item={song} />)}
      </div>
    </section>
  );
}

export default Genre;
