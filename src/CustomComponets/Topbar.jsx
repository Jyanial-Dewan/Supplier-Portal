import { FiHome } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { IoMdPower } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/client";
import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";

const Topbar = () => {
  const context = useContext(GlobalContext);
  const {setToken} = context;
  const navigate = useNavigate();

  const handleLogOut = async () => {
    
    let { error } = await supabase.auth.signOut()

    setToken('')

    console.log(error)
    navigate('/')
    
  }
  return (
    <div className="fixed z-50 bg-white h-12 w-full shadow-xl flex justify-end items-center">
      <Link to='/homepage' className="text-[1.5rem] cursor-pointer p-2 hover:bg-black/10">
        <FiHome/> 
      </Link>

      <div className="text-[1.5rem] ml-8 cursor-pointer p-2 hover:bg-black/10">
        <FaRegBell/> 
      </div>

      <div className="text-[1.5rem] ml-8 cursor-pointer p-2 hover:bg-black/10">
            <FaTasks/> 
      </div>
      <Link to={'/notification/inbox'} className="text-[1.5rem] mx-4 cursor-pointer p-2 hover:bg-black/10">
        <BsEnvelope/> 
      </Link>
      <button className="mx-1 flex justify-center gap-2 px-6 py-1 rounded-md bg-red-600 hover:bg-red-500" onClick={handleLogOut} >
        <IoMdPower className="text-[1.5rem] mt-[2px]"/>
        <p className="text-lg">Log Out</p>
      </button>
    </div>
  )
}

export default Topbar
