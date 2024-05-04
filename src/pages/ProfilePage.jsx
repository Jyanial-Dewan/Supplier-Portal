import GlobalContext from "@/context/GlobalContext";
import { useContext, useState } from "react";
import QRCode from "qrcode.react";
import { supabaseUrl, supabaseKey } from "@/client";

const ProfilePage = () => {
    const context = useContext(GlobalContext);
    const { token, open } = context;
    const [show, setShow] = useState(false);
    console.log(supabaseKey, supabaseUrl);
  return (
    <section className={open? "pt-32 pl-[7rem] pr-4 duration-1000" : "pt-32 pl-[17.5rem] pr-4 duration-1000"} >
      <h2 className="font-semibold text-lg text-center mb-6">Profile</h2>
      <div className="flex gap-4">
        <div className="px-6 py-4 border border-gray-100 shadow-sm flex-shrink">
            <p>email: {token.user.email}</p>
            <p>id: {token.user.id}</p>
        </div>
        
        <div className="px-6 py-4 border border-gray-100 shadow-sm">
            <h2 className="text-center font-semibold text-lg mb-4">Site QR Code</h2>
            <QRCode values={supabaseUrl} size={250}/>
        </div>

        <div className="px-6 py-4 border border-gray-100 shadow-sm flex flex-col items-center">
            
            <h2 className="text-center font-semibold text-lg mb-4">Log In QR Code</h2>
            <QRCode values={supabaseKey} size={250} className={show? "mt-0": "hidden"}/>
            <button className="bg-black text-white mt-4 p-3 rounded-sm" onClick={()=>setShow(!show)}>{show? "Hide": "Show" } Log In QR code</button>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
