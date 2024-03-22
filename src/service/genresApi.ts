import {comicsApiParams} from './../utils/ApiType';
import axios from '../config/instance';

const handleGetListGenres = () => {
  return axios.get('/api/v1/genres');
};
export {handleGetListGenres};
