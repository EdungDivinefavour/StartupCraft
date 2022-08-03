import React, { Component } from 'react';
import { Dimensions, View, Text, ActivityIndicator } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { ErrorMessage, IconButton, Spacer } from '../../components';
import { Asset, TimeSeries } from '../../models';
import { ApiService } from '../../services';
import { TimeUtils } from '../../utils';
import styles from './AssetScreen.style';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchAssetTimeSeries, updateAssetFavoriteStatusInList } from '../../redux';
import { IAssetListState, ITimeSeriesState } from '../../types';

interface IProps {
    timeSeries: TimeSeries[];
    isFetching: boolean;
    hasError: boolean;
    assetsList: Asset[];
    fetchAssetTimeSeries: (assetId: string) => void;
    updateAssetFavoriteStatusInList: (asset: Asset) => void;
    navigation: any;
    route: any
}

class AssetScreen extends Component<IProps> {
    apiService: ApiService = new ApiService();
    timeUtils: TimeUtils = new TimeUtils();

    componentDidMount(): void {
        var asset = this.props.assetsList.find((e) => e.id == this.props.route.params.assetId);

        this.setHeaderIcon(asset!)
        this.props.fetchAssetTimeSeries(asset!.id)
    }

    componentDidUpdate(): void {
        var asset = this.props.assetsList.find((e) => e.id == this.props.route.params.assetId);
        this.setHeaderIcon(asset!)
    }

    render(): JSX.Element {
        var asset = this.props.assetsList.find((e) => e.id == this.props.route.params.assetId);

        return (
            <View style={styles.body}>
                <Spacer height={10}></Spacer>
                <Text style={styles.assetName}>{`Asset Name: ${asset?.name}`}</Text>
                <Spacer height={5}></Spacer>
                <Text style={styles.assetPrice}>{`Price: ${asset?.price} USD`}</Text>
                <Spacer height={30}></Spacer>
                <Text style={styles.description}>{
                    this.props.isFetching ? "Loading chart..." :
                        `The below chart represents the price change of ${asset?.name} for the last 5 days using a 1 day interval`
                }</Text>
                <Spacer height={60}></Spacer>
                {this.renderChartView()}
            </View>
        );
    }

    renderChartView(): JSX.Element {
        if (this.props.hasError) {
            return <ErrorMessage
                text="Unable to fetch chart data and load chart. Please try again later" />
        }
        else if (this.props.isFetching || this.props.timeSeries.length == 0) {
            return <ActivityIndicator size={'large'} />
        }

        return <LineChart
            data={{
                labels: this.props.timeSeries.map((e) => this.timeUtils.timeStampToDateString(e.timestamp, '/')),
                datasets: [{ data: this.props.timeSeries.map((e) => e.price) }],
            }}
            width={Dimensions.get("window").width - 30}
            height={350}
            yAxisInterval={this.props.timeSeries.length}
            yAxisLabel="$"
            chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForDots: { r: "2", strokeWidth: "1", stroke: "#000000" },
                propsForLabels: { fontSize: 8 }
            }}
            bezier
        />
    }

    setHeaderIcon(asset: Asset) {
        this.props.navigation.setOptions({
            headerRight: () =>
                <IconButton
                    iconName={asset.isFavorite ? "heart" : "heart-outlined"}
                    onPress={() => this.props.updateAssetFavoriteStatusInList(asset!)}
                ></IconButton>,
        })
    }
}

const mapStateToProps = (state: { timeSeries: ITimeSeriesState; assetsList: IAssetListState }) => {
    return {
        isFetching: state.timeSeries.isFetching,
        timeSeries: state.timeSeries.timeSeries,
        hasError: state.timeSeries.hasError,
        assetsList: state.assetsList.assets,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    ...bindActionCreators(
        { fetchAssetTimeSeries, updateAssetFavoriteStatusInList }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetScreen);