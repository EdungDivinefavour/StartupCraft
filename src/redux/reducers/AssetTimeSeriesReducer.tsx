import { FETCHING_TIME_SERIES, TIME_SERIES_FETCH_SUCCESS, TIME_SERIES_FETCH_FAILURE, ITimeSeriesState, IReduxAction } from "../../types";

const INITIAL_STATE: ITimeSeriesState = {
    timeSeries: [],
    isFetching: false,
    hasError: false
}

export default function assetTimeSeriesReducer(state = INITIAL_STATE, action: IReduxAction): ITimeSeriesState {
    switch (action.type) {
        case FETCHING_TIME_SERIES:
            return { ...state, isFetching: true }

        case TIME_SERIES_FETCH_SUCCESS:
            return { ...state, isFetching: false, timeSeries: action.payload }

        case TIME_SERIES_FETCH_FAILURE:
            return { ...state, isFetching: false, hasError: true }

        default:
            return state
    }
}