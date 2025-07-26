import Hero from "../Components/hero";

function ProffesionCard({ title, description, iconname }: { title: string, description: string, iconname: string }) {
  return (
    <div className="flex flex-col justify-start items-center border-2 w-1/3 h-64 p-6 rounded-lg shadow-lg bg-white">
        <div className="text-2xl">
          {iconname}
        </div>
        <h2 className="text-xl font-bold" dir="rtl">{title}</h2>
      <p className="text-gray-700 leading-relaxed" dir="rtl">
        {description}
      </p>
    </div>
  )
}

export default function About() {
  return (
    <Hero background="bg-white" justify="start">
      <div className="flex flex-row justify-end w-full" >
        <div className="flex flex-col items-end w-1/2">
          <h1 className="text-5xl font-bold text-black my-10" dir="rtl">קצת עליי ועל הסיפור שלי</h1>  
          <h1 className="text-3xl font-bold text-black" dir="rtl">
            אני עובדת כצלמת מקצועית כ7 שנים, <br></br>נשואה לרן ואמא לשני ילדים אהובים - יעל וגיא
          </h1>
          <div className="border-2 border-black my-10 w-full">

          </div>
          <div className="flex flex-row justify-center items-center space-x-4">
            <ProffesionCard title="צילום" description="אני עובדת כצלמת מקצועית כ7 שנים" iconname="📷">
            </ProffesionCard>
            <ProffesionCard title="אביזרים" description="מתאימה אביזרים מיוחדים שגורמים לתמונות להיות עוד יותר מיוחדות" iconname="📷"></ProffesionCard>
            <ProffesionCard title="אביזרים" description="מתאימה אביזרים מיוחדים שגורמים לתמונות להיות עוד יותר מיוחדות" iconname="📷"></ProffesionCard>
          </div>
          <button className="bg-black w-32 text-white px-4 py-2 my-10 rounded-md ">
            התחילו עכשיו
          </button>
      </div>
      </div>
    </Hero>
  );
} 