import { FiMinus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineOpenInFull } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import yes from "../images/yes.png"
import no from "../images/error.png"
import { useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const Widget = ({emp, isMinimized, handleMinimize, handleDiMinimize, deleteEmployee }) => {
    // const [employee_id, setEmployee_id] = useState('')
    // const [email, setEmail] = useState('')
    // const [employee_name, setEmployee_name] = useState('')
    // const [emp_department_id, setEmp_Department_id] = useState('101')

  return (
    <div className={isMinimized.includes(emp.employee_id) ? "w-[500px] bg-gradient-to-b from-blue to-spblue rounded-xl text-otherblue shadow-lg p-4": "w-[700px] bg-gradient-to-b from-blue to-spblue rounded-xl text-otherblue shadow-lg p-4"}>
                        <div className="flex justify-end items-center gap-2">
                            {isMinimized.includes(emp.employee_id) ? <MdOutlineOpenInFull onClick={()=>handleDiMinimize(emp.employee_id)} className="text-xl hover:scale-110 rounded-full cursor-pointer"/> :
                            <FiMinus onClick={()=>handleMinimize(emp.employee_id)} className="text-2xl hover:scale-110 rounded-full cursor-pointer"/>}
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <AiOutlineDelete className="text-2xl hover:scale-110 rounded-full cursor-pointer"/>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            <img className="w-12 hover:scale-110" src={no} />
                                        </AlertDialogCancel>
                                        <AlertDialogAction>
                                            <img className="w-12 hover:scale-110"  src={yes} onClick={()=>deleteEmployee(emp.employee_id)} />
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        <div>
                            <label className="font-bold" htmlFor="employeeName">Employee Name </label>
                            <input type="text"
                            value={emp.employee_name}
                            className="bg-transparent border-2 border-otherblue/50 outline-none w-[200px] rounded-md pl-1"/>
                        </div>
        
                        <div className={isMinimized.includes(emp.employee_id) ? "hidden" :"mt-4 flex justify-between"}>
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="employeeid">Employee Id</label>
                                <input type="text"
                                value={emp.employee_id}
                                className="bg-transparent border-2 border-otherblue/50 outline-none w-[100px] rounded-md pl-1" />
                            </div>
        
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="jobtitle">Job Title</label>
                                <input type="text"
                                value={emp.job_title}
                                className="bg-transparent border-2 border-otherblue/50 outline-none w-[200px] rounded-md pl-1"/>
                            </div>
        
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="employeeid">Email</label>
                                <input type="email"
                                value={emp.email}
                                className="bg-transparent border-2 border-otherblue/50 outline-none w-[180px] rounded-md pl-1"/>
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
