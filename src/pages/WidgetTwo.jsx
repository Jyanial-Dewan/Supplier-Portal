import GlobalContext from "@/context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import Widget2 from "@/CustomComponets/Widget2"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { supabase } from "@/client"
import toast from "react-hot-toast"
import { AiOutlineSave } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";

const WidgetTwo = () => {
    const context = useContext(GlobalContext)
    const { open, sortedStudents, widgetAttributes } = context;

    const [newStudents,setNewStudents] = useState([])
    const [newWidgetAttributes, setNewWidgetAttributes] = useState([])
    const [mergedArray, setMergedArray] = useState([])
    console.log(mergedArray)
    
    useEffect(()=>{
        setNewStudents(sortedStudents)
    },[sortedStudents])
    
    useEffect(()=>{
        setNewWidgetAttributes(widgetAttributes)
    },[widgetAttributes])
    
    const maxValue = Math.max(...mergedArray.map(obj => obj.id));
    console.log(maxValue)

    const mergeArrays = (newStudents, newWidgetAttributes) => {
        const newWidgetAttributesMap = newWidgetAttributes.reduce((acc, attribute) => {
          acc[attribute.student_id] = attribute;
          return acc;
        }, {});
    
        return newStudents.map(student => ({
          ...student,
          ...newWidgetAttributesMap[student.id],
        }));
      };
    
      // Merge arrays on component mount
      useEffect(() => {
        const merged = mergeArrays(newStudents, newWidgetAttributes);
        const sortedMerged = merged.sort((a,b)=>a.position - b.position)
        setMergedArray(sortedMerged);
      }, [newStudents, newWidgetAttributes]);

    const handleAddInput = ()=> {
        setMergedArray(prevInputs => [...prevInputs, {id: maxValue+1, name: '', department: '', is_minimized: false, position: 0, student_id: maxValue+1}]);
    }

    const handleDragEnd = (event) => {
        const {active, over} = event;
        if(active.id !== over.id){
            setMergedArray(()=>{
                const oldIndex = mergedArray.findIndex((student)=> student.id === active.id);
                const newIndex = mergedArray.findIndex((student)=> student.id === over.id)
    
                return arrayMove(mergedArray, oldIndex, newIndex)
            })
        }
    }

    const upsertMultipleTables  = async (updates, attributesUpdate) => {
        try {
          // Upsert Students
          const { data: studentData, error: studentsError } = await supabase
            .from('students')
            .upsert(updates, { onConflict: ['id'] }); // Ensure 'id' is a unique constraint
    
          if (studentsError) {
            toast.error(studentsError.message)
          } else {
            toast.success("students data has been updated successfully")
          }
    
          // Upsert Attributes
          const { data: attributesData, error: attributesError } = await supabase
            .from('student_widget_attributes')
            .upsert(attributesUpdate, { onConflict: ['student_id'] }); // Ensure 'id' is a unique constraint
    
          if (attributesError) {
            toast.error(attributesError.message)
          } else {
            toast.success('widget attributes has been updated successfully')
          }
    
        } catch (error) {
          console.log(error)
        } 
      };

      const handleSave = () => {
        const updates = mergedArray.map((student) => ({
            id: student.id,
            name: student.name,
            department: student.department,
            
          }));
          const attributesUpdate = mergedArray.map((student, index)=> ({
            student_id: student.id,
            position: index,
            is_minimized: student.is_minimized
        }))
    
        upsertMultipleTables(updates, attributesUpdate);
      };

      const deleteStudent = async (id)=> {
      if(newStudents.length < mergedArray.length) {
        const newArray = mergedArray.filter(student => student.id !== id);
        setMergedArray(newArray)
    
      } 

      if(newStudents.length >= mergedArray.length) {
        const { error } = await supabase
              .from('students')
              .delete()
              .eq('id', id)
      
              if(error) {
                toast.error(error.message)
              } else {
                toast.success('student has been deleted successfully')
              }
        const { error: err } = await supabase
              .from('student_widget_attributes')
              .delete()
              .eq('student_id', id)
      
              if(err) {
                toast.error(err.message)
              } else {
                toast.success('student attributes has been deleted successfully')
              } 
        const newArray = mergedArray.filter(student => student.id !== id);
          setMergedArray(newArray)
      }
        
      }

   return (
    <section className={open? "pt-24 pl-[7rem] pr-4 duration-1000 flex justify-center mb-8" : "pt-24 pl-[17.5rem] pr-4 duration-1000 flex justify-center mb-8"}>
        <div className="border-2 border-blue rounded-lg w-[750px] p-6">
            <div className="flex gap-4 justify-end fixed">
                <button type="submit" onClick={handleSave} className="bg-blue p-3 rounded-full hover:scale-105">
                    <AiOutlineSave className="text-2xl"/> 
                </button>
                <button onClick={()=> handleAddInput()} className="bg-blue p-3 rounded-full hover:scale-105">
                    <BiAddToQueue className="text-2xl"/>
                </button>
            </div>

            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                <SortableContext items={mergedArray} strategy={verticalListSortingStrategy}>
                    <div className="flex flex-col items-center gap-6 mt-20">
                        {mergedArray.map((student, index)=> (
                            <div key={student.id} className="mt-0">
                                <Widget2 student={student} mergedArray={mergedArray} setMergedArray={setMergedArray} index={index} deleteStudent={deleteStudent}/>
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
