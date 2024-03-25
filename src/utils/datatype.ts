import {ImageProps} from 'react-native';

export interface ComicType {
  id: number;
  name: string;
  other_name: string;
  image: string;
  description: string;
  is_finished: boolean;
  viewed: number;
  updated_at: Date | null;
  lasted_chapter: string;
}
export interface genresType {
  id: number;
  name: string;
  description?: string;
}
export interface pagintype {
  page: number;
  page_size: number;
  total: number;
  total_page: number;
  has_more?: boolean;
}
export type RootStackParamList = {
  Home: undefined;
  Filter: {
    genresId?: number;
  };
  Favorite: undefined;
  LoginScreen: undefined;
};
export type RootAppParamList = {
  Tab: undefined;
  Details: {
    comicId: number;
  };
  Chapters: {
    chapter: chapterType;
    comicId: number;
    startChapterId: number;
    endChapterId: number;
  };
};
export interface authorsType {
  id: number;
  name: string;
}
export interface chapterType {
  id: number;
  name: string;
  updated_at: Date;
}
export interface ComicDetailType {
  id: number;
  name: string;
  other_name: string;
  image: string;
  description: string;
  is_finished: true;
  viewed: number;
  updated_at: null | Date;
  authors: authorsType[];
  genres: genresType[];
  chapters: chapterType[];
}
export interface chapterDetailType {
  id: number;
  name: string;
  updated_at: Date;
  viewed: number;
  images: {
    original: string;
    cdn: string;
  }[];
}
