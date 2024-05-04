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
        let { data: departments } = await supabase
          .from('departments')
          .select('*')
          setAllUsersData(departments);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
      fetchAllUsers();
  }, []);

  const deleteUser = async (userId)=> {
    alert("Do you want delete this user?")
    const { error } = await supabase
          .from('departments')
          .delete()
          .eq('user_id', userId)

          console.log(error)
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
