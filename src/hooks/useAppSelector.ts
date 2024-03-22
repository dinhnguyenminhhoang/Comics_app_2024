import {useEffect, useReducer, useRef} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from 'store/store';

const undefinedRef = Symbol();

const refEquality = (a: Object, b: Object) => a === b;

export function useAppSelector<Selected = unknown>(
  selector: (state: RootState) => Selected,
  ignoreUnfocusedScreens: boolean = true,
  equalityFn?: (left: Selected, right: Selected) => boolean,
) {
  const navigation = useNavigation();
  const [, forceRender] = useReducer(s => s + 1, 0);

  const screenIsFocused = useRef(true);
  const memoizedSelectorResult = useRef<Selected | Symbol>(undefinedRef);
  const returnedSelectorResult = useRef<Selected | Symbol>(undefinedRef);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      screenIsFocused.current = true;

      if (
        memoizedSelectorResult.current !== undefinedRef &&
        returnedSelectorResult.current !== undefinedRef
      ) {
        const compareFn = equalityFn ?? refEquality;

        const shouldForceRender = !compareFn(
          memoizedSelectorResult.current as any,
          returnedSelectorResult.current as any,
        );

        if (shouldForceRender) {
          forceRender();
        }
      }
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      screenIsFocused.current = false;
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return useSelector((state: RootState) => {
    memoizedSelectorResult.current = selector(state);

    if (
      returnedSelectorResult.current === undefinedRef ||
      screenIsFocused.current ||
      !ignoreUnfocusedScreens
    ) {
      returnedSelectorResult.current = memoizedSelectorResult.current;
    }

    return returnedSelectorResult.current as Selected;
  }, equalityFn);
}
