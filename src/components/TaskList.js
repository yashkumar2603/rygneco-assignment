import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (!tasks.length) {
    return <div className="empty-state">No tasks to show.</div>;
  }
  return (
    <div className="task-list">
      {tasks.map(task =>
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default TaskList;
