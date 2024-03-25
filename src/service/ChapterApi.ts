import {comicsApiParams} from './../utils/ApiType';
import axios from '../config/instance';

const handleGetDetailChapter = (formData: {
  comicId: number;
  ChapterId: number;
}) => {
  return axios.get(
    `/api/v1/comics/${formData.comicId}/chapter/${formData.ChapterId}`,
  );
};
export {handleGetDetailChapter};
