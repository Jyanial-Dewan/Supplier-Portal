import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useContext, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
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

import { Link } from "react-router-dom";
import yes from "../images/yes.png"
import no from "../images/error.png"


const EmployeesPage = () => {
    const context = useContext(GlobalContext);
    const { open, departments, employees, deleteEmployee } = context;
    const [newEmployees, setNewEmployees] = useState(employees)
    //  const [isActive, setIsActive] = useState(false);

    //  const handleClick = ()=> {
    //    setIsActive(!isActive)
    //  }

    //  let activeCheck = isActive? ' bg-gray-500' : '';
    
   
    const sortedNewEmployees = newEmployees.sort(function(a,b){
      return a.employee_id - b.employee_id
    });
     
  const filterEmplpoyee = (depID)=> {
      
      const newEmployeesList = employees.filter((employee)=> employee.department_id === depID);
      setNewEmployees(newEmployeesList)
     }
   
return (
    <section className={open? "pt-12 pl-[7rem] pr-4 duration-1000" : "pt-12 pl-[17.5rem] pr-4 duration-1000"}>
      <div className="flex flex-col items-center">
        <div className={open? "fixed pt-8 border-b-2 border-black z-10 bg-white px-20": "fixed pt-8 border-b-2 border-black z-10 bg-white px-8"}>
          <h2 className="text-2xl font-bold text-center mb-6 p-1 border border-gray-100">Departments</h2>
          <div className="flex gap-4 mb-6">
            {departments.map((dep)=>(
              <>
              <button is type="button" onClick={()=>filterEmplpoyee(dep.department_id)}  key={dep.department_name} className={`bg-black text-white p-2 border shadow-sm cursor-pointer`} >{dep.department_name}</button>
              </>
            ))} 
            <button type="button" onClick={()=> setNewEmployees(employees)} className="bg-black text-white p-2 border shadow-sm cursor-pointer">All</button>
            
            
          </div>
        </div>
        
      </div>
      <div className="mt-48">
      <h2 className="text-2xl font-bold text-center mb-6 p-1 border border-gray-100">Employees</h2>
      <Table className="border border-gray-100 z-0 bg-transparent">
        <TableHeader className="bg-gray-100">
            <TableRow>
                <TableHead className="w-[100px]">Employee ID</TableHead>
                <TableHead className="w-[100px]">Employee Name</TableHead>
                <TableHead className="w-[100px]">First Name</TableHead>
                <TableHead className="w-[100px]">Last Name</TableHead>
                <TableHead className="w-[150px]">Email</TableHead>
                <TableHead className="w-[50px]">Job Title</TableHead>
                <TableHead className="w-[100px]">Department ID</TableHead>
                <TableHead className="w-[200px]">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {sortedNewEmployees.map((data)=>(
                <>
                <TableRow key={data.id}>
                    <TableCell  className="w-[100px]">{data.employee_id}</TableCell>
                    <TableCell  className="w-[100px]">{data.employee_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.first_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.last_name}</TableCell>
                    <TableCell  className="w-[150px]">{data.email}</TableCell>
                    <TableCell  className="w-[50px]">{data.job_title}</TableCell>
                    <TableCell  className="w-[100px]">{data.department_id}</TableCell>
                    <TableCell  className="w-[200px] flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger className="bg-gray-200 px-4 py-2 rounded-md">Delete</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              <img className="w-12 hover:scale-110" src={no} />
                            </AlertDialogCancel>
                            <AlertDialogAction>
                            <img className="w-12 hover:scale-110"  src={yes} onClick={()=>deleteEmployee(data.employee_id)} />
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Link to={`/update-employee/${data.employee_id}`}>
                        <button className="bg-gray-200 px-4 py-2 rounded-md">Update</button>
                      </Link>
                    </TableCell>
                </TableRow>
            </>
            ))}
        </TableBody>
      </Table>
      </div>

     </section>
  )
}

export default EmployeesPage
