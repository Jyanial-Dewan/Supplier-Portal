import MainLayout from "./layout/MainLayout"
import NotificationPage from "./pages/NotificationPage"
import SentPage from "./pages/SentPage"
import DraftPage from "./pages/DraftPage"
import AllUsersPage from "./pages/AllUsersPage"
import AddUserPage from "./pages/AddUserPage"
import GlobalContext from "./context/GlobalContext"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import UpdateUserPage from "./pages/UpdateUserPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"
import AllUsersTwo from "./pages/AllUsersTwo"
import AllUsersThree from "./pages/AllUsersThree"
import AllUsersFour from "./pages/AllUsersFour"
import SignUpPage from "./pages/SignUpPage"
import IniviteUserPage from "./pages/IniviteUserPage"
import AlertPage from "./pages/AlertPage"
import TaskPage from "./pages/TaskPage"
import StudentsDND2 from "./pages/Dnd"
import DepartmentsPage from "./pages/DepartmentsPage"
import CreateDepartment from "./pages/CreateDepartment"
import UpadateDepartment from "./pages/UpadateDepartment"
import UserIdQrCode from "./pages/UserIdQrCode"
import TokenQrCode from "./pages/TokenQrCode"
import EmployeesPage from "./pages/EmployeesPage"
import AddEmployee from "./pages/AddEmployeePage"
import UpadateEmployee from "./pages/UpdateEmployee"
import WidgetPage from "./pages/WidgetPage"
import WidgetTwo from "./pages/WidgetTwo"
import { supabase } from "./client"
import toast from "react-hot-toast"

const App = () => {
  const [token, setToken] = useState(false);
  const [open, setOpen] = useState(false);
  const [allUsersData, setAllUsersData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [students, setStudents] = useState([]);
  const [widgetAttributes, setWidgetAttributes] = useState([])
 
  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { token } }) => {
        setToken(token)
        
      })
    const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, token) => {
      setToken(token)
      
    })
    return () => subscription.unsubscribe()
  }, []);

  useEffect(()=>{
    const fetchStudents = async () => {
        let { data: students, error } = await supabase
                                        .from('students')
                                        .select('*')
            setStudents(students)  
            console.log(error)                          
    }
    
    fetchStudents()
}, [])

useEffect(()=>{
  const fetchWidgetAttributes = async () => {
      let { data: widgetAttributes, error } = await supabase
                                      .from('student_widget_attributes')
                                      .select('*')
          setWidgetAttributes(widgetAttributes)  
          console.log(error)                          
  }
  
  fetchWidgetAttributes()
}, [])

const sortedStudents = students.sort((a,b)=> a.position-b.position)

  const fetchAllUsers = async () => {
    try { 
        let { data: users } = await supabase
          .from('user_persons_view')
          .select('*')
          setAllUsersData(users);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
      fetchAllUsers();
  }, []);

  const deleteUser = async (userId)=> {
    
    const { error } = await supabase
          .from('def_persons')
          .delete()
          .eq('user_id', userId)

          if(error) {
            console.log(error)
            toast.error('there is a problem deleting user')
          } else {
            toast.success('the user has been deleted successfully')
          }
          fetchAllUsers();
  }

  const fetchEmployees = async () => {
       
    let { data: employees, error } = await supabase
                                        .from('employees')
                                        .select('*')
        setEmployees(employees);
        console.log(error);
  }

  useEffect(()=>{
    fetchEmployees()
}, [])

const deleteEmployee = async (employeeID)=> {
    
  const { error } = await supabase
        .from('employees')
        .delete()
        .eq('employee_id', employeeID)

        if(error) {
          console.log(error)
          toast.error('there is a problem deleting employee')
        } else {
          toast.success('employee has been deleted successfully')
        }
        fetchEmployees();
}

  const fetchDepartments = async () => {
       
    let { data: departments, error } = await supabase
                                        .from('departments')
                                        .select('*')
        setDepartments(departments);
        console.log(error);
  }

  useEffect(()=>{
    fetchDepartments()
}, [])

  const deleteDepartment = async (departmentId)=> {
    
    const { error } = await supabase
          .from('departments')
          .delete()
          .eq('department_id', departmentId)

          if(error) {
            console.log(error)
            toast.error('there is a problem deleting department')
          } else {
            toast.success('department has been deleted successfully')
          }
          fetchDepartments();
  }


return (
    <GlobalContext.Provider value={{open: open, setOpen: setOpen, allUsersData: allUsersData, deleteUser: deleteUser, fetchAllUsers: fetchAllUsers, token: token, setToken: setToken, employees: employees, setEmployees: setEmployees, fetchEmployees: fetchEmployees, deleteEmployee: deleteEmployee, fetchDepartments: fetchDepartments, departments: departments, deleteDepartment: deleteDepartment, sortedStudents: sortedStudents, widgetAttributes: widgetAttributes }}>
      <Routes>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/" element={token? <MainLayout/>: <LoginPage/>}>
          <Route path="/homepage" element={<Home/>}/>
          <Route path="/alert" element={<AlertPage/>}/>
          <Route path="/tasks" element={<StudentsDND2/>}/>
          <Route path="/notification/inbox" element={<NotificationPage/>}/>
          <Route path="/notification/sent" element={<SentPage/>}/>
          <Route path="/notification/draft" element={<DraftPage/>}/>
          <Route path="/allusers" element={<AllUsersPage/>}/>
          <Route path="/employees" element={<EmployeesPage/>}/>
          <Route path="/add-employee" element={<AddEmployee/>}/>
          <Route path="/update-employee/:employee_id" element={<UpadateEmployee/>}/>
          <Route path="/departments" element={<DepartmentsPage/>}/>
          <Route path="/create-department" element={<CreateDepartment/>}/>
          <Route path="/update-department/:department_id" element={<UpadateDepartment/>}/>
          <Route path="/allusers/2" element={<AllUsersTwo/>}/>
          <Route path="/allusers/3" element={<AllUsersThree/>}/>
          <Route path="/allusers/4" element={<AllUsersFour/>}/>
          <Route path="/adduser" element={<AddUserPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/user-qr-code" element={<UserIdQrCode/>}/>
          <Route path="/token-qr-code" element={<TokenQrCode/>}/>
          <Route path="/invite-user" element={<IniviteUserPage/>}/>
          <Route path="/updateuser/:id" element={<UpdateUserPage/>}/>
          <Route path="/dragndrop" element={<WidgetTwo/>}/>
          <Route path="/widget" element={<WidgetPage/>}/>
        </Route> 
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </GlobalContext.Provider>
  )
}

export default App
