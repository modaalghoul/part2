import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl).then(response => response.data)
    return request
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject).then(response => response.data)
    return request
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`).then(response => response.data)
    return request
}

export default { getAll, create, remove }