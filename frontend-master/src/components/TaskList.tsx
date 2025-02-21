import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import type { Task } from '../types/patient';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
}

const getPriorityColor = (priority: Task['priority']): string => {
  switch (priority) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Priority Tasks</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 flex items-center justify-between ${
              task.completed ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`flex-shrink-0 ${getPriorityColor(task.priority)}`}
              >
                {task.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}
                >
                  {task.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Due: {task.deadline}</span>
                </div>
              </div>
            </div>
            {!task.completed && (
              <button
                onClick={() => onCompleteTask(task.id)}
                className="ml-4 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-full text-sm font-medium"
              >
                Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};