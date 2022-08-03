import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { AssetItemTile, ErrorMessage, ListItemSeperator } from '../../components';
import { ApiService } from '../../services';
import styles from './AssetsScreen.style';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { fetchAssetsList } from '../../redux';
import { Asset } from '../../models';
import { IAssetListState } from '../../types';

interface IProps {
    assetsList: Asset[];
    isFetching: boolean;
    hasError: boolean;
    fetchAssetsList: (lastPageIndex: number, shouldPaginate: boolean) => void;
    navigation: any
}


class AssetsScreen extends Component<IProps> {
    apiService: ApiService = new ApiService();
    lastPageIndex: number = 1;

    componentDidMount(): void {
        this.fetchAssets(false)
    }

    fetchAssets(shouldPaginate: boolean) {
        this.props.fetchAssetsList(this.lastPageIndex, shouldPaginate)

        if (!shouldPaginate) return;
        this.lastPageIndex++
    }

    render(): JSX.Element {
        return (
            <View style={styles.body}>
                {this.renderPageContent()}
            </View>
        );
    }

    renderPageContent(): JSX.Element {
        if (this.props.hasError) {
            return <ErrorMessage
                text="Unable to fetch assets. Please try again later" />
        }
        else if (this.props.isFetching && this.props.assetsList.length == 0) {
            return <ActivityIndicator size={'large'} />
        }

        return <FlatList
            data={this.props.assetsList}
            renderItem={({ item }) => <AssetItemTile asset={item} navigation={this.props.navigation} />}
            onRefresh={() => this.fetchAssets(false)}
            keyExtractor={(item, _) => item.id}
            onEndReached={() => this.fetchAssets(true)}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => this.props.isFetching ? (<ActivityIndicator />) : null}
            refreshing={this.props.isFetching}
            pagingEnabled={true}
            ItemSeparatorComponent={() => <ListItemSeperator />}
        />
    }
}

const mapStateToProps = (state: { assetsList: IAssetListState }) => ({
    assetsList: state.assetsList.assets,
    isFetching: state.assetsList.isFetching,
    hasError: state.assetsList.hasError
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    ...bindActionCreators({ fetchAssetsList }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetsScreen);