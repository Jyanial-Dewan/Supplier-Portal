import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../images/Supplier-Portal.jpg"
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { LuUserPlus } from "react-icons/lu";
import { LuDot } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";

import { useState } from "react";

const ReadySidebar = () => {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const handleClick = ()=> {
        setOpen((prevState) => !prevState) ;
        
    }

  return (
    <div className={open? "bg-gray-50 fixed z-10 w-60 flex flex-col items-center h-[100vh] mt-12 border-r border-gray-200 duration-1000": "bg-gray-50 fixed z-10 w-20 flex flex-col items-center h-[100vh] mt-12 border-r border-gray-200 duration-1000"}>
      <img src={logo} />
      <div className={open?"hidden" : "text-[1.5rem] mt-4 p-2 duration-500 bg-gray-100 cursor-pointer hover:rotate-[360deg]"}
           onClick={handleClick}>
        <IoMenu/>
      </div>
      <div className={open? "text-[1.5rem] mt-4 p-2 duration-500 bg-gray-100 cursor-pointer hover:rotate-[360deg]" : "hidden"}
           onClick={()=>setOpen(!open)}>
        <IoMdClose/>
      </div>
      <Sidebar className={open? 'w-60' : 'w-20'}>
        <Menu>
            <SubMenu label="User Management" >
                <MenuItem> Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
        </Menu>
    </Sidebar>
    </div>
  )
}

export default ReadySidebar
