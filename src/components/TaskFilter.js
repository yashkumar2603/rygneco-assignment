import React from 'react';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
];

const TaskFilter = ({ current, counts, onChange }) => (
  <div className="task-filter">
    {FILTERS.map(f => (
      <button
        key={f.value}
        className={current === f.value ? 'active' : ''}
        onClick={() => onChange(f.value)}
      >
        {f.label} ({counts[f.value] || 0})
      </button>
    ))}
  </div>
);

export default TaskFilter;
