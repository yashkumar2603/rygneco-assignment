import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import {
  getUsername,
  setUsername,
  clearUsername,
  getTasks,
  setTasks
} from './utils/localStorage';

const FILTER_MAP = {
  all: () => true,
  completed: task => task.completed,
  pending: task => !task.completed,
};

function App() {
  const [username, setUser] = useState(getUsername());
  const [tasks, setTaskList] = useState(getTasks());
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    setUser(getUsername());
  }, []);

  const handleLogin = (name) => {
    setUser(name);
  };

  const handleLogout = () => {
    clearUsername();
    setUser('');
  };

  const handleAddTask = (task) => {
    if (editingTask) {
      setTaskList(tasks.map(t => t.id === editingTask.id ? { ...t, ...task } : t));
      setEditingTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: task.title,
        description: task.description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTaskList([newTask, ...tasks]);
    }
  };

  const handleToggle = (id) => {
    setTaskList(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTaskList(tasks.filter(t => t.id !== id));
      if (editingTask && editingTask.id === id) setEditingTask(null);
    }
  };

  const handleCancelEdit = () => setEditingTask(null);

  const filteredTasks = tasks.filter(FILTER_MAP[filter]);
  const counts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div className="header">
        <h2>Welcome, {username}!</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <TaskForm
        onSave={handleAddTask}
        onCancel={editingTask ? handleCancelEdit : null}
        editTask={editingTask}
      />
      <TaskFilter current={filter} counts={counts} onChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
