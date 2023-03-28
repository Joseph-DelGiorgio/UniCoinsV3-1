import React from 'react';
import './Task.css';
import { useParams } from 'react-router-dom';

const Task = ({ tasks, completeTask }) => {
  const { id } = useParams();
  const task = tasks[id];
  const index = parseInt(id, 10);

  const handleComplete = () => {
    completeTask(index);
  };

  return (
    <li>
      <div>
        <span>Task Description: {task.description}</span>
        <span>Reward: {task.reward}</span>
        <span>Volunteer: {task.volunteer}</span>
        <span>Project Manager: {task.projectManager}</span>
        <span>Status: {task.completed ? 'Completed' : 'Incomplete'}</span>
      </div>
      {!task.completed && (
        <button onClick={handleComplete}>Complete</button>
      )}
    </li>
  );
};

export default Task;


