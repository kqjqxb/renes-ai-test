const API_URL = 'https://fasteasy-jvqis72guq-lm.a.run.app/api';

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('renesandro:qwerty1234'),
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const generateImages = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tz-front/generate_images`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa('renesandro:qwerty1234'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error generating images:', error);
    throw error;
  }
};

export const generateFormats = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tz-front/generate_formats`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa('renesandro:qwerty1234'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error generating formats:', error);
    throw error;
  }
};
