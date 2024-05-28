import GlobalContext from "@/context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import Widget2 from "@/CustomComponets/Widget2"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable"
import { supabase } from "@/client"
import toast from "react-hot-toast"
import { AiOutlineSave } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";

const WidgetTwo = () => {
    const context = useContext(GlobalContext)
    const { open, sortedStudents, widgetAttributes } = context;

    const [mergedArray, setMergedArray] = useState([])
    console.log(mergedArray)
    
    const idInteger = Math.floor(Math.random()*100000);
    const [dragArray, setDragArray] = useState([{id: idInteger, name: '', department: '', is_minimized: true, position: 0, student_id: idInteger}])
    console.log(dragArray)

    const [activeId, setActiveId] = useState(null);

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
        const merged = mergeArrays(sortedStudents, widgetAttributes);
        const sortedMerged = merged.sort((a,b)=>a.position - b.position)
        setMergedArray(sortedMerged);
      }, [sortedStudents, widgetAttributes]);

      const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

    const handleDragStart = (event) => {
      const { active } = event;
      setActiveId(active.id);
      };
    
      const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);
    
        if (!over) return;
    
        if (active.id !== over.id) {
          const activeIndexInLeft = dragArray.findIndex(widget => widget.id === active.id);
          const activeIndexInRight = mergedArray.findIndex(widget => widget.id === active.id);
          const overIndexInLeft = dragArray.findIndex(widget => widget.id === over.id);
          const overIndexInRight = mergedArray.findIndex(widget => widget.id === over.id);

          setMergedArray((prevArray)=> {
            return arrayMove(prevArray, activeIndexInRight, overIndexInRight)
          })
    
          if (activeIndexInLeft !== -1) {
            const newDragArray = [...dragArray];
            const movedItem = newDragArray.splice(activeIndexInLeft, 1)[0];
            
            if (overIndexInRight !== -1) {
              const newMergedArray = [...mergedArray];
              newMergedArray.splice(overIndexInRight + 1, 0, movedItem); // Insert after the hovered item
              setMergedArray(newMergedArray);
            } else if (overIndexInLeft !== -1) {
              newDragArray.splice(overIndexInLeft, 0, movedItem);
            } else {
              const newMergedArray = [...mergedArray, movedItem]; // Insert at the bottom if no specific position
              setMergedArray(newMergedArray);
            }
    
            setDragArray(newDragArray);
            if (newDragArray.length === 0) {
              setDragArray([{id: idInteger, name: '', department: '', is_minimized: true, position: 0, student_id: idInteger}]);
            }
          } 
          // else if (activeIndexInRight !== -1) {
          //   const newMergedArray = [...mergedArray];
          //   const movedItem = newMergedArray.splice(activeIndexInRight, 1)[0];
    
          //   if (overIndexInLeft !== -1) {
          //     const newDragArray = [...dragArray];
          //     newDragArray.splice(overIndexInLeft + 1, 0, movedItem); // Insert after the hovered item
          //     setDragArray(newDragArray);
          //   } else if (overIndexInRight !== -1) {
          //     newMergedArray.splice(overIndexInRight, 0, movedItem);
          //   } else {
          //     const newDragArray = [...dragArray, movedItem]; // Insert at the bottom if no specific position
          //     setDragArray(newDragArray);
          //   }
    
          //   setMergedArray(newMergedArray);
          //   if (dragArray.length === 0) {
          //     setDragArray([{id: idInteger, name: '', department: '', is_minimized: true, position: 0, student_id: idInteger}]);
          //   }
          // }
        }
      };

    const handleAddInput = ()=> {
        setMergedArray(prevInputs => [...prevInputs, {id: idInteger, name: '', department: '', is_minimized: false, position: 0, student_id: idInteger}]);
    }

    const renderActiveItem = () => {
      const activeWidget =
        dragArray.find(widget => widget.id === activeId) ||
        mergedArray.find(widget => widget.id === activeId);
  
      return activeWidget ? (
        <div className="w-[400px] h-[100px] bg-white/30 p-4"></div>
      ) : null;
    };

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
      if(sortedStudents.length < mergedArray.length) {
        const newArray = mergedArray.filter(student => student.id !== id);
        setMergedArray(newArray)
    
      } 

      if(sortedStudents.length >= mergedArray.length) {
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
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter} onDragStart={handleDragStart} sensors={sensors}>
    <section className={open? "pt-24 pl-[32rem] pr-4 duration-1000 flex gap-6 justify-center mb-8" : "pt-24 pl-[42.5rem] pr-4 duration-1000 flex gap-6 justify-center mb-8"}>
        <div className={open? "fixed left-24 duration-1000": "fixed left-[16.5rem] duration-1000"}> 
        <SortableContext items={dragArray} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col items-center gap-6 mt-20">
            {dragArray.map((student)=> (
              <div key={student.id} className="mt-0">
                <Widget2 student={student}/>
              </div>
              ))}
          </div>
        </SortableContext>
        </div>
        <div className="border-2 border-blue rounded-lg w-[750px] p-6">
            <div className="flex gap-4 justify-end fixed">
                <button type="submit" onClick={handleSave} className="bg-blue p-3 rounded-full hover:scale-105">
                    <AiOutlineSave className="text-2xl"/> 
                </button>
                <button onClick={()=> handleAddInput()} className="bg-blue p-3 rounded-full hover:scale-105">
                    <BiAddToQueue className="text-2xl"/>
                </button>
            </div>

            <SortableContext items={mergedArray} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col items-center gap-6 mt-20">
                  {mergedArray.map((student, index)=> (
                    <div key={student.id} className="mt-0">
                        <Widget2 student={student} mergedArray={mergedArray} setMergedArray={setMergedArray} index={index} deleteStudent={deleteStudent}/>
                    </div>
                    ))}
                    </div>
            </SortableContext>
                
            <DragOverlay>{activeId ? renderActiveItem() : null}</DragOverlay>    
        </div>
    </section>
    </DndContext>
  )
}

export default WidgetTwo
