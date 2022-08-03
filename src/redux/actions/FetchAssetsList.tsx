import { Asset } from "../../models";
import { ApiService } from "../../services";
import { FETCHING_ASSETS, ASSETS_FETCH_SUCCESS, ASSETS_FETCH_FAILURE, IReduxAction } from "../../types";

const apiService: ApiService = new ApiService()

export default function fetchAssetsList(lastPageIndex: number, shouldPaginate: boolean) {
    return (dispatch: any) => {
        dispatch(fetchingAssets())

        let pageIndex = shouldPaginate ? lastPageIndex + 1 : 1

        return apiService.getAssets(pageIndex).then((assets) => {
            return dispatch(assetsFetchSuccess(assets, shouldPaginate))
        }).catch((_) => {
            dispatch(assetsFetchFailure())
        })
    }
}

const fetchingAssets = (): IReduxAction => ({ type: FETCHING_ASSETS })

const assetsFetchSuccess = (assetList: Asset[], shouldPaginate: boolean): IReduxAction => ({
    type: ASSETS_FETCH_SUCCESS,
    payload: {
        assets: assetList,
        shouldPaginate: shouldPaginate,
    }
})

const assetsFetchFailure = (): IReduxAction => ({ type: ASSETS_FETCH_FAILURE })