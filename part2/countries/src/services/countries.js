import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'
const customBaseURL = 'http://localhost:3001/Countries'

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`)
  return request.then(response => response.data)
}

const putAll = newObject => {
    const request = axios.post(customBaseURL, newObject)
  return request.then(response => response.data)
}

const retrieveAll = () => {
  const request = axios.get(customBaseURL)
  return request.then(response => response.data)
}

export default { getAll, putAll, retrieveAll}