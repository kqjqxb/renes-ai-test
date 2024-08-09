import React, { useEffect, useState } from 'react';
import '../TaskTable.css';
import '../tailwind.css';
import { CiTextAlignLeft } from "react-icons/ci";
import { PiCursorLight } from "react-icons/pi";
import { MdGrid3X3 } from "react-icons/md";
import { RxLetterCaseUppercase } from "react-icons/rx";

const dimensionOptions = ['1x1', '9x16', '16x9'];
const genTypeOptions = ['random_generation', 'cyclic_generation'];

const TaskTable = ({ tasks, handleGenerate, handleRowClick, handleUpdateTask }) => {
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);
  const [unique, setUnique] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const [showDimensionOptions, setShowDimensionOptions] = useState(false);
  const [showGenTypeOptions, setShowGenTypeOptions] = useState(false);

  useEffect(() => {
    setCount(tasks.length);
    setSum(tasks.reduce((total, task) => total + task.genPerRef, 0));
    setUnique(tasks.filter(task => task.gen_type === 'cyclic_generation').length);
  }, [tasks]);

  const handleDimensionChange = (dimension, task) => {
    const updatedTask = { ...task, dimension };
    handleUpdateTask(updatedTask);
    setEditingTask(null);
    setShowDimensionOptions(false);
  };

  const handleGenTypeChange = (gen_type, task) => {
    const updatedTask = { ...task, gen_type };
    handleUpdateTask(updatedTask);
    setEditingTask(null);
    setShowGenTypeOptions(false);
  };

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th><RxLetterCaseUppercase />Task Name</th>
          <th>Dimension</th>
          <th>Template ID</th>
          <th className="justify-between flex-1  "><CiTextAlignLeft className='ml-4'/><span >Images</span></th>
          <th className="justify-between flex-1 "><CiTextAlignLeft className='ml-4'/><span >Text</span></th>
          <th><MdGrid3X3 />Amount</th>
          <th>Gen Type</th>
          <th className="justify-between flex-1" > <PiCursorLight />Gen Tasks</th>
          <th>Result Ads</th>
        </tr>
      </thead>
      <tbody>
      <tr style={{ backgroundColor: '#f7f7f7', textAlign: 'right' }}>
           <td style={{textAlign: 'right' }} >
             <span>Count</span> <b>{count}</b>
           </td>
           <td colSpan="4" style={{textAlign: 'right' }}></td>
           <td>
             <span>Sum</span> <b> {sum}</b></td>
           <td ><span >Unique</span> <b> {unique}</b> </td>
           <td colSpan="2" style={{textAlign: 'right' }}></td>
         </tr>
        {Array.isArray(tasks) && tasks.map((task) => (
          <tr key={task.task_name}>
            <td onClick={() => handleRowClick(task)} style={{ cursor: 'pointer' }}>
              {task.task_name}
            </td>
            <td onClick={(e) => { e.stopPropagation(); setEditingTask(task); setShowDimensionOptions(true); }}>
              <span className='bg-purple-200 text-black text-center items-center text-xs rounded-lg px-2 py-1' style={{cursor: 'pointer'}}>
                {task.dimension}
              </span>
              {editingTask === task && showDimensionOptions && (
                <div className="dropdown">
                  {dimensionOptions.map(option => (
                    <div
                      key={option}
                      className="dropdown-item"
                      onClick={() => handleDimensionChange(option, task)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </td>
            <td><span className="bg-pink-300 text-clack px-2 py-1 rounded-xl" >{task.template_id}</span></td>
            <td>
              {task.image_layers.map((image, index) => (
                <div key={index} className="bg-gray-200 p-2 rounded mb-1">
                  {image}
                </div>
              ))}
            </td>
            <td>{task.text || ''}</td>
            <td>{task.genPerRef}</td>
            <td onClick={(e) => { e.stopPropagation(); setEditingTask(task); setShowGenTypeOptions(true); }}>
              <span className="bg-orange-300 text-black px-2 py-1 rounded-xl" style={{cursor: 'pointer'}}>
                {task.gen_type}
              </span>
              
              {editingTask === task && showGenTypeOptions && (
                <div className="dropdown">
                  {genTypeOptions.map(option => (
                    <div
                      key={option}
                      className="dropdown-item"
                      onClick={() => handleGenTypeChange(option, task)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </td>
            <td>
              <button className="bg-yellow-100 text-black-400 px-3 py-1 rounded" onClick={(e) => { e.stopPropagation(); handleGenerate(task); }}>Generate</button>
            </td>
            <td>
              <a
                href={`https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${task.task_name}_${task.dimension}/format_validation`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="bg-green-200 px-3 py-1 rounded"
              >
                View Results
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
