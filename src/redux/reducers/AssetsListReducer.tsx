import { FETCHING_ASSETS, ASSETS_FETCH_SUCCESS, ASSETS_FETCH_FAILURE, ASSET_UPDATED_IN_LIST, IAssetListState, IReduxAction } from "../../types";

const INITIAL_STATE: IAssetListState = {
    assets: [],
    isFetching: false,
    hasError: false,
}

export default function assetsListReducer(state = INITIAL_STATE, action: IReduxAction): IAssetListState {
    switch (action.type) {
        case FETCHING_ASSETS:
            return { ...state, isFetching: true }

        case ASSETS_FETCH_SUCCESS:
            let payload = action.payload
            let resultingList = payload.shouldPaginate ? state.assets.concat(payload.assets) : payload.assets

            return { ...state, isFetching: false, assets: resultingList }

        case ASSET_UPDATED_IN_LIST:
            let updatedItemIndex = state.assets.findIndex((e) => e.id == action.payload.id)
            let updatedAssetList = [...state.assets]

            updatedAssetList[updatedItemIndex] = action.payload
            return { ...state, assets: updatedAssetList }

        case ASSETS_FETCH_FAILURE:
            return { ...state, isFetching: false, hasError: true }
        default:
            return state
    }
}