import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';

export const useAppDispatch = <T extends AnyAction>(action: T) => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(action), [dispatch, action]);
};
