import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import counterReducer from '../state/Slices/TodoSlice';
import * as comicSlices from '../state/Slices/Comic';
import * as genresSlices from '../state/Slices/Genres';
import * as commonSlices from '../state/Slices/common';
import * as chapterSlices from '../state/Slices/Chapter';
import * as authSlice from '../state/Slices/Auth';
import * as ProfileSlice from '../state/Slices/Profile';
import * as CommentSlice from '../state/Slices/Comment';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    listComics: comicSlices.GetListComicSlice.default,
    listNewComics: comicSlices.GetListNewComicSlice.default,
    listMostViewComics: comicSlices.GetListMostViewComicSlice.default,
    listNewChapter: comicSlices.GetListNewChapterSlice.default,
    listMostViewChapter: comicSlices.GetListMostViewChapterSlice.default,
    comicById: comicSlices.GetComicByIdSlice.default,
    ListComicsFilter: comicSlices.GetListComicFilterSlice.default,
    searchComicData: comicSlices.GetResutSearchComicsSlice.default,
    //
    getListGenres: genresSlices.getListGenres.default,
    //
    ComponentLoading: commonSlices.ComponentLoading.default,
    ThemeDarkMode: commonSlices.ThemeDarkMode.default,
    //chapter
    detailChapter: chapterSlices.GetDetailChapterSlice.default,
    //auth
    loginData: authSlice.UserLoginSlice.default,
    LogoutData: authSlice.UserLogoutSlice.default,
    RegisterData: authSlice.UserRegisterSlice.default,
    isLogger: authSlice.auth.default,
    //profile
    userProfile: ProfileSlice.GetProfileSlice.default,
    historyView: ProfileSlice.GetHistoryViewSlice.default,
    historyComment: ProfileSlice.GetHistoryCommentSlice.default,
    updateProfile: ProfileSlice.UpdateProfileCommentSlice.default,
    //comments
    listComment: CommentSlice.getListCommentSlice.default,
    listCommentReply: CommentSlice.getListCommentRelySlice.default,
    createCommentData: CommentSlice.createCommentReplySlice.default,
    createCommentReplyData: CommentSlice.createCommentSlice.default,
    deleteCommentData: CommentSlice.deleteComment.default,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
