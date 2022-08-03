import { createStore, combineReducers, applyMiddleware } from 'redux';
import { assetsListReducer, assetTimeSeriesReducer } from '../reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers(
    {
        assetsList: assetsListReducer,
        timeSeries: assetTimeSeriesReducer,
    }
);

export const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;