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
export const getUser = () => {
  return axios.post('/user-profile/username')
    .then(response => response)
    .catch(error => error)
}

export const styreprotokoll_kontantemisjon_controller = request => {
  return axios.post(`/document/styreprotokoll-kontantemisjon/doc`, request,
    {responseType: 'blob'})
    .then(response => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], {type: type, encoding: 'UTF-8'})
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = "Protokoll Fra Styremøte.docx"
      link.click()
    });
}

export const innkalling_egf_kontantemisjon_controller = request => {
  return axios.post(`/document/innkalling-egf-kontantemisjon/doc`, request,
    {responseType: 'blob'})
    .then(response => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], {type: type, encoding: 'UTF-8'})
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = "Protokoll Fra Styremøte.docx"
      link.click()
    });
}
export const egf_protokoll_kontantemisjon_conroller= request => {
  return axios.post(`/document/egf-protokoll-kontantemisjon/doc`, request,
    {responseType: 'blob'})
    .then(response => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], {type: type, encoding: 'UTF-8'})
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = "Protokoll Fra Styremøte.docx"
      link.click()
    });
}

