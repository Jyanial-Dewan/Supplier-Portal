import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../images/Supplier-Portal.jpg"
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { LuUserPlus } from "react-icons/lu";
import { FaList } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ProSidebar = () => {
    const context = useContext(GlobalContext);
    const {open, setOpen, token} = context;
    
    const handleClick = ()=> {
         setOpen((prevState) => !prevState) ;
    }
  return (
    <Sidebar collapsed={open} transitionDuration={1000} style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', paddingTop: '4rem', scrollBehavior: 'none', zIndex: '20'}} >
        <img src={logo} alt="" />
        {open ? <IoMenu className='text-4xl p-2 duration-500 bg-gray-100 rounded-md flex justify-center mx-auto my-2 cursor-pointer hover:rotate-[360deg]'
                onClick={handleClick}/> :
        <IoMdClose className='text-4xl p-2 duration-500 bg-gray-100 rounded-md flex justify-center mx-auto my-2 cursor-pointer hover:rotate-[360deg]'
        onClick={handleClick}/>}
        <Menu>
            <SubMenu label="User Management" icon={<LuUserPlus className='text-2xl'/>}>
                <MenuItem component={<Link to={'/adduser'}/>} icon={<LuUserPlus className='text-2xl'/>}> Add User </MenuItem>
                <MenuItem component={<Link to={'/allusers'}/>} icon={<FiUsers className='text-2xl'/>}> All Users </MenuItem>
                <MenuItem component={<Link to={'/invite-user'}/>} icon={<FiSend className='text-2xl'/>}> Invite User </MenuItem>
            </SubMenu>
            <MenuItem icon={<FaList className='text-2xl'/>}> Items </MenuItem>
            <MenuItem component={<Link to={'/profile'}/>} icon={<FaRegUser className='text-2xl'/>}> {token.user.email} </MenuItem>
        </Menu>
    </Sidebar>
  )
}

export default ProSidebar
