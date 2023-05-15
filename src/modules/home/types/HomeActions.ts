import { RootState } from 'store';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export type HomeAction<T> = ThunkAction<
  Promise<T>,
  RootState,
  unknown,
  AnyAction
>;
