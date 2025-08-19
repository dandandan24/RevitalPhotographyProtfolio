import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-end bg-gray-500 px-32 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/imageforbackgroundhomepage.jpg')"}}>
      <h1 className="text-5xl font-bold text-white my-10" dir="rtl">ליצור זכרונות שנשארים</h1>
      <h1 className="text-3xl font-bold text-white" dir="rtl">תהפכו את האירועים,<br></br>
         החוויות והרגעים שלכם לזכרונות מלאי חיים<br></br>
         שיישארו אתכם שנים רבות</h1>
         <button className="bg-black w-32 text-white px-4 py-2 my-10 rounded-md ">
          התחילו עכשיו
         </button>
    </div>
  );
}
