import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-react-mohan.firebaseio.com/'
});

export default instance;