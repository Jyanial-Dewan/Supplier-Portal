import GlobalContext from "@/context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import Widget2 from "@/CustomComponets/Widget2"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { supabase } from "@/client"
import toast from "react-hot-toast"
import { AiOutlineSave } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";


const WidgetTwo = () => {
    const context = useContext(GlobalContext)
    const { open, sortedStudents } = context;
    
    const [student_name, setStudent_name] = useState('')
    const [department, setDepartment] = useState('')
    const [showAddStudent, setShowAddStudent] = useState(false)
    const [isDeleted, setIsDeleted] = useState([])
    const [isMinimized, setIsMinimized] = useState([])

    useEffect(()=>{
        setIsMinimized(JSON.parse(localStorage.getItem("isMini")))
    },[])
    
    const [newStudents,setNewStudents] = useState([])
    useEffect(()=>{
        setNewStudents(sortedStudents)
    },[sortedStudents])
    
    const handleCancel = ()=> {
        setShowAddStudent(false)
        setStudent_name('')
        setDepartment('')
    }

    const handleDragEnd = (event) => {
        const {active, over} = event;
        if(active.id !== over.id){
            setNewStudents(()=>{
                const oldIndex = newStudents.findIndex((student)=> student.id === active.id);
                const newIndex = newStudents.findIndex((student)=> student.id === over.id)
    
                return arrayMove(newStudents, oldIndex, newIndex)
            })
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const updates = newStudents.map((student, index) => ({
          id: student.id,
          name: student.name,
          position: index,
          is_minimized: student.is_minimized
        }));

        if(student_name !== '') {
            const { data, error } = await supabase
                            .from('students')
                            .insert({ name: student_name,
                                        department: department
                                },)
                            .select()
        if(error) {
            console.log(error)
        } else {
            console.log(data)
        }

        setShowAddStudent(false)
        setStudent_name('')
        setDepartment('')
        
        }
    
        const { data, error } = await supabase
          .from('students') 
          .upsert(updates, { onConflict: ['id'] });
    
        if (error) {
          console.log(error)
          toast.error('there is a problem updating student')
        } else {
            console.log(data)
          toast.success('students updated successfully')
        }

       };

      const deleteStudent = async (id)=> {
    
        const { error } = await supabase
              .from('students')
              .delete()
              .eq('id', id)
      
              if(error) {
                console.log(error)
                toast.error('there is a problem deleting student')
              } else {
                toast.success('student has been deleted successfully')
                setIsDeleted((prev) => [...prev, id])
              }
      }

   return (
    <section className={open? "pt-24 pl-[7rem] pr-4 duration-1000 flex justify-center mb-8" : "pt-24 pl-[17.5rem] pr-4 duration-1000 flex justify-center mb-8"}>
        <div className="border-2 border-blue rounded-lg w-[750px] p-6">
            <div className="flex gap-6 justify-end">
                <button type="submit" onClick={handleSave} className={open? "bg-blue p-3 rounded-full hover:scale-105 fixed right-[295px] duration-1000" : "bg-blue/80 p-3 rounded-full hover:scale-105 fixed right-[210px] duration-1000"}>
                    <AiOutlineSave className="text-2xl"/> 
                </button>
                <button onClick={()=> setShowAddStudent(true)} className="bg-blue p-3 rounded-full hover:scale-105 fixed">
                    <BiAddToQueue className="text-2xl"/>
                </button>
            </div>

            <div className={showAddStudent? "w-[700px] bg-gradient-to-b from-blue to-spblue rounded-xl text-black shadow-lg shadow-blue p-4 mb-6 mt-20": "hidden"}>
                <div className="flex justify-end mb-2">
                    <AiOutlineClose onClick={handleCancel} className="text-2xl hover:scale-110 cursor-pointer"/>
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <label className="font-bold">Student Name </label>
                        <input type="text"
                        value={student_name}
                        onChange={(e)=>setStudent_name(e.target.value)}
                        className="bg-transparent border-2 border-black/50 outline-none w-[200px] rounded-md pl-1"/>
                    </div>

                    <div className="flex gap-4">
                        <label className="font-bold">Department</label>
                        <input type="text"
                        value={department}
                        onChange={(e)=>setDepartment(e.target.value)}
                        className="bg-transparent border-2 border-black/50 outline-none w-[200px] rounded-md pl-1"/>
                    </div>
                </div>
            </div>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                <SortableContext items={newStudents} strategy={verticalListSortingStrategy}>
                    <div className={showAddStudent? "flex flex-col items-center gap-6": "flex flex-col items-center gap-6 mt-20"}>
                        {newStudents.map((student, index)=> (
                            <div key={student.id} className={isDeleted.includes(student.id) ? "hidden" : "mt-0"}>
                                <Widget2 student={student} newStudents={newStudents} setNewStudents={setNewStudents} index={index} deleteStudent={deleteStudent} setIsMinimized={setIsMinimized} isMinimized={isMinimized}/>
                            </div>
                            
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    </section>
  )
}

export default WidgetTwo
