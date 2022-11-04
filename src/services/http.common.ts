import axios from 'axios';

export default axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "http://64.225.64.147:5000/api",
    headers: {
        "Content-type": "application/json"
    }
});