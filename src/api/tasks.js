import axios from 'axios';

const API_BASE_URL = 'https://fasteasy-jvqis72guq-lm.a.run.app/api';


export const fetchTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

export const fetchTask = async (taskName) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${taskName}`);
  return response.data;
};

export const generateTask = async (task) => {
  const response = await axios.post(`${API_BASE_URL}/tz-front/generate_formats`, task, {
    auth: {
      username: 'renesandro',
      password: 'qwerty1234'
    }
  });
  return response.data;
};



// import axios from 'axios';

// const API_BASE_URL = 'https://fasteasy-jvqis72guq-lm.a.run.app';

// export const generateFormats = async (task) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/tz-front/generate_formats`, task, {
//       auth: {
//         username: 'renesandro',
//         password: 'qwerty1234',
//       },
//     });
//     console.log('Generated formats:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error generating formats:', error);
//     throw error;
//   }
// };

// export const generateImages = async (imageData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/tz-front/generate_images`, imageData, {
//       auth: {
//         username: 'renesandro',
//         password: 'qwerty1234',
//       },
//     });
//     console.log('Generated images:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error generating images:', error);
//     throw error;
//   }
// };
