import { useState, useEffect, useContext } from "react"
import { supabase } from "@/client";
import { useParams, useNavigate } from "react-router-dom";
import GlobalContext from "@/context/GlobalContext";
import toast from "react-hot-toast";

const UpadateEmployee = () => {
    const [email, setEmail] = useState('')
    const [user_name, setUser_name] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [middle_name, setMiddle_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [job_title, setJob_title] = useState('')
    const [org_type, setOrg_type] = useState('')
    const [org_id, setOrg_id] = useState('')
    const [org_id_column_name, SetOrg_id_column_name] = useState('')
    const context = useContext(GlobalContext);
    const { fetchEmployees } = context;
    const {user_id} = useParams()
    const navigate = useNavigate();
    console.log(user_id)

    useEffect(()=>{
        const fetchSingleEmployee = async () => {
            let { data, error } = await supabase
                                    .from('employees')
                                    .select("*")
                                    .eq('user_id', user_id)
                                                        
            if(error) {
                console.log(error)
            }

            if(data) {
                console.log(data)
                setFirst_name(data[0].first_name)
                setMiddle_name(data[0].middle_name)
                setLast_name(data[0].last_name)
                setUser_name(data[0].user_name)
                setJob_title(data[0].job_title)
                setOrg_id(data[0].org_id)
                setOrg_type(data[0].org_type)
                SetOrg_id_column_name(data[0].org_id_column_name)
                setEmail(data[0].email)
                
            }
        }

        fetchSingleEmployee();
    
    }, [user_id])

    const updateDepartment = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase
                                .from('employees')
                                .update({ user_name: user_name, 
                                    first_name: first_name,
                                    middle_name: middle_name,
                                    last_name: last_name,
                                    email: email,
                                    job_title: job_title,
                                    org_type: org_type,
                                    org_id: org_id,
                                    org_id_column_name: org_id_column_name },)
                                .eq('user_id', user_id)
                                .select()
                if(data) {
                    console.log(data)
                }

                if(error) {
                    console.log(error)
                    toast.error('there is a problem updating employee')
                } else {
                    toast.success('employee has been updated successfully')
                }

                fetchEmployees();
                navigate('/employees')
    }
  
    return (
        <div className='pt-24 pl-20 flex justify-center items-center'>
        
        <form className="w-[700px] px-6 py-4 mb-8 border border-gray-100 shadow-md flex flex-col justify-center items-center"
             onSubmit={updateDepartment}>
          <h2 className="text-xl text-center">Update Employee</h2>
          <div className="flex flex-col gap-2 mb-4 w-full">
              <label htmlFor="firstName">First Name</label>
              <input type="text"
                     value={first_name}
                     placeholder="First Name"
                     onChange={(e)=>setFirst_name(e.target.value)}
                     className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
          </div>
  
          <div className="flex flex-col gap-2 mb-4 w-full">
              <label htmlFor="middleName">Middle Name</label>
              <input type="text"
                     value={middle_name}
                     name="middle_name"
                     onChange={(e)=>setMiddle_name(e.target.value)}
                     className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
          </div>
  
          <div className="flex flex-col gap-2 mb-4 w-full">
              <label htmlFor="lastName">Last Name</label>
              <input type="text"
                     value={last_name}
                     name="last_name"
                     onChange={(e)=>setLast_name(e.target.value)}
                     className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
          </div>
  
          <div className="flex flex-col gap-2 mb-4 w-full">
              <label htmlFor="email">Email</label>
              <input type="email"
                     value={email}
                     name="email"
                     onChange={(e)=>setEmail(e.target.value)}
                     className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
          </div>
  
          <div className="flex flex-col gap-2 mb-4 w-full">
              <label htmlFor="userName">User Name</label>
              <input type="text"
                     value={user_name}
                     name="user_name"
                     onChange={(e)=>setUser_name(e.target.value)}
                     className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
          </div>
  
          <div className="flex flex-col gap-2 mb-4 w-full">
              <label htmlFor="jobTitle">Job Title</label>
              <input type="text"
                     value={job_title}
                     name="job_title"
                     onChange={(e)=>setJob_title(e.target.value)}
  
                     className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
          </div>
  
          <div className="flex flex-col gap-2 mb-4 w-full">
              <label htmlFor="lastName">Organization Type</label>
              <input type="text"
                     value={org_type}
                     name="last_name"
                     onChange={(e)=>setOrg_type(e.target.value)}
                     className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
          </div>
  
          <div className="flex flex-col gap-2 mb-4 w-full">
              <label htmlFor="lastName">Organization ID</label>
              <input type="text"
                     value={org_id}
                     name="last_name"
                     onChange={(e)=>setOrg_id(e.target.value)}
                     className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
          </div>
  
          <div className="flex flex-col gap-2 mb-4 w-full">
              <label htmlFor="lastName">Organization ID Table Name</label>
              <input type="text"
                     value={org_id_column_name}
                     name="last_name"
                     onChange={(e)=>SetOrg_id_column_name(e.target.value)}
                     className="border-2 border-gray-100 px-4 h-12 rounded-md"/>
          </div>
  
          <button type="submit" className="py-2 px-8 rounded-md bg-black text-white">Submit</button>
        </form>
      </div>
  )
}

export default UpadateEmployee
