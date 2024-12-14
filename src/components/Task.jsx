import { useEffect, useState } from "react";
import Navbar from './Navbar'
import { 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  PlusCircle 
} from 'lucide-react';

function TodoList() {
  const [taskList, setTaskList] = useState(() =>{
   const savedTask = localStorage.getItem("taskList")
    return savedTask ? JSON.parse(savedTask) : []
}
    
  )
  const [task, setTask] = useState("");
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem("taskList",JSON.stringify(taskList))
  },[taskList])


  function handleChange(e) {
    setTask(e.target.value);
  }

  function AddTask() {
    const existingTask = taskList.some((t) => t.task.toLowerCase() === task.toLowerCase());
    if (task.trim() !== "" && !existingTask) {
      setTaskList([...taskList,
        { 
          task: task, 
          completed: false, 
          edit: false, 
          id: Date.now() 
        }
        
      ]);
      setError("");
    } else {
      setError("Task already exists or is empty");
    }
    setTask("");
  }
  
  



  function toggleCheckbox(id) {
    const updatedTasks = taskList.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTasks);
  }

  function toggleEdit(id) {
    const toggle = taskList.map((task) =>
      task.id === id ? { ...task, edit: !task.edit } : task
    );
    setTaskList(toggle);
  }

  function handleEditChange(e, id) {
    const edit = taskList.map((task) =>
      task.id === id ? { ...task, task: e.target.value } : task
    );
    setTaskList(edit);
  }

  function deleteTask(id) {
    let del = taskList.filter((task) => task.id !== id);
    setTaskList(del);
  }

  function saveEdit(id) {
    const taskIndex = taskList.findIndex(t => t.id === id);
    let task = taskList[taskIndex].task;
    let existingTask = taskList.some(
      (t) => t.id !== id && t.task.toLowerCase() === task.toLowerCase()
    );
   
    if (task.trim() === '') {
      deleteTask(id);
      setError("Cannot save an empty task");
    } else if (existingTask) {
      deleteTask(id);
      setError("Removed duplicate task");
    } else {
      toggleEdit(id);
      setError(""); 
    }
  }

  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen p-8">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Todo List
          </h1>
        </div>
        
        <div className="p-6">
          <div className="flex mb-4">
            <input
              className="flex-grow px-4 py-3 border-2 border-indigo-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
              type="text"
              value={task}
              placeholder="Add a new task"
              onChange={handleChange}
            />
            <button
              onClick={AddTask}
              className="bg-indigo-500 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-600 transition duration-300 flex items-center"
            >
              <PlusCircle className="mr-2" />
              Add
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <div className="space-y-3">
            {taskList.length === 0 ? (
              <p className="text-gray-400 text-center italic">
                No tasks added yet
              </p>
            ) : (
              taskList.map((task) => (
                <div 
                  key={task.id} 
                  className={`
                    flex items-center p-4 rounded-lg shadow-md transition-all duration-300
                    ${task.completed 
                      ? 'bg-green-50 border-l-4 border-green-500' 
                      : 'bg-white border-l-4 border-transparent'
                    }
                  `}
                >
                  {task.edit ? (
                    <div className="flex-grow flex space-x-2">
                      <input 
                        type="text"
                        value={task.task}
                        onChange={(e) => handleEditChange(e, task.id)}
                        className="flex-grow px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      <button 
                        onClick={() => saveEdit(task.id)}
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="flex-grow flex items-center space-x-3"
                        onClick={() => toggleCheckbox(task.id)}
                      >
                        <CheckCircle2 
                          className={`
                            ${task.completed 
                              ? 'text-green-500' 
                              : 'text-gray-300'
                            } cursor-pointer`} 
                        />
                        <span 
                          className={`
                            ${task.completed 
                              ? 'line-through text-gray-400' 
                              : 'text-gray-800'
                            } flex-grow cursor-pointer`}
                        >
                          {task.task}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => toggleEdit(task.id)}
                          className="text-indigo-500 hover:text-indigo-600"
                        >
                          <Edit3 size={20} />
                        </button>
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      </div>
      </>
  );
}

export default TodoList;