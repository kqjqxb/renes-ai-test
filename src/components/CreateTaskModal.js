import React, { useState } from 'react';
import Modal from 'react-modal';
import '../App.css';

Modal.setAppElement('#root');

const CreateTaskModal = ({ closeModal, addNewTask }) => {
  const [taskName, setTaskName] = useState('');
  const [dimension, setDimension] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [amount, setAmount] = useState(0);
  const [genType, setGenType] = useState('');
  const [imageLayers, setImageLayers] = useState('');
  const [textLayers, setTextLayers] = useState('');


  const [images, setImages] = useState([]);
  const [flow, setFlow] = useState('');
  const [style, setStyle] = useState('');
  const [manualPrompts, setManualPrompts] = useState('');
  const [genPerRef, setGenPerRef] = useState(0);
  const [text, setText] = useState('');

  const genTypeOptions = ['type_1', 'type_2'];
  const dimensionOptions = ['1x1', '9x16', '16x9'];
  const flowOptions = ['other_models_mix', 'mj_model'];
  const stylesOptions = ['An ultra-realistic photography', 'Anime style'];

  const handleAddTask = () => {
    const newTask = {
      task_name: taskName,
      dimension,
      template_id: templateId,
      amount,
      gen_type: genType,
      image_layers: imageLayers ? imageLayers.split(',').map(layer => layer.trim()) : [],
      text_layers: textLayers ? textLayers.split(',').map(layer => layer.trim()) : [],
    };

    addNewTask(newTask);
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Create Task Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Create New Task</h2>
        <form>
        <div>
            <div>
             <label>Task Name:</label>
                <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </div>
            <label>Dimension:</label>
            <select value={dimension} onChange={(e) => setDimension(e.target.value)}>
              <option value="">Select Dimension</option>
              {dimensionOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Flow:</label>
            <select value={flow} onChange={(e) => setFlow(e.target.value)}>
              <option value="">Select Flow</option>
              {flowOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Style:</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="">Select Style</option>
              {stylesOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Manual Prompts:</label>
            <input type="text" value={manualPrompts} onChange={(e) => setManualPrompts(e.target.value)} />
          </div>
          <div>
            <label>Gen Per Ref:</label>
            <input type="number" value={genPerRef} onChange={(e) => setGenPerRef(Number(e.target.value))} />
          </div>
          <div>
            <label>Text:</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>



          
          
          <button type="button" onClick={handleAddTask}>Add Task</button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
