import React, { useState } from 'react';
import axios from 'axios';
import TaskTable from '../components/TaskTable';
import TaskModal from '../components/TaskModal';
import CreateTaskModal from '../components/CreateTaskModal'; 

import '../TaskTable.css';
import '../index.css';

const API_BASE_URL = 'https://fasteasy-jvqis72guq-lm.a.run.app';

const testTasks = [
  {
    task_name: 'Test Task 1',
    dimension: '1x1',
    template_id: 'template_01',
    genPerRef: 5,
    gen_type: 'type_1',
    image_layers: ['image_1', 'image_2'],
    text_layers: ['text_1', 'text_2'],
  },
  {
    task_name: 'Test Task 2',
    dimension: '16x9',
    template_id: 'template_02',
    genPerRef: 3,
    gen_type: 'type_2',
    image_layers: ['image_3', 'image_4'],
    text_layers: ['text_3', 'text_4'],
  },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState(testTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleGenerate = async (task) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tz-front/generate_formats`, {
        task_name: task.task_name,
        dimension: task.dimension,
        template_id: task.template_id,
        amount: task.genPerRef,
        gen_type: task.gen_type,
        image_layers: task.image_layers,
        text_layers: task.text_layers,
      }, {
        auth: {
          username: 'renesandro',
          password: 'qwerty1234',
        },
      });
      console.log('Generated task:', response.data);
    } catch (error) {
      console.error('Error generating task:', error);
    }
  };

  const handleRowClick = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.task_name === updatedTask.task_name ? updatedTask : task
    ));
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const addNewTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <TaskTable
        tasks={tasks}
        handleGenerate={handleGenerate}
        handleRowClick={handleRowClick}
        handleUpdateTask={handleUpdateTask}
      />
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          closeModal={closeModal}
          updateTask={handleUpdateTask}
        />
      )}
      {isCreateModalOpen && (
        <CreateTaskModal
          closeModal={() => setIsCreateModalOpen(false)}
          addNewTask={addNewTask}
        />
      )}
      <button className="add-task-button" onClick={() => setIsCreateModalOpen(true)}>
        Add New Task
      </button>
    </div>
  );
};

export default Dashboard;
