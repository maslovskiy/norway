const axios = require('axios');

// Make a request for a user with a given ID
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': "application/json"
  },
  mode: "cors",
});

export const getSchemas = () => {
  return axios.get('/metadata/schemas')
    .then(response => response)
    .catch(error => error)
}

export const getSchemaTypes = () => {
  return axios.get('/metadata/schema-types')
    .then(response => response)
    .catch(error => error)
}