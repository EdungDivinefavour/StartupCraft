import { TimeSeries } from "../../models";
import { ApiService } from "../../services";
import { TimeUtils } from "../../utils";
import { FETCHING_TIME_SERIES, TIME_SERIES_FETCH_SUCCESS, TIME_SERIES_FETCH_FAILURE, IReduxAction } from "../../types";

const apiService: ApiService = new ApiService()
const timeUtils: TimeUtils = new TimeUtils()

export default function fetchAssetTimeSeries(assetId: string) {
    return (dispatch: any) => {
        dispatch(fetchingTimeSeries())

        let from = timeUtils.getDateForDaysAgo(5)
        let to = timeUtils.getCurrentDate()

        return apiService.getAssetTimeSeries(assetId, from, to).then((timeSeries) => {
            return dispatch(timeSeriesFetchSuccess(timeSeries))
        }).catch((_) => {
            dispatch(timeSeriesFetchFailure)
        })

    }
}

const fetchingTimeSeries = (): IReduxAction => ({ type: FETCHING_TIME_SERIES })

const timeSeriesFetchSuccess = (timeSeries: TimeSeries[]): IReduxAction => ({ type: TIME_SERIES_FETCH_SUCCESS, payload: timeSeries })

const timeSeriesFetchFailure = (): IReduxAction => ({ type: TIME_SERIES_FETCH_FAILURE })