export const getUsername = () => localStorage.getItem('username') || '';

export const setUsername = (username) => localStorage.setItem('username', username);

export const clearUsername = () => localStorage.removeItem('username');

export const getTasks = () => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};

export const setTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));
