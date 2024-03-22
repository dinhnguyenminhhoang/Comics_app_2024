import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import counterReducer from '../state/Slices/TodoSlice';
import * as comicSlices from '../state/Slices/Comic';
import * as genresSlices from '../state/Slices/Genres';
import * as commonSlices from '../state/Slices/common';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    listComics: comicSlices.GetListComicSlice.default,
    listNewComics: comicSlices.GetListNewComicSlice.default,
    listMostViewComics: comicSlices.GetListMostViewComicSlice.default,
    listNewChapter: comicSlices.GetListNewChapterSlice.default,
    listMostViewChapter: comicSlices.GetListMostViewChapterSlice.default,
    getListGenres: genresSlices.getListGenres.default,
    ComponentLoading: commonSlices.ComponentLoading.default,
    ThemeDarkMore: commonSlices.ThemeDarkMore.default,
  },
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
