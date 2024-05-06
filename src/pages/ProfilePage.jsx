import GlobalContext from "@/context/GlobalContext";
import { useContext, useState } from "react";
import QRCode from "react-qr-code";

const ProfilePage = () => {
    const context = useContext(GlobalContext);
    const { token, open } = context;
    const [show, setShow] = useState(false);
    console.log(token);
  return (
    <section className={open? "pt-24 flex flex-col items-center pl-[7rem] pr-4 duration-1000" : "pt-24 flex flex-col items-center pl-[17.5rem] pr-4 duration-1000"} >
      <h2 className="font-semibold text-lg text-center mb-6">Profile</h2>
      <div className="flex gap-4">
        <div className="px-6 py-4 border border-gray-100 shadow-sm flex-shrink">
            <p>Name: {token.user.user_metadata.first_name}</p>
            <p>Email: {token.user.email}</p>
            <p>User Name: {token.user.user_metadata.user_name}</p>
            <p>Job Title: {token.user.user_metadata.job_title}</p>
        </div>
        
        <div className="px-6 py-4 border border-gray-100 shadow-sm">
            <h2 className="text-center font-semibold text-lg mb-4">User ID QR Code</h2>
            <QRCode size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={token.user.id}
                    viewBox={`0 0 256 256`}/>
        </div>

        <div className="px-6 py-4 border border-gray-100 shadow-sm flex flex-col items-center">
            
            <h2 className="text-center font-semibold text-lg mb-4">Token QR Code</h2>
            <QRCode size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={token.access_token}
                    viewBox={`0 0 256 256`}
                    className={show? 'mt-0' : "hidden"}/>
            <button className="bg-black text-white mt-4 p-3 rounded-sm" onClick={()=>setShow(!show)}>{show? "Hide": "Show" } Log In QR code</button>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
