'use client';

import Hero from "../Components/hero";
import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Phone, Mail, MapPin, Clock} from "lucide-react";
import { FaWhatsapp, FaTiktok, FaInstagram, FaFacebook} from "react-icons/fa";
import ActiveNav from "../Components/active-nav";
import { useState } from "react";

function ContactCard() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const handleSubmit = () => {
        // Reset previous errors
        setEmailError(false);
        setPhoneError(false);

        // Check if fields are filled
        if (!email.trim()) {
            setEmailError(true);
        }
        if (!phone.trim()) {
            setPhoneError(true);
        }

        // Only proceed if both fields are filled
        if (email.trim() && phone.trim()) {
            // Create WhatsApp message
            const whatsappMessage = `שלום! אני ${name || 'לקוח חדש'} ואני מעוניין/ת בשירותי הצילום שלך.

פרטי התקשרות:
שם: ${name || 'לא צוין'}
אימייל: ${email}
טלפון: ${phone}

הודעה: ${message || 'לא צוינה הודעה'}

אשמח לקבל פרטים נוספים על השירותים שלך!`;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp API URL
            const whatsappUrl = `https://api.whatsapp.com/send?phone=972548788851&text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Log for debugging
            console.log('Form submitted:', { name, email, phone, message });
        }
    };

    const isFormValid = email.trim() && phone.trim();

    return(
        <>
            {/* Desktop Layout - Full card with both sides */}
            <div className="hidden md:flex flex-row items-start justify-center shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1),0_10px_25px_-5px_rgba(0,0,0,0.1)] rounded-lg p-8 w-3/4 xl:w-11/12 2xl:w-3/4 xl:py-6">
                <div className="w-4/10" dir="rtl">
                    <div className="mb-10 xl:mb-6">
                        <h2 className="text-lg font-semibold mb-2">רשתות חברתיות</h2>
                        <div className="w-16 h-0.5 bg-[#F1BDAF] mb-4"></div>
                        <div className="flex flex-row gap-4">
                            <a href="https://www.instagram.com/revitalphotography/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="size-6 hover:text-pink-500 transition-colors text-black"/>
                            </a>
                            <a href="https://www.facebook.com/revitalphotography" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="size-6 hover:text-blue-500 transition-colors text-black"/>
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=972548788851" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp className="size-6 hover:text-green-500 transition-colors text-black"/>
                            </a>
                            <a href="https://www.tiktok.com/@revital_photography" target="_blank" rel="noopener noreferrer">
                                <FaTiktok className="size-6 hover:text-blue-400 transition-colors text-black"/>
                            </a>
                        </div>
                    </div>
                    <div className="mb-10 xl:mb-6">
                        <h2 className="text-lg font-semibold mb-2">פרטי התקשרות</h2>
                        <div className="w-16 h-0.5 bg-[#F1BDAF] mb-4"></div>
                        <div className="flex flex-row gap-3 mb-3">
                            <Phone className="text-[#F1BDAF]" />
                            <h2>054-8788851</h2>
                        </div>
                        <div className="flex flex-row gap-3 mb-3">
                            <Mail className="text-[#F1BDAF]" />
                            <h2>rparzelina@gmail.com</h2>
                        </div>
                    </div>
                    <div className="mb-10 xl:mb-6">
                        <h2 className="text-lg font-semibold mb-2">כתובת</h2>
                        <div className="w-16 h-0.5 bg-[#F1BDAF] mb-4"></div>
                        <div className="flex flex-row gap-3">
                            <MapPin className="text-[#F1BDAF]" />
                            <h2>יהוד</h2>
                        </div>
                    </div>
                    <div className="mb-10 xl:mb-6">
                        <h2 className="text-lg font-semibold mb-2">שעות עבודה</h2>
                        <div className="w-16 h-0.5 bg-[#F1BDAF] mb-4"></div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-3">
                                <Clock className="text-[#F1BDAF]" />
                                <h2>א'-ה': 9:00-18:00</h2>
                            </div>
                            <div className="flex flex-row gap-3">
                                <Clock className="text-[#F1BDAF]" />
                                <h2>ו': 9:00-14:00</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-6/10" dir="rtl">
                    <div className="grid w-3/4 items-center gap-3">
                        <Label htmlFor="Name">שם מלא</Label>
                        <Input type="Name" id="Name" placeholder="שם מלא" value={name} onChange={(e) => setName(e.target.value)}/>
                        <Label htmlFor="Email">*כתובת מייל</Label>
                        <Input 
                            type="Email" 
                            id="Email" 
                            placeholder="כתובת מייל" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {emailError && <p className="text-red-500 text-sm -mt-2">כתובת המייל היא שדה חובה</p>}
                        <Label htmlFor="Phone">*טלפון</Label>
                        <Input 
                            type="Phone" 
                            id="Phone" 
                            placeholder="טלפון" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={phoneError ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {phoneError && <p className="text-red-500 text-sm -mt-2">מספר הטלפון הוא שדה חובה</p>}
                        <Label htmlFor="message">תיאור</Label>
                        <Textarea placeholder="תאר את הבקשה או השאלה שלך כאן" id="message" className="min-h-32 w-full resize-none" value={message} onChange={(e) => setMessage(e.target.value)}/>
                        <Button 
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                            variant={isFormValid ? "standard" : "secondary"}
                            className="w-32 my-10"
                        >
                           שלח מייל
                        </Button>
                        {!isFormValid && (
                            <p className="text-gray-500 text-sm text-center -mt-8 mb-4">
                                יש למלא את שדות המייל והטלפון כדי לשלוח את ההודעה
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Layout - Only the form */}
            <div className="md:hidden w-full px-4">
                <div className="bg-white rounded-lg shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1),0_10px_25px_-5px_rgba(0,0,0,0.1)] p-6" dir="rtl">
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="Name-mobile">שם מלא</Label>
                        <Input type="Name" id="Name-mobile" placeholder="שם מלא" value={name} onChange={(e) => setName(e.target.value)}/>
                        <Label htmlFor="Email-mobile">*כתובת מייל</Label>
                        <Input 
                            type="Email" 
                            id="Email-mobile" 
                            placeholder="כתובת מייל" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {emailError && <p className="text-red-500 text-sm -mt-2">כתובת המייל היא שדה חובה</p>}
                        <Label htmlFor="Phone-mobile">*טלפון</Label>
                        <Input 
                            type="Phone" 
                            id="Phone-mobile" 
                            placeholder="טלפון" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={phoneError ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {phoneError && <p className="text-red-500 text-sm -mt-2">מספר הטלפון הוא שדה חובה</p>}
                        <Label htmlFor="message-mobile">תיאור</Label>
                        <Textarea placeholder="תאר את הבקשה או השאלה שלך כאן" id="message-mobile" className="min-h-16 w-full resize-none" value={message} onChange={(e) => setMessage(e.target.value)}/>
                        <Button 
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                            variant={isFormValid ? "standard" : "secondary"}
                            className="w-full my-6"
                        >
                           שלח מייל
                        </Button>
                        {!isFormValid && (
                            <p className="text-gray-500 text-sm text-center -mt-4 mb-4">
                                יש למלא את שדות המייל והטלפון כדי לשלוח את ההודעה
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Contact() {
    return (
        <>
            <ActiveNav href="/Contact" />
            <Hero background="bg-white" justify="start" alignment="center">
                <h1 className="font-bold text-black 2xl:mt-16 xl:mt-8 mt-4 2xl:text-5xl xl:text-4xl text-4xl" dir="rtl">צור <span className="text-[#F1BDAF]">קשר</span></h1>
                <h2 className="text-black mt-4 text-center xl:w-3/4 2xl:w-3/4 2xl:mb-6 xl:mb-6 mb-2 2xl:text-2xl xl:text-xl text-lg md:w-full" dir="rtl">אני זמינה בשבילכם באימייל, בווטצאפ ובטלפון. אתם מוזמנים גם להשתמש בטופס כאן בשביל לשלוח שאלה על השירותים שאני מציעה או על הפרויקטים שעשיתי</h2>
                <ContactCard />
            </Hero>

            {/* Mobile Footer with Contact Details */}
            <footer className="border-t bg-white w-full mt-8 md:hidden">
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
          <span className="block text-left" dir="rtl">כל הזכויות שמורות לרויטל פרצלינה</span>
        </div>
      </footer>
        </>
    )
}