import {comicsApiParams} from './../utils/ApiType';
import axios from '../config/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleGetDetailChapter = async (formData: {
  comicId: number;
  ChapterId: number;
}) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    const headers = {
      Authorization: `Bearer ${JSON.parse(token || '')}`,
    };
    return axios.get(
      `/api/v1/comics/${formData.comicId}/chapter/${formData.ChapterId}`,
      {headers},
    );
  }
  return axios.get(
    `/api/v1/comics/${formData.comicId}/chapter/${formData.ChapterId}`,
  );
};
export {handleGetDetailChapter};
