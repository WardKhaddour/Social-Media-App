import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import Services from '../Services';
import { AnyAction } from 'redux';

type HomeAction<T> = ThunkAction<Promise<T>, RootState, unknown, AnyAction>;

export {};
