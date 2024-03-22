export interface comicsApiParams {
  page: number;
  page_size: number;
  genres?: number[];
  author?: number;
  status?: number;
  min_chapter?: number;
  sort_by?: number;
  sort?: string;
}
export const COMICPARAM: comicsApiParams = {
  page: 1,
  page_size: 10,
  author: -1,
  genres: [],
  min_chapter: -1,
  sort: '',
  sort_by: -1,
  status: -1,
};
