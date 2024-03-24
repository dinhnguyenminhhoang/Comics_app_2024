import {comicsApiParams} from './../utils/ApiType';
import axios from '../config/instance';
const fillParams = (formData: comicsApiParams) => {
  const {page, page_size, author, genres, min_chapter, sort, sort_by, status} =
    formData;
  const queryParams: any = {};
  if (page) queryParams.page = page;
  if (page_size) queryParams.page_size = page_size;
  if (author !== undefined) queryParams.author = author;
  if (genres !== undefined) queryParams.genres = genres;
  if (min_chapter !== undefined) queryParams.min_chapter = min_chapter;
  if (sort !== undefined) queryParams.sort = sort;
  if (sort_by !== undefined) queryParams.sort_by = sort_by;
  if (status !== undefined) queryParams.status = status;
  return queryParams;
};
const handleGetListComics = (formData: comicsApiParams) => {
  const queryParams = fillParams(formData);
  return axios.get('/api/v1/comics', {
    params: {
      genres: queryParams.genres,
      ...queryParams,
    },
    paramsSerializer: {
      indexes: null, // by default: false
    },
  });
};
const handleGetComicByID = (comicID: number) => {
  return axios.get(`/api/v1/comics/${comicID.toString()}`);
};

export {handleGetListComics, handleGetComicByID};
