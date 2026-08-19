
export default function Title({ title, more = false }) {


   return (
      <div className="flex items-center justify-between mb-3 md:mb-4">
         <h3 className="text-xl md:text-2xl text-white font-semibold tracking-tight hover:underline cursor-pointer"> {title}</h3>
         {more && <a className="text-xs md:text-sm text-link font-semibold hover:underline" href={more} >Show all</a>}
      </div>
   )
}