/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, {
      id: Date.now(),
      text: newTask,
      completed: false,
      timestamp: new Date().toISOString()
    }]);
    setNewTask('');
  };

  const updateTask = (id, updatedText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: updatedText, timestamp: new Date().toISOString() } : task
    ));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add Task</button>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search tasks"
      />
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <div
              style={{
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
              onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
            >
              {task.text}
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
              </button>
              <button onClick={() => updateTask(task.id, prompt('Update task text:', task.text) || task.text)}>
                Update Task
              </button>
            </div>
            {expandedTaskId === task.id && (
              <div>
                <p>{task.timestamp}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
