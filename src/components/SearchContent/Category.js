import { Link } from 'react-router-dom';

function Category({category}){



    return (<Link to={`/genre/${category.id}`} aria-label={`Open ${category.title}`} style={{
        backgroundColor:category.backcolor,
    }} className='rounded-md before:pt-[100%] before:block relative overflow-hidden block cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white'>
       
            <div className='absolute inset-0'>
            <h3 className='p-4 text-2xl tracking-tighter font-semibold'>
            {category.title}
            </h3>
            </div>
            <img src={category.cover} alt={category.title} 
            className='w-[6.25rem] h-[6.25rem] rotate-[25deg] translate-x-[18%] 
            translate-y-[-2% ] absolute bottom-0 right-0 shadow-spotify'/>

    </Link>)
}


export default Category;
