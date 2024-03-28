import {createAsyncThunk} from '@reduxjs/toolkit';
import * as CommentApi from '../../service/Comment';
export const createComment = createAsyncThunk(
  'createComment/handleCreateComment',
  async (formData: {comicID: number; chapterID: number; content: string}) => {
    try {
      const response = await CommentApi.handleCreateComment(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const createCommentReply = createAsyncThunk(
  'createCommentReply/handleCreateCommentReply',
  async (formData: {
    comicID: number;
    chapterID: number;
    content: string;
    commentID: number;
  }) => {
    try {
      const response = await CommentApi.handleCreateCommentReply(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const deleteComment = createAsyncThunk(
  'deleteComment/handleUserhandledeleteComment',
  async (formData: {comicID: number; chapterID: number; commentID: number}) => {
    try {
      const response = await CommentApi.handleDeleteComment(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const getListComment = createAsyncThunk(
  'getListComment/handleGetListComment',
  async (formData: {
    comicID: number;
    chapterID: number;
    page: number;
    page_size: number;
  }) => {
    try {
      const response = await CommentApi.handleGetListComment(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const getListCommentReply = createAsyncThunk(
  'getListCommentReply/handleGetListCommentReply',
  async (formData: {
    comicID: number;
    chapterID: number;
    page: number;
    page_size: number;
    commentID: number;
  }) => {
    try {
      const response = await CommentApi.handleGetListCommentReply(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
