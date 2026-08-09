import { useMemo, useState } from 'react';
import songs from 'data/songs';
import SongItem from 'components/SongItem';
import Title from 'components/Title';
import Category from 'components/SearchContent/Category';
import categories from 'data/categories';

function Search() {
  const [query, setQuery] = useState('');

  const filteredSongs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return songs;
    return songs.filter(song =>
      song.title.toLowerCase().includes(normalized) ||
      song.desc.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <div>
        



        <section className='mb-4'>
        <Title title='Hepsine göz at' more='/sarkilar'/>
         
         <div className='grid grid-cols-5 gap-6'>
          {
             categories.map((category,index)=>{
                 return <Category key={index} category={category}/>
             })
          }
     </div>
        </section>

    




    </div>)
}   


export default Search;