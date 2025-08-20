'use client';

import Hero from "../Components/hero";
import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Facebook, Phone, Mail, MapPin, Clock} from "lucide-react";
import { FaWhatsapp, FaTiktok, FaInstagram, FaFacebook} from "react-icons/fa";
import ActiveNav from "../Components/active-nav";
import { useState } from "react";

function ContactCard() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
            // TODO: Add your submit function here
            console.log('Form submitted:', { email, phone });
        }
    };

    const isFormValid = email.trim() && phone.trim();

    return(
        <div className="flex flex-row items-start justify-center shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1),0_10px_25px_-5px_rgba(0,0,0,0.1)] rounded-lg p-8 w-3/4">
            <div className="w-4/10" dir="rtl">
                <div className="mb-10">
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
                            <FaTiktok className="size-6 hover:text-pink-500 transition-colors text-black"/>
                        </a>
                    </div>
                </div>
                <div className="mb-10">
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
                <div className="mb-10">
                    <h2 className="text-lg font-semibold mb-2">כתובת</h2>
                    <div className="w-16 h-0.5 bg-[#F1BDAF] mb-4"></div>
                    <div className="flex flex-row gap-3">
                        <MapPin className="text-[#F1BDAF]" />
                        <h2>יהוד</h2>
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className="text-lg font-semibold mb-2">שעות עבודה</h2>
                    <div className="w-16 h-0.5 bg-[#F1BDAF] mb-4"></div>
                    <div className="flex flex-row gap-3">
                        <Clock className="text-[#F1BDAF]" />
                        <h2>א'-ה' 9:00-18:00</h2>
                        <h2>ו' 9:00-14:00</h2>
                    </div>
                </div>
            </div>
            <div className="w-6/10" dir="rtl">
                <div className="grid w-3/4 items-center gap-3">
                    <Label htmlFor="Name">שם מלא</Label>
                    <Input type="Name" id="Name" placeholder="שם מלא"/>
                    <Label htmlFor="Email">כתובת מייל</Label>
                    <Input 
                        type="Email" 
                        id="Email" 
                        placeholder="כתובת מייל" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={emailError ? 'border-red-500 focus:border-red-500' : ''}
                    />
                    {emailError && <p className="text-red-500 text-sm -mt-2">כתובת המייל היא שדה חובה</p>}
                    <Label htmlFor="Phone">טלפון</Label>
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
                    <Textarea placeholder="תאר את הבקשה או השאלה שלך כאן" id="message" className="min-h-32 w-full resize-none" />
                    <button 
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`w-32 text-white px-4 py-2 my-10 rounded-md transition-colors ${
                            isFormValid 
                                ? 'bg-[#F1BDAF] hover:bg-[#E8A99A] cursor-pointer' 
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        שליחה
                    </button>
                    {!isFormValid && (
                        <p className="text-gray-500 text-sm text-center -mt-8 mb-4">
                            יש למלא את שדות המייל והטלפון כדי לשלוח את ההודעה
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function Contact() {
    return (
        <>
            <ActiveNav href="/Contact" />
            <Hero background="bg-white" justify="start" alignment="center">
                <h1 className="text-5xl font-bold text-black mt-16" dir="rtl">צור <span className="text-[#F1BDAF]">קשר</span></h1>
                <h2 className="text-2xl text-black mt-4 text-center w-3/4 mb-6" dir="rtl">אני זמינה בשבלכם באימייל, בווצאפ ובטלפון. אתם מוזמנים גם להשתמש בטופס כאן בשביל לשלוח שאלה על השירותים שאני מציעה או על הפרויקטים שעשיתי</h2>
                <ContactCard />
            </Hero>
        </>
    )
}