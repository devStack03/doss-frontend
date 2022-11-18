import axios from 'axios';

// const token = JSON.parse(localStorage.getItem('doss-root') ? localStorage.getItem('doss-root') : `{ auth: { user: { accessToken: '' } } }`);
// const localstorage = localStorage.getItem('doss-root');
// const authData = localstorage ? JSON.parse(localstorage) : `{ auth: { user: { accessToken: '' } } }`;
// console.log(JSON.parse(authData.auth))
// const token = JSON.parse(authData.auth)?.user.accessToken ? JSON.parse(authData.auth).user.accessToken : '';
const axiosInstance = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-type": "application/json",
    }
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;