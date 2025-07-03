import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, onCancel, editTask }) => {
  const [title, setTitle] = useState(editTask ? editTask.title : '');
  const [description, setDescription] = useState(editTask ? editTask.description : '');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || '');
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      ...editTask,
      title: title.trim(),
      description: description.trim(),
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="task-form-actions">
        <button type="submit">{editTask ? 'Update' : 'Add'} Task</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
