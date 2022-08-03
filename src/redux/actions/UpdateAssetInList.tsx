import { Asset } from "../../models";
import { ASSET_UPDATED_IN_LIST } from "../../types";

export function updateAssetFavoriteStatusInList(asset: Asset) {
    return (dispatch: any) => {
        dispatch(assetUpdatedInList(new Asset(asset.id, asset.name, asset.price, !asset.isFavorite)))
    }
}


const assetUpdatedInList = (asset: Asset) => ({ type: ASSET_UPDATED_IN_LIST, payload: asset })