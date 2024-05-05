import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useContext } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import GlobalContext from "@/context/GlobalContext";
import { Link } from "react-router-dom";
 
const AllUsersPage = () => {
  const context = useContext(GlobalContext)
  const {open, allUsersData, deleteUser, displayUser, fetchAllUsers} = context

  const sortedAllusers = allUsersData.sort(function(a,b){
    return a.user_id - b.user_id
  })
  
  
    return (
    <section className={open? "pt-24 pl-[7rem] pr-4 duration-1000" : "pt-24 pl-[17.5rem] pr-4 duration-1000"}>
        <h2 className="text-2xl font-bold text-center mb-6 p-1 border border-gray-100">All Users</h2>
      <Table className="border border-gray-100 z-0 bg-transparent">
        <TableHeader className="bg-gray-100">
            <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[250px]">User ID</TableHead>
                <TableHead className="w-[100px]">User Name</TableHead>
                <TableHead className="w-[100px]">First Name</TableHead>
                <TableHead className="w-[100px]">Middle Name</TableHead>
                <TableHead className="w-[100px]">Last Name</TableHead>
                <TableHead className="w-[150px]">Email</TableHead>
                <TableHead className="w-[50px]">Job Title</TableHead>
                <TableHead className="w-[100px]">Organization Type</TableHead>
                <TableHead className="w-[100px]">Organization ID</TableHead>
                <TableHead className="w-[100px]">Organization ID Column Name</TableHead>
                <TableHead className="w-[100px]">Organization ID Table Name</TableHead>
                <TableHead className="w-[100px]">Domain Name</TableHead>
                <TableHead className="w-[100px]">GUID</TableHead>
                <TableHead className="w-[200px]">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {sortedAllusers.map((data)=>(
                <>
                <TableRow key={Math.floor(Math.random()*1000000)}>
                    <TableCell  className="w-[100px]">{data.id}</TableCell>
                    <TableCell  className="w-[250px]">{data.user_id}</TableCell>
                    <TableCell  className="w-[100px]">{data.user_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.first_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.middle_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.last_name}</TableCell>
                    <TableCell  className="w-[150px]">{data.email}</TableCell>
                    <TableCell  className="w-[50px]">{data.job_title}</TableCell>
                    <TableCell  className="w-[100px]">{data.org_type}</TableCell>
                    <TableCell  className="w-[100px]">{data.org_id}</TableCell>
                    <TableCell  className="w-[100px]">{data.org_id_column_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.org_id_table_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.domain_name}</TableCell>
                    <TableCell  className="w-[100px]">{data.guid}</TableCell>
                    <TableCell  className="w-[200px] flex gap-2">
                    <Popover>
                      <PopoverTrigger className="bg-gray-200 px-4 py-2 rounded-md">Delete</PopoverTrigger>
                      <PopoverContent>Do You want to delete this user?
                        <div className="flex justify-around mt-4">
                          <button onClick={()=> deleteUser(data.user_id)} className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-400">yes</button>
                          <button onClick={()=>fetchAllUsers()} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-400">no</button>
                        </div>
                      </PopoverContent>
                    </Popover>
                      <Link to={`/updateuser/${data.id}`}>
                        <button className="bg-gray-200 px-4 py-2 rounded-md" onClick={()=>displayUser(data.user_id)}>Update</button>
                      </Link>
                    </TableCell>
                </TableRow>
            </>
            ))}
        </TableBody>
      </Table>

    </section>
  )
}

export default AllUsersPage
