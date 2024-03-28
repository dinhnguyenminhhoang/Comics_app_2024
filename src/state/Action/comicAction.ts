import {pagintype} from './../../utils/datatype';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {comicsApiParams} from 'utils/ApiType';
import * as comicApi from '../../service/ComicApi';
export const getListComics = createAsyncThunk(
  'listComic/handleListComic',
  async (formData: comicsApiParams) => {
    try {
      const response = await comicApi.handleGetListComics(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const getListNewComics = createAsyncThunk(
  'listNewComic/handleListNewComic',
  async (formData: comicsApiParams) => {
    try {
      const response = await comicApi.handleGetListComics(formData);
      let data = response;
      return data.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getListMostViewComics = createAsyncThunk(
  'listMostViewComic/handleListMostViewComic',
  async (formData: comicsApiParams) => {
    try {
      const response = await comicApi.handleGetListComics(formData);
      let data = response;
      return data.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getListMostViewChapter = createAsyncThunk(
  'listMostViewChapter/handleListMostViewChapter',
  async (formData: comicsApiParams) => {
    try {
      const response = await comicApi.handleGetListComics(formData);
      let data = response;
      return data.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getListNewChapter = createAsyncThunk(
  'listNewChapter/handleListNewChapter',
  async (formData: comicsApiParams) => {
    try {
      const response = await comicApi.handleGetListComics(formData);
      let data = response;
      return data.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getComicById = createAsyncThunk(
  'getComicById/handleGetComicById',
  async (id: number) => {
    try {
      const response = await comicApi.handleGetComicByID(id);
      let data = response;
      return data.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getComiFilter = createAsyncThunk(
  'getComiFilter/handleGetComiFilter',
  async (formData: comicsApiParams) => {
    try {
      const response = await comicApi.handleGetListComics(formData);
      let data = response;
      return data.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getResultSearchComics = createAsyncThunk(
  'getResultSearchComics/handleGetResultSearchComics',
  async (formData: {keyword: string; page: number; page_size: number}) => {
    try {
      const response = await comicApi.handleGetResultSearchComics(formData);
      let data = response;
      return data.data;
    } catch (error) {
      throw error;
    }
  },
);
