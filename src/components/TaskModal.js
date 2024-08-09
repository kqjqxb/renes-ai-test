import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../App.css';

Modal.setAppElement('#root');

const TaskModal = ({ task, closeModal, updateTask }) => {
  const [images, setImages] = useState([]);
  const [dimension, setDimension] = useState(task.dimension || '');
  const [flow, setFlow] = useState('');
  const [style, setStyle] = useState('');
  const [manualPrompts, setManualPrompts] = useState('');
  const [genPerRef, setGenPerRef] = useState(0);
  const [text, setText] = useState('');
  const [gen_type, setGen_type] = useState(task.gen_type || '');

  const dimensionOptions = ['1x1', '9x16', '16x9'];
  const flowOptions = ['other_models_mix', 'mj_model'];
  const genTypeOptions = ['random_generation', 'cyclic_generation'];
  const stylesOptions = ['An ultra-realistic photography', 'Anime style'];

  const handleGenerate = async () => {
    try {
      const response = await axios.post('https://fasteasy-jvqis72guq-lm.a.run.app/tz-front/generate_images', {
        images,
        dimension,
        style,
        manual_prompts: manualPrompts,
        gen_per_ref: genPerRef,
        flow,
        text
      }, {
        auth: {
          username: 'renesandro',
          password: 'qwerty1234',
        },
      });
      console.log('Generated images:', response.data);

      const updatedTask = { ...task, dimension, gen_type,  flow, style, manual_prompts: manualPrompts, genPerRef, text };
      updateTask(updatedTask);

      closeModal();
    } catch (error) {
      console.error('Error generating images:', error);
    }
  };
  

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Task Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{task.task_name}</h2>
        <form>
          <div>
            <label>Text:</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
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
            <label>Manual Prompts:</label>
            <input type="text" value={manualPrompts} onChange={(e) => setManualPrompts(e.target.value)} />
          </div>
          <div>
            <label>Gen Per Ref:</label>
            <input type="number" value={genPerRef} onChange={(e) => setGenPerRef(Number(e.target.value))} />
          </div>
          <div>
            <label>Generation Type:</label>
            <select value={gen_type} onChange={(e) => setGen_type(e.target.value)}>
              <option value="">Select Generation Type</option>
              {genTypeOptions.map(option => (
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
          <button type="button" onClick={handleGenerate}>Generate</button>
        </form>
      </div>
    </Modal>
  );
};

export default TaskModal;
