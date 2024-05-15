import { FiMinus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineOpenInFull } from "react-icons/md";

const Widget = ({emp, isMinimized, handleMinimize, handleDiMinimize, handleClose }) => {

  return (
    <div className={isMinimized.includes(emp.employee_id) ? "w-[500px] bg-gradient-to-b from-blue to-spblue rounded-xl text-otherblue shadow-lg p-4 duration-500": "w-[700px] bg-gradient-to-b from-blue to-spblue rounded-xl text-otherblue shadow-lg p-4 duration-500"}>
        <div className="flex justify-end items-center gap-2">
            {isMinimized.includes(emp.employee_id) ? <MdOutlineOpenInFull onClick={()=>handleDiMinimize(emp.employee_id)} className="text-lg cursor-pointer"/> :
            <FiMinus onClick={()=>handleMinimize(emp.employee_id)} className="text-2xl cursor-pointer"/>}
            <IoMdClose onClick={()=> handleClose(emp.employee_id)} className="text-2xl cursor-pointer"/>
        </div>
        <div>
            <label className="font-bold" htmlFor="employeeName">Employee Name </label>
            <select className="bg-transparent border-2 border-otherblue/50 outline-none w-[200px] rounded-md ml-4" >
                <option value="employeename">{emp.employee_name}</option>
            </select>
        </div>

        <div className={isMinimized.includes(emp.employee_id) ? "hidden" :"mt-4 flex justify-between"}>
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="employeeid">Employee Id</label>
                <select className="bg-transparent border-2 border-otherblue/50 outline-none w-[100px] rounded-md" >
                    <option value="employeename">{emp.employee_id}</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="jobtitle">Job Title</label>
                <select className="bg-transparent border-2 border-otherblue/50 outline-none w-[200px] rounded-md" >
                    <option value="employeename">{emp.job_title}</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="employeeid">Email</label>
                <select className="bg-transparent border-2 border-otherblue/50 outline-none w-[170px] rounded-md" >
                    <option value="employeename">{emp.email}</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="employeeid">Department Id</label>
                <select className="bg-transparent border-2 border-otherblue/50 outline-none w-[100px] rounded-md" >
                    <option value="employeename">{emp.department_id}</option>
                </select>
            </div>
        </div>
        
    </div>
  )
}

export default Widget
