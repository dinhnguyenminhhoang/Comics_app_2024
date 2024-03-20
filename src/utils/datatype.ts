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
}
