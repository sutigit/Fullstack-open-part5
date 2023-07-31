import axios from 'axios'
// const baseUrl = '/api/login'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, payload) => {
  const config = {
    headers: { Authorization: token },
  }

  const data = {
    title: payload.title,
    author: payload.author,
    url: payload.url,
    likes: payload.likes
  }

  const response = await axios.put(`${baseUrl}/${id}`,data , config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { getAll, setToken, create, update, remove }