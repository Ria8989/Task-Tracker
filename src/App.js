import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks() 
      setTasks(tasksFromServer)
     }

    getTasks()
  }, [])

//fetch Tasks
const fetchTasks= async () => {
  const res = await fetch('http://localhost:3000/tasks') 
  const data = await res.json()

  return data
}

//fetch Tasks
const fetchTask= async (id) => {
  const res = await fetch(`http://localhost:3000/tasks/${id}`) 
  const data = await res.json()

  return data
}


//Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', 
  { method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(task),
  })
  const data = await res.json()

  setTasks([...tasks, data])

  // const id=Math.floor(Math.random() 
  // * 10000) + 1
  
  // const newTask ={id, ...task}
  // setTasks([...tasks, newTask])
}
//Delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:3000/tasks/${id}`, 
  { method: 'DELETE' })

  setTasks(tasks.filter((task) => task.id !==id))
}

const toggleRemainder = async (id) =>{
  const taskToToggle = await fetchTask(id)
  const updTask = { ... taskToToggle, 
  remainder: !taskToToggle.remainder }

  const res =await fetch(`http://localhost:3000/tasks/${id}`, 
  { method: 'PUT',
    headers: {
     'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask)
  })
  const data = await res.json()

  setTasks(
    tasks.map((task) => task.id === id ? { ...task, remainder: data.remainder} : 
    task )
  )

  
  // setTasks(
  //   tasks.map((task) => 
  //   task.id === id ? { ...task, remainder: !task.remainder} 
  //   : task))
}

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} 
      showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length>0 ? (<Tasks tasks={tasks} 
      onDelete={deleteTask} 
      onToggle={toggleRemainder}/>) :
      ( 'No Tasks To Show' )
      }
    </div>
  );
}



export default App;
