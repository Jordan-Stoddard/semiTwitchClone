import axios from 'axios'


// setting the base url for our server calls
export default axios.create({
    baseURL: 'http://localhost:3001'
})