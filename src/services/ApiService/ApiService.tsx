import { Asset, TimeSeries } from "../../models";

export default class ApiService {
    BASE_URL: string = 'https://data.messari.io/api/v1/';

    async getAssets(pageIndex: number): Promise<Asset[]> {
        let path = "assets"
        let pageLimit: number = 20

        return new Promise<Asset[]>((resolve, reject) => {
            fetch(this.BASE_URL + path
                + `?page=${pageIndex}&limit=${pageLimit}`)
                .then((response: Response) => response.json())
                .then((json) => {
                    let assets: Asset[] = []

                    json.data.forEach((element: any) => {
                        assets.push(new Asset(element.id, element.name, element.metrics.market_data.price_usd, false))
                    });
                    resolve(assets)
                })
                .catch((err) => reject(err))
        })
    }

    async getAssetTimeSeries(assetId: string, from: string, to: string): Promise<TimeSeries[]> {
        let path = `assets/${assetId}/metrics/price/time-series`
        let interval = '1d'
        //You can change the above interval to 15m, 30m 1h etc if you have an api key.. More can be found on messari's website
        // https://messari.io/api/docs#tag/Assets/operation/Get%20Asset%20timeseries

        return new Promise<TimeSeries[]>((resolve, reject) => {
            fetch(this.BASE_URL + path
                + `?start=${from}&end=${to}&interval=${interval}&columns=timestamp,close`)
                .then((response: Response) => response.json())
                .then((json) => {
                    let timeSeries: TimeSeries[] = []

                    json.data.values.forEach((element: any) => {
                        timeSeries.push(new TimeSeries(element[0], element[1]))
                    });
                    resolve(timeSeries)
                })
                .catch((err) => reject(err))
        })
    }
}