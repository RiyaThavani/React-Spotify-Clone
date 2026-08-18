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
    <section className='pt-4'>
      <Link className='text-sm text-link hover:text-white hover:underline' to='/search'>← Browse all</Link>
      <div className='flex items-end gap-5 mt-5 mb-8'>
        <img src={category.cover} alt='' className='w-32 h-32 rounded object-cover shadow-spotify' />
        <div>
          <p className='text-sm font-semibold'>CATEGORY</p>
          <h1 className='text-4xl font-bold mt-1'>{category.title}</h1>
          <p className='text-sm text-link mt-3'>Select any track to play it.</p>
        </div>
      </div>
      <div className='grid grid-cols-5 gap-6'>
        {categorySongs.map(song => <SongItem key={song.id} item={song} />)}
      </div>
    </section>
  );
}

export default Genre;
