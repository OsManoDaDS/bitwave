import axios from 'axios'

const api = axios.create({

    // baseURL: 'https://api-crud-1-sqcl.onrender.com'
    baseURL: 'http://localhost:8081'

})

export default api
