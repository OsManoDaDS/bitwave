import axios from 'axios'

const api = axios.create({

    baseURL: 'https://api-crud-utv0.onrender.com/'

})

export default api