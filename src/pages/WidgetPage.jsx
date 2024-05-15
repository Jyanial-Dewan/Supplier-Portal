import GlobalContext from "@/context/GlobalContext"
import { useContext, useState } from "react"
import Widget from "@/CustomComponets/Widget"
import DepartmentWidget from "@/CustomComponets/DepartmentWidget"


const WidgetPage = () => {
    const context = useContext(GlobalContext)
    const { open, employees, departments } = context
    const [newEmployees, setNewEmployees] = useState(employees)
    const [newDepartments, setNewDepartments] = useState(departments)
    const [isClicked, setIsClicked] = useState('');
    
    const sortedEmployees = employees.sort(function(a,b){
        return a.employee_id - b.employee_id
      });


    const filterEmplpoyee = (depID)=> {
        const newEmployeesList = sortedEmployees.filter((employee)=> employee.department_id === depID);
        setNewEmployees(newEmployeesList)
        const newDepartmentList = departments.filter((dep)=> dep.department_id === depID);
        setNewDepartments(newDepartmentList)
        setIsClicked(depID)
       }

  return (
    <div className={open? "pt-24 pl-[7rem] pr-4 duration-1000" : "pt-24 pl-[17.5rem] pr-4 duration-1000"}>
      <div className="fixed flex flex-col gap-2 w-[200px]">
        {departments.map((dep) =>(
            <div onClick={()=>filterEmplpoyee(dep.department_id)} className={isClicked === dep.department_id ? "bg-otherblue text-white shadow-md rounded-md px-4 py-1 cursor-pointer": "bg-spblue/30 shadow-md rounded-md px-4 py-1 cursor-pointer "} key={dep.department_id}>
                {dep.department_name}
            </div>
        ))}
      </div>
      <div className="ml-[230px] flex flex-col bg-spblue/30 py-6 rounded-lg w-[750px] items-center">
        {isClicked? <div>
            <DepartmentWidget newDepartments={newDepartments}/>
        </div> : ''}

        <div className="w-[90%] mx-auto bg-blue h-[2px] my-8"></div>

        <div className="flex flex-col gap-6">
            {isClicked? newEmployees.map((emp)=> (
                <Widget key={emp.employee_id} emp={emp}/> 
            )): ''}
        </div>
      </div>
    </div>
  )
}

export default WidgetPage
