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
import { supabase } from "./client"
import toast from "react-hot-toast"

const App = () => {
  const [token, setToken] = useState(false);
  const [open, setOpen] = useState(false);
  const [allUsersData, setAllUsersData] = useState([]);
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

  

  return (
    <GlobalContext.Provider value={{open: open, setOpen: setOpen, allUsersData: allUsersData, deleteUser: deleteUser, fetchAllUsers: fetchAllUsers, token: token, setToken: setToken }}>
      <Routes>
        <Route path="/" element={token? <MainLayout/>: <LoginPage/>}>
          <Route path="/homepage" element={<Home/>}/>
          <Route path="/notification/inbox" element={<NotificationPage/>}/>
          <Route path="/notification/sent" element={<SentPage/>}/>
          <Route path="/notification/draft" element={<DraftPage/>}/>
          <Route path="/allusers" element={<AllUsersPage/>}/>
          <Route path="/adduser" element={<AddUserPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/updateuser/:id" element={<UpdateUserPage/>}/>
        </Route> 
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </GlobalContext.Provider>
  )
}

export default App
