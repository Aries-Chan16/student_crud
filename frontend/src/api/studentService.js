/**
 * Resolves the backend base URL dynamically:
 * - When deployed on Render or provided via VITE_API_BASE_URL: uses the full remote URL
 * - In local dev (when unset): uses relative path '' so Vite's dev proxy forwards to localhost:8080
 */
function getApiRoot() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    const withoutProto = clean.replace(/^https?:\/\//i, '');
    if (!withoutProto.includes('.') && !withoutProto.includes('localhost')) {
      clean = `https://${withoutProto}.onrender.com`;
    } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    return clean;
  }
  return '';
}

const BASE_URL = `${getApiRoot()}/chan/students`;

/**
 * Handle API responses with proper error extraction
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMessage = typeof data === 'string' ? data : (data.message || `Request failed with status ${response.status}`);
    throw new Error(errorMessage);
  }

  return data;
}

export const studentService = {
  /**
   * Fetch all students
   * @returns {Promise<Array>}
   */
  async getAll() {
    const response = await fetch(BASE_URL, {
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Fetch single student by ID
   * @param {number|string} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Create a new student
   * @param {Object} student - { firstname, lastname, course, section }
   * @returns {Promise<Object>}
   */
  async create(student) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(student),
    });
    return handleResponse(response);
  },

  /**
   * Update an existing student
   * @param {number|string} id
   * @param {Object} student - { firstname, lastname, course, section }
   * @returns {Promise<Object>}
   */
  async update(id, student) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(student),
    });
    return handleResponse(response);
  },

  /**
   * Delete a student by ID
   * @param {number|string} id
   * @returns {Promise<string>}
   */
  async delete(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
