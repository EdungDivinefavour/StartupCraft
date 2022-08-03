import { Asset, TimeSeries } from "../models";

// =====   Type exports  ====== 
export type RootScreens = {
    BottomTabs: undefined;
    Assets: undefined;
    Asset: undefined;
}

export type BottomTabScreens = {
    Home: undefined
    Favorites: undefined;
}


//  =======  Const exports  ======
export const FETCHING_ASSETS = 'FETCHING_ASSETS'
export const ASSETS_FETCH_SUCCESS = 'ASSETS_FETCH_SUCCESS'
export const ASSETS_FETCH_FAILURE = 'ASSETS_FETCH_FAILURE'

export const FETCHING_TIME_SERIES = 'FETCHING_TIME_SERIES'
export const TIME_SERIES_FETCH_SUCCESS = 'TIME_SERIES_FETCH_SUCCESS'
export const TIME_SERIES_FETCH_FAILURE = 'TIME_SERIES_FETCH_FAILURE'

export const ASSET_UPDATED_IN_LIST = 'ASSET_UPDATED_IN_LIST'



// =======  Interface exports  =========
export interface IReduxAction {
    type: String,
    payload?: any
}

export interface IAssetListState {
    assets: Asset[],
    isFetching: boolean,
    hasError: boolean
}

export interface ITimeSeriesState {
    timeSeries: TimeSeries[],
    isFetching: boolean,
    hasError: boolean
}