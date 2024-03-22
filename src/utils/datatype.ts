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
  description: string;
}
export interface pagintype {
  page: number;
  page_size: number;
  total: number;
  total_page: number;
  has_more?: boolean;
}
