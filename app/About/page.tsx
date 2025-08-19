import Hero from "../Components/hero";
import { CameraIcon, PaletteIcon, EditIcon, AlbumIcon} from "lucide-react";
import Image from "next/image";

function ProffesionCard({ title, description, icon: Icon }: { title: string, description: string, icon: React.ComponentType<{className?:string, size?: number}> }) {
  return (
    <div className="flex flex-col justify-start items-center border-2 w-1/4 h-64 p-2 rounded-lg shadow-lg bg-white"> 
        <Icon className="text-gray-700" size={30}/>
        <h2 className="text-xl text-gray-700 font-bold" dir="rtl">{title}</h2>
      <p className="text-gray-700 text-center leading-relaxed" dir="rtl">
        {description}
      </p>
    </div>
  )
}

export default function About() {
  return (
    <Hero background="bg-white" justify="start">
      <div className="flex flex-row justify-end w-full">
        <div className="self-start shadow-2xl mt-10 mr-30">
          <Image 
            src="/imageforaboutpage.jpg" 
            alt="about" 
            width={500}
            height={500}
            className="xl:w-[700px] xl:h-[800px] object-cover shadow-2xl rounded-lg"
          />
        </div>
        <div className="flex flex-col items-end w-1/2">
          <h1 className="text-5xl font-bold text-black my-10" dir="rtl">קצת עליי ועל הסיפור שלי</h1>  
          <h2 className="text-xl text-gray-700" dir="rtl">
          היי, אני רויטל פרצלינה, נשואה לרן ואמא ליעלי וגיאצ'וק המקסימים <br></br>
לפני מספר שנים הרגשתי שהגיע הרגע לשים את האהבה הגדולה שלי לצילום במרכז חיי המקצועיים. במסגרת הלימודית הרחבתי את הניסיון שלי בצילום ושם הבנתי שאני בעצם הכי אוהבת לעבוד עם אנשים. <br></br>
מי שמכיר אותי יודע שאני אוהבת לטייל בטבע ולגלות מקומות יפים, שאסתטיקה מאוד חשובה לי בתהליך של הצילום. ההקפדה על הלוקיישן המתאים ביותר, ועל ייעוץ סטיילינג שיאפשרו לייצר הרמוניה ויזואלית, הם חלק בלתי נפרד מהגישה המקצועית שלי. <br></br>
בצילום אני מרגישה את היכולת להתבונן על העולם מזווית שונה, ולתפוס רגעים קסומים. אני זוכה להכיר מקרוב מגוון רחב של אנשים, לחוות אתכם רגעים בלתי נשכחים ולהעניק לכם זיכרונות שילוו אתכם לכל החיים. <br></br>
אני מזמינה אתכם לחלוק איתי את הרגעים השמחים, המרגשים של חייכם, להפוך כל רגע לזיכרון ולתת לעצמכם ולקרובים לכם מתנה ייחודית, נצחית ומרגשת.
          </h2>
          <div className="border-2 border-black my-10 w-full">
          </div>
          <div className="flex flex-row justify-center items-center gap-x-4">
            <ProffesionCard title="צילום" description="בעלת תואר הנדסאי בצילום ומדיה דיגיטלית ועם 11 שנות ניסיון. זוכת תחרויות צילום בינלאומיות" icon = {CameraIcon}>
            </ProffesionCard>
            <ProffesionCard title="אביזרים" description="מתאימה מגוון רחב של אביזרים שגורמים לתמונות להיות עוד יותר מיוחדות" icon = {PaletteIcon}></ProffesionCard>
            <ProffesionCard title="עריכה" description="כל תמונה עוברת עריכה ברמה גבוהה מאוד עם דגש לפרטים הקטנים שעושים את ההבדל" icon = {EditIcon}></ProffesionCard>
            <ProffesionCard title="אלבום" description="עיצוב והדפסת אלבומים ומגוון של הדפסות תמונות" icon = {AlbumIcon}></ProffesionCard>
          </div>
          <button className="bg-black w-32 text-white px-4 py-2 my-10 rounded-md ">
            התחילו עכשיו
          </button>
      </div>

      </div>
    </Hero>
  );
} 