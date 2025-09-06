'use client';
import { useState, useEffect, useRef } from 'react';
import ActiveNav from '../Components/active-nav';
import ReviewCard from '../Components/review-card';
import Image from 'next/image';
import { CameraIcon, PaletteIcon, EditIcon, AlbumIcon, Clock, MapPin, Mail, Phone} from "lucide-react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";
// Sample award-winning photos - you can replace these with actual photos
const awardPhotos = [
  {
    id: 1,
    src: '/AwardWinningImages/1.jpg',
    alt: 'Award Winning Photo 1',
  },
  {
    id: 2,
    src: '/AwardWinningImages/2.jpg',
    alt: 'Award Winning Photo 2',
  },
  {
    id: 3,
    src: '/AwardWinningImages/3.jpg',
    alt: 'Award Winning Photo 3',
    title: 'תמונה זוכת פרס 3',
  },
  {
    id: 4,
    src: '/AwardWinningImages/4.jpg',
    alt: 'Award Winning Photo 4',
    title: 'תמונה זוכת פרס 4',
  },
  {
    id: 5,
    src: '/AwardWinningImages/5.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 6,
    src: '/AwardWinningImages/6.jpg',
    alt: 'Award Winning Photo 1',
  },
  {
    id: 7,
    src: '/AwardWinningImages/7.jpg',
    alt: 'Award Winning Photo 2',
  },
  {
    id: 8,
    src: '/AwardWinningImages/8.jpg',
    alt: 'Award Winning Photo 3',
  },
  {
    id: 9,
    src: '/AwardWinningImages/9.jpg',
    alt: 'Award Winning Photo 4',
  },
  {
    id: 10,
    src: '/AwardWinningImages/10.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 11,
    src: '/AwardWinningImages/11.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 12,
    src: '/AwardWinningImages/12.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 13,
    src: '/AwardWinningImages/13.jpg',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 14,
    src: '/AwardWinningImages/14.jpg',
    alt: 'Award Winning Photo 5',
  },  
  {
    id: 15,
    src: '/AwardWinningImages/15.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 16,
    src: '/AwardWinningImages/16.jpg',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 17,
    src: '/AwardWinningImages/17.jpg',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 18,
    src: '/AwardWinningImages/18.gif',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 19,
    src: '/AwardWinningImages/19.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 20,
    src: '/AwardWinningImages/20.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 21,
    src: '/AwardWinningImages/21.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 22,
    src: '/AwardWinningImages/22.gif',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 23,
    src: '/AwardWinningImages/23.gif',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 24,
    src: '/AwardWinningImages/24.jpg',
    alt: 'Award Winning Photo 5',
  },
  {
    id: 25,
    src: '/AwardWinningImages/25.gif',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 26,
    src: '/AwardWinningImages/26.jpg',
    alt: 'Award Winning Photo 5',
  },
  

  {
    id: 27,
    src: '/AwardWinningImages/27.jpg',
    alt: 'Award Winning Photo 5',
  },
  
  {
    id: 28,
    src: '/AwardWinningImages/28.jpg',
    alt: 'Award Winning Photo 5',
  },
  

    {
      id: 29,
      src: '/AwardWinningImages/29.gif',
      alt: 'Award Winning Photo 5',
    },
    {
      id: 30,
      src: '/AwardWinningImages/30.gif',
      alt: 'Award Winning Photo 5',
    },
    {
      id: 31,
      src: '/AwardWinningImages/31.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 32,
      src: '/AwardWinningImages/32.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 33,
      src: '/AwardWinningImages/33.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 34,
      src: '/AwardWinningImages/34.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    
    {
      id: 35,
      src: '/AwardWinningImages/35.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 36,
      src: '/AwardWinningImages/36.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 37,
      src: '/AwardWinningImages/37.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 38,
      src: '/AwardWinningImages/38.gif',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 39,
      src: '/AwardWinningImages/39.jpg',
      alt: 'Award Winning Photo 5',
    },
    
    {
      id: 40,
      src: '/AwardWinningImages/40.gif',
      alt: 'Award Winning Photo 5',
    },
    {
      id: 41,
      src: '/AwardWinningImages/41.jpg',
      alt: 'Award Winning Photo 5',
    },
    {
      id: 42,
      src: '/AwardWinningImages/42.gif',
      alt: 'Award Winning Photo 5',
    },
    
      


];

// Reviews data
const reviews = [
  {
    name: 'גלית רז',
    type: 'צילומי גיל מצווה',
    review:'הילדה שלי הגיע לגיל בת מצווה ורציתי לייצר לה זיכרון משמעותי מהגיל הזה. התחלתי לבדוק את ההיצע הרב שיש ונתקלתי בעבודות של רויטל. התמונות הטבעיות מיד תפסו לי את העין והבנתי שזה מה שאני רוצה לבת שלי.הבת שלי היא לא בדיוק הטיפוס שאוהב להצטלם אבל עם מקצועיות, עדינות והכלה אין סופית של רויטל יצא לנו אלבום מושלם ומזכרת מתוקה מתוקה מהגיל היפה הזה.תודה לך רויטל את אלופה ומקצועית ביותר.הבן הגדול שלי חייל לוחם ומאוד התקשינו לייצר מצב שהוא יגיע לחלק של תמונות המשפחה רויטל לא ויתרה והגיעה ביום שבת לצלם אותנו. אין רגישות ונתינה כזאת❤️❤️❤️',
    stars: 5,
    initial: 'ג'
  },
  {
    name: 'הדר קובי',
    type: 'צילומי הריון',
    review: 'רויטל היקרה,תודה רבה על חווית צילומי הריון ומשפחה טובה מאוד.הסבלנות שלך, והאווירה החיובית מסביב בשילוב עם מקצועיות, גורמת גם לאנשים שלא אוהבים להצטלם, להנות מהחוויה וכמובן מהתוצאותהאלבום מושלם!אין לי ספק שנתראה שוב ממליצה בחום ❤️',  
    stars: 5,
    initial: 'ה'
  },
  {
    name: 'רותם גזית',
    type: 'צילומי בוק שחקן',
    review: 'רוצה להמליץ בחום על רויטל הצלמת – מקצועית, רגישה ופשוט אלופה! צילמה את הבת שלי ויצאו תמונות קסומות, מלאות רגש ואור. רויטל הצליחה ליצור אווירה נעימה וקלילה, והילדה הרגישה הכי בנוח מולה. הכל זרם בצורה טבעית והתוצאה פשוט מושלמת.אם אתם מחפשים צלמת עם עין חדה, גישה מהממת לילדים ויחס אישי – רויטל היא הבחירה הכי טובה שיש',
    stars: 5,
    initial: 'ר'
  },
  {
    name: 'קטי כהן',
    type: 'צילומי גיל שנה',
    review: 'רויטל עזרה לי ליצור תמונות תדמית מקצועיות ומרשימות. היא יודעת איך להבליט את היתרונות שלי ולתפוס את המבט הנכון. התמונות עזרו לי מאוד בקריירה!המתנה הכי שווה שקיבלתי ללידת התאומיקס המהממים שלנו ❤️ כמה כיף לקבל מתנה כזאת מושלמת ! צלמת מוכשרת, מקצועית , סופר חביבה ומצויינת עם ילדים (4 ילדים :) יצאו תמונות מושלמות! רויטל הייתה נעימה , מעבר לתמונות הייתה חוויה , הצילום בטבע אין תחליף לו בעיניי . זכינו ! תודה ! וכמובן שהכי ממליצים !',
    stars: 5,
    initial: 'ק'
  },
  {
    name: 'אוסנת כהן',
    type: 'צילומי ילדים',
    review: 'הצילומים של הילדים שלנו יצאו פשוט מושלמים! רויטל יודעת איך לגרום להם להרגיש בנוח ולהתנהג טבעי. התמונות מלאות שמחה ואנרגיה.אין אין לי מילים צלמת מקצועית עושה עבודת שטח לפני הצילומים במהלך הצילומים מצליחה לתפוס כול פריים בצורה הכי מקצועית והכי חשוב מלאת סבלנותרויטל יקרה תודה על אחרצ מרגש מלא כיף ומותאם לאביה המיוחדת שלי,',
    stars: 5,
    initial: 'א'
  },
  {
    name: 'זהר זיתון',
    type: 'צילומי תדמית',
    review: 'רויטל יקרה, תודה על יום צילומי תדמית מקצועי ואיכותי ולמרות שאני שונאת להצטלם, חייבת לומר שקצת נהניתי , הצלחת לגרום לי להרגיש בנוח והתמונות שיצאו מהיום הזה מדהימות . תודה לך',
    stars: 5,
    initial: 'ז'
  },
  {
    name: 'עדי בוחבוט',
    type: 'צילומי בייבי',
    review: 'קבענו עם רויטל צילומי חצי שנה לבן שלי, אחרי שקיבלנו המלצה חמה.היא פשוט אלופה! הייתה לנו חוויה מהממת והתמונות יצאו פשוט מושלם.רויטל מקסימה ומקצועית. עזרה לנו לבחור את הבגדים לצילומים, ובצילומים עצמם השרתה אווירה נינוחה ורגועה. היה לנו זמן משפחתי מקסים, והתמונות.... מ ה מ מ ו ת!!!רויטל תודה על הזיכרון הנפלא! אין ספק שאת בחירה מצויינת, נגיע שוב בצילומי גיל שנה 🙌😇',
    stars: 5,
    initial: 'ע'
  },
  {
    name: 'אורית גרין',
    type: 'צילומי גיל מצווה',
    review: 'ממליצה מאד על צילומים עם רויטל!החוויה של יום צילום לבוק בת מצווה וצילומי משפחה עם רויטל, היתה עבור כולנו חוויה מעצימה וכיפית, שתלך אתנו שנים והתוצאה מרהיבה במיוחד.מעבר לעובדה, שהתמונות יצאו מדהימות והבוק מהמם, רויטל מקסימה, התחברה אלינו כבר משיחות הטלפון לפני הצילומים, עזרה בתכנון, וזרמה עם בת המצווה ועם כולנו. כך רויטל הפכה עבורנו את החוויה למיוחדת וכיפית במיוחד. הזרימה של רויטל והאוירה שהיא יוצרת סביבה, מאפשרת להפתח מול המצלמה, גם למי שזה לא טבעי או קל.תודה, רויטל!אין לי ספק שכשנחפש צלמת - נחזור אליך.',
    stars: 5,
    initial: 'א'
  },
  {
    name: 'יעל שטיינברג',
    type: 'צילומי גיל מצווה',
    review: 'רויטל הייתה צלמת משפחה/בת מצווה של ביתי. היה מופלא. מעבר לעובדה שהתמונות יצאו מקסימות, היה לנו כייף להצטלם, רויטל נתנה לביתי תחושה נוחה להצטלם, נהנינו מנוכחותה באירוע וממקצועיותה. ממליצה בחום❤️',  
    stars: 5,
    initial: 'י'
  },
  {
    name: 'מרינה מיכאלי',
    type: 'צילומי גיל מצווה',
    review: 'וואו איזה יום יפה ומרגש עברנו. חוויה מטורפת לילדה.רויטל, רוצה להודות לך על כל התהליך הנעים ומשמח לא רק את הילדה אלה את כל המשפחה שלנו!הכרנו אישיות כה עדינה ונעימה וכה מסורה למה שאת עושה! נהננו מכל רגע של צילומים בהובלה ובבחירות שלך.תודה על היום הזה. 🫶🙏🫶בהחלט לוייה לכל חיי המשפחה שלנו 😍',
    stars: 5,
    initial: 'מ'
  },
  {
    name: 'שרון נהון',
    type: 'צילומי בת מצווה',
    review: 'רויטל מדהימה, עשינו בוק בת מצווה ועוד לפני הצילומים שוחחה עם בתי כדי להבין מה הרצונות שלה, היתה הכי סבלנית ונעימה ונהננו מאוד איתה. זרמה עם הבת שלי ונתנה לה להרגיש הכי בנוח והתוצאה מדהימה!!',
    stars: 5,
    initial: 'ש'
  },
  {
    name: 'מורן כהן',
    type: 'צילומי גיל מצווה',
    review: 'קיבלנו המלצה על רויטל מחברים, נחתנו ישר מארה״ב ליום צילומים מרגש. גילנו צלמת מדהימה, רגישה, סבלנית, גמישה (במהלך כל הדרך היו הרבה שינויים וזומים), קשובה ומקצועית!רויטל נכנסה לנו ללב ועשתה לגאיה יום צילומים שלא ישכח עם זיכרון מושלם.היה לגאיה ולנו יום צילומי בתמצווש מושלם',
    stars: 5,
    initial: 'מ'
  },

  {
    name: 'מורן חן',
    type: 'צילומי גיל מצווה',
    review: 'ממליצה מאוד על רויטל , עשינו אצלה את הבוק לבת מצווה של הבת שלי.היום צילומים התנהל בכיף וברוגע.לרויטל יש ממש גישה חיובית וטובה והבת שלי זרמה איתה ועם כל רעיון שלה לתמונה.התוצאה בסוף יצאה לא פחות ממושלמת .ממליצה בחום',
    stars: 5,
    initial: 'מ'
  },
  {
    name: 'יפית אפרים',
    type: 'צילומי גיל מצווה',
    review: 'רויטל צלמת מקסימה! סבלנית ומקצועית. הבת שלי מאד נהנתה מיום הצילום והאלבום יצא ממש מושקע ויפה. ממליצה בחום!!!',
    stars: 5,
    initial: 'י'
  },
  {
    name: 'מוני אור',
    type: 'צילומי גיל מצווה',
    review: 'היתה לנו חוויה מושלמתאופיר כל כך נהנתה מהצילומים מהמיקום המהמם שרויטל לקחה אותנו והכי חשוב מהיחס ומתשומת הלב המהממת של רויטל במהלך השעות שבילינו יחד, היא הרגישה נסיכה ליום אחדוכשהגיעו התמונות עפנו עליהן, גם אנחנו וגם אופירהבוק יצא מושלם',
    stars: 5,
    initial: 'מ'
  },
  {
    name: 'אסתר קסטרו',
    type: 'צילומי ילדים',
    review: 'צלמת מוכשרת ברמה הכי גבוה שיש, מדוייקת מקצועית, מייצרת אווירה נעימה לילד, ומצליחה להוציא את המיטב מהילד בצורה הטבעית ביותר שניתן. בהחלט ממליצה בחום. ❤️',
    stars: 5,
    initial: 'א'
  },
  {
    name: 'יפעת איפלה',
    type: 'צילומי גיל מצווה',
    review : 'ממליצה מאוד על רויטל! החויה שלנו היתה מהממת ורויטל היא אדם מדהים, נעים, חם שמייצר קשר ואוירה מדהימה שכל כך חשוב כאשר מתעסקים עם בנות מצווה. היא צלמת מוכשרת ומקצועית והתוצרים שלה כל כך יפים שרק המבט על התמונות מדבר בעד עצמו - כאשר מסתכלים על התוצרים שלה מבינים את הפירוש למשפט ״תמונה אחת שווה אלף מילים״ אם אתם מחפשים איכות, מקצועיות ואוירה טובה, אתם יכולים להפסיק את החיפושים כי מצאתם - רויטל ! תודה על חויה מהממת ובע״ה ניפגש בהמשך בשמחות נוספות. חג חנוכה שמח ומלא אור!',
    stars: 5,
    initial: 'י'
  },
  {
    name: 'מרים פרשני',
    type: 'צילומי דורות',
    review: 'רויטל היקרה. עברנו איתך חוויה בלתי נשכחת בתהליך הפקת אלבום ה-70 שלי. המפגש הראשון בינינו היה בסופש במלון יהודה בירושלים שאורגן לכבודי על ידי בעלי והילדים לרגל יום הולדתי ה-70. רויטל, את צלמת מקצועית, הושבת אותי בפוזות שהזכירו לי את תמונות החתונה שלי.ולאחרמכן הובלת אותנו לסדרת תמונות משפחתיות ביער הסמוך. נפגשנו כ-30 אנשים. ילדים ומבוגרים לשיח במעגל כשמטרתך לספוג ולדלות בדרך יצירתית את מירב הידע עלי ועל היחסים ביני לבין בני משפחתי. בשבילי התהליך כולו של חיפוש חומרים תמונות וכתיבת טקסט היווה חוויה מרגשת של העלאת זכרונות וחוויות חיים שלא עולות במהלך חיי השגרה. תודה גדולה על מתנה מלאת זכרונות',
    stars: 5,
    initial: 'מ'
  },
  {
    name: 'יפית שמיע',
    type: 'צילומי גיל מצווה',
    review:'רויטל עשתה לנו צילומים לבת מצווה של ביתי הקטנה , בחירת הלוקיישן הייתה מושלמת , רויטל נעימה ומקצועית הייתה לנו חוויה מושלמת עם רויטל , והאלבום יצא מהמם מעל הציפיות שלנו . ממליצה בחום .',
    stars: 5,
    initial: 'י'
  },
  {
    name: 'שקד גלפרין',
    type: 'צילומי משפחה',
    review :'רויטל אהובה🥰רצינו להודות לך על יום כייף ומלא חיוכים ושמחה בחברתך, זכינו שמצאנו לנו צלמת כל כך נעימה שהחיוך תמיד פרוש על פניה. תודות ליחס החם ולאוירה הנעימה שהשרת. את שילוב של כשרון מקצועי: בעיצוב של הסטים וביכולת לתפוס את ה-רגע וגם כשרון בינאישי, ביכולת לגרום לנו להרגיש כל כך נעים ונח בסביבתך, ובכך להוציא את המיטב בתמונות. מחכים לפעם הבאה… תודה🌺מאחלת לעוד אנשים שיזכו להצטלם איתך ולזכות במזכרות האלה לכל החיים.🥰',
    stars: 5,
    initial: 'ש'
  },
  {
    name: 'עינת רונן',
    type: 'צילומי ילדים',
    review: 'ממליצה בחום על רויטל!! הבת הקטנה שלי הצטלמה אצלה בשבועות והיה מדהים. רויטל מהממת עם הגילאים הצעירים, הצליחה להוציא ממנה את המקסימום ובנוסף התמונות יצאו מדהים. ממש ממליצה!!',
    stars: 5,
    initial: 'ע'
  },
  {
    name: 'רונה אלרום',
    type: 'צילומי גיל מצווה',
    review: 'רויטל המקסימה, תודה לך על יום הצילומים המדהים, המהנה ומלא קסם שעשית עבור אריאל שחגגה 12, כבוק בת מצווה. זו הייתה חוויה נהדרת עבורה וגם עבורי התחלנו את הבוקר בכיף גדול וביום מלא פעילות. היית נעימה, קשובה ומכילה לאורך כל התהליך. הבאת שפע של ציוד ואביזרים כך שכל תמונה תצא לא פחות ממיליון דולר. וכך היה, יצא בוק מושלם עם תמונות מקצועיות ומלאות קסם ואור. שמחנו להכיר אותך ובהחלט נמליץ לכל חברנו ומכרנו לפנות אלייך.. המשיכי להצליח ולשמח לבבות של משפחות רבות בדיוק כמו שלנו. תודה רבה רונה ואריאל אלרום',
    stars: 5,
    initial: 'ר'
  },
  {
    name: 'ציפי יוסף',
    type: 'צילומי גיל מצווה',
    review: 'בצילומי הבוק לבת מצווה רויטל נתנה לבת שלי יום של חוויות מעצימות, בנעים, ברגוע (לא טריוויאלי כשמצלמים מתבגרת) וגם האלבום והתמונות בסוף יצאו פשוט מהממים. ממליצה בחוםם',
    stars: 5,
    initial: 'צ'
  },
  {
    name: 'חיים גולדשלגר',
    type: 'צילומי דורות',
    review: 'רויטל מקצוענית, הצליחה ליצור אלבום מהודר של חיים שלמים. 7 תחנות בחיי ולהעניק לי אותו בחיי.האלבום מעוצב וכרוך בתצורה מדהימה ומכובדת.נכתב ועוטר בתמונות מרהיבות שלי ושל המשפחה הנפלאה שלי.התוצאה המדברת בפני עצמה.',
    stars: 5,
    initial: 'ר'
  },
];

export default function Recommendations() {
  const [slidePosition, setSlidePosition] = useState(0);
  const [photoWidths, setPhotoWidths] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate the total width of all photos
  const getTotalWidth = () => {
    return photoWidths.reduce((total, width) => total + width, 0);
  };

  // Measure photo widths after component mounts
  useEffect(() => {
    const measureWidths = () => {
      const widths = photoRefs.current.map(ref => ref?.offsetWidth || 0);
      setPhotoWidths(widths);
    };
    
    // Measure on mount
    measureWidths();
    
    // Reset carousel position on mobile refresh
    if (window.innerWidth < 768) {
      setSlidePosition(0);
    }
    
    // Measure on resize for mobile responsiveness
    window.addEventListener('resize', measureWidths);
    
    // Cleanup
    return () => window.removeEventListener('resize', measureWidths);
  }, []);

  // Continuous sliding motion with infinite loop (Desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return; // Only for desktop
    
    const totalWidth = getTotalWidth();
    if (totalWidth === 0) return;

    const duration = 150000; // 90 seconds for one complete cycle (slower)
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      
      // Calculate position for infinite loop (duplicate photos for seamless loop)
      const position = -(progress * totalWidth);
      setSlidePosition(position);
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    // Start animation
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => cancelAnimationFrame(animationId);
  }, [photoWidths]);

  // Mobile-specific animation that's completely independent of scroll events
  useEffect(() => {
    if (window.innerWidth >= 768) return; // Only for mobile
    
    const totalWidth = getTotalWidth();
    if (totalWidth === 0) return;

    // Always start from beginning on mobile
    setSlidePosition(0);
    
    // Use CSS animation for completely scroll-independent sliding
    const carouselElement = document.querySelector('.carousel-container .flex');
    if (carouselElement) {
      // Remove any existing transform
      (carouselElement as HTMLElement).style.transform = '';
      
      // Add mobile carousel animation class and set CSS variables
      if (carouselElement) {
        carouselElement.classList.add('mobile-carousel-slide');
        (carouselElement as HTMLElement).style.setProperty('--total-width', `${totalWidth}px`);
        (carouselElement as HTMLElement).style.setProperty('--animation-duration', '210s');
      }
    }
    
    // Cleanup function
    return () => {
      if (carouselElement) {
        carouselElement.classList.remove('mobile-carousel-slide');
        (carouselElement as HTMLElement).style.removeProperty('--total-width');
        (carouselElement as HTMLElement).style.removeProperty('--animation-duration');
      }
    };
  }, [photoWidths]);

  // Debug logging for mobile troubleshooting
  useEffect(() => {
    console.log('Photo widths:', photoWidths);
    console.log('Total width:', getTotalWidth());
    console.log('Slide position:', slidePosition);
  }, [photoWidths, slidePosition]);

  // Calculate progress percentage for the progress bar
  const getProgress = () => {
    const totalWidth = getTotalWidth();
    if (totalWidth === 0) return 0;
    
    const elapsed = Date.now() % 60000; // 60 seconds cycle
    return (elapsed / 60000) * 100;
  };

  return (
    <>
      <ActiveNav href="/Recommendations" />
      <div className="animate-in fade-in duration-700">
      {/* Full-Width Photo Carousel Section */}
      <div className="w-full">
        <div className="max-w-full mx-auto">
          <div className="text-center py-6 md:py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4" dir="rtl">
              תמונות <span className="text-[#F1BDAF]">זוכות פרסים</span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 px-4 md:px-0" dir="rtl">
              אני גאה לשתף אתכם ברגעי הקסם שתפסתי דרך העדשה – מוזמנים לגלול, להתרשם, ולהרגיש את הקסם בכל תמונה.
            </p>
          </div>

          <div className="relative w-full mx-auto">
            {/* Main Photo Display - Multiple Photos */}
            <div className="relative h-64 md:h-96 overflow-hidden carousel-container">
              <div 
                className="flex w-full h-full transition-transform duration-1000 ease-out"
                style={!isMobile ? { transform: `translateX(${slidePosition}px)` } : {}}
              >
                {/* Original photos */}
                {awardPhotos.map((photo, index) => (
                  <div 
                    key={`original-${photo.id}`}
                    className="flex-shrink-0 h-full"
                    ref={el => { photoRefs.current[index] = el; }}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${photo.src}`}
                      alt={photo.alt}
                      width={400}
                      height={300}
                      className="h-full w-auto object-cover min-w-0"
                      priority={index < 3}
                    />
                  </div>
                ))}
                {/* Duplicate photos for seamless loop */}
                {awardPhotos.map((photo, index) => (
                  <div 
                    key={`duplicate-${photo.id}`}
                    className="flex-shrink-0 h-full"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${photo.src}`}
                      alt={photo.alt}
                      width={400}
                      height={300}
                      className="h-full w-auto object-cover min-w-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Recommendations Section - Full Width Below Carousel */}
      <div className="w-full bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-right" dir="rtl">
              המלצות <span className="text-[#F1BDAF]">לקוחות</span>
              </h2>
              
            <p className="text-lg text-gray-600 -mb-5 text-right" dir="rtl">
              מה הלקוחות שלי אומרים על החוויה והתוצאות של צילומים מקצועיים
            </p>
                </div>

          <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#F1BDAF] scrollbar-track-gray-100">
            {reviews.map((review, index) => (
              <ReviewCard 
                      key={index}
                name={review.name}
                type={review.type}
                review={review.review}
                stars={review.stars}
                initial={review.initial}
                    />
                  ))}
          </div>
        </div>
      </div>
                  {/* Mobile Footer with Contact Details */}
        <footer className="border-t bg-white w-full mt-8 ">
        <div className="w-full mx-auto xl:w-[90%] px-4 sm:px-6 lg:px-8 xl:px-0 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
            {/* Social */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">רשתות חברתיות</h3>
              <div className="flex flex-row gap-4">
                <a href="https://www.instagram.com/revitalphotography/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram className="size-6 hover:text-pink-500 transition-colors" />
                </a>
                <a href="https://www.facebook.com/revitalphotography" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook className="size-6 hover:text-blue-600 transition-colors" />
                </a>
                <a href="https://api.whatsapp.com/send?phone=972548788851" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp className="size-6 hover:text-green-500 transition-colors" />
                </a>
                <a href="https://www.tiktok.com/@revital_photography" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <FaTiktok className="size-6 hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Contact details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">פרטי התקשרות</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Phone size={18} style={{ color: '#F1BDAF' }} />
                  <span>054-8788851</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} style={{ color: '#F1BDAF' }} />
                  <a href="mailto:rosenbergdan6@gmail.com" className="hover:underline">rparzelina@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Address / Hours */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">פרטים נוספים</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <MapPin size={18} style={{ color: '#F1BDAF' }} />
                  <span>יהוד</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Clock size={18} style={{ color: '#F1BDAF' }} />
                    <span>ימים א'-ה': 8:00-17:00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={18} style={{ color: '#F1BDAF' }} />
                    <span>ו': 8:00-14:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 sm:px-4 pb-6 text-sm text-gray-500">
          <span className="block text-left" dir="rtl"> © כל הזכויות שמורות לרויטל פרצלינה</span>
        </div>
      </footer>
      </div>
    </>
  );
}