import SongItem from "./SongItem";
import Title from "components/Title";

function Section ({title,more=false,items}){



    return (<section className="mt-6 md:mt-8">
        
        <Title title={title} more={more}/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {items.map(item=> <SongItem item ={item} key={item.id}/>) }
        </div>
    </section>)
}


export default Section;