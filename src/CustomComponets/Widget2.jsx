import { FiMinus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineOpenInFull } from "react-icons/md";
import { RiDragDropLine } from "react-icons/ri";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";

const Widget2 = ({student, setMergedArray, mergedArray, index, deleteStudent}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: student.id});

   const style = {
    transform: CSS.Transform.toString(transform),
    transition
   }

   const handleChange = (index, field, value) => {
    const updatedStudents = [...mergedArray];
    updatedStudents[index][field] = value;
    setMergedArray(updatedStudents);
  };

  const handleMinimize = (index) => {
    const updatedMinimized = [...mergedArray];
    updatedMinimized[index].is_minimized = !updatedMinimized[index].is_minimized
    setMergedArray(updatedMinimized)
 }

  
  return (
    <section>
        <div style={style} className={student.is_minimized ? "w-[400px] bg-gradient-to-b from-blue to-spblue rounded-xl text-black shadow-md shadow-blue p-4": "w-[700px] bg-gradient-to-b from-blue to-spblue rounded-xl text-black shadow-md shadow-black/50 p-4"} >
        <div className='flex justify-between items-center mb-4'>
            <div  ref={setNodeRef} {...attributes} {...listeners}>
                <RiDragDropLine className="text-2xl hover:scale-110 cursor-pointer"/>
            </div>
            <div className="flex items-center gap-2">
                {student.is_minimized ? 
                <MdOutlineOpenInFull onClick={()=>handleMinimize(index)} className="text-xl hover:scale-110 cursor-pointer"/> :
                <FiMinus onClick={()=>handleMinimize(index)} className="text-2xl hover:scale-110 cursor-pointer"/>
                }
                <AiOutlineDelete onClick={()=> deleteStudent(student.id)} className="text-2xl hover:scale-110 cursor-pointer"/>
            </div>
        </div>

        <div className="flex justify-between">
            <div className="flex gap-4">
                <label className="font-bold">Student Name </label>
                <input type="text"
                value={student.name}
                onChange={e => handleChange(index, 'name', e.target.value)}
                className="bg-transparent border-2 border-black/50 outline-none w-[200px] rounded-md pl-1"/>
            </div>

            <div className={student.is_minimized ? "hidden" : "flex gap-4"}>
                <label className="font-bold">Department</label>
                <input type="text"
                value={student.department}
                onChange={e => handleChange(index, 'department', e.target.value)}
                className="bg-transparent border-2 border-black/50 outline-none w-[200px] rounded-md pl-1"/>
            </div>
        </div>
      
    </div>
    </section>
  )
}

export default Widget2
