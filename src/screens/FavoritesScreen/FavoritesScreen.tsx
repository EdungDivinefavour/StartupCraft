import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { AssetItemTile, ErrorMessage, ListItemSeperator } from '../../components';
import { Asset } from '../../models';
import styles from './FavoritesScreen.style';
import { connect } from 'react-redux';

interface IProps {
    navigation: any;
    favoritesList: Asset[]
}

class FavoritesScreen extends Component<IProps> {
    render(): JSX.Element {
        return (
            <View style={styles.body}>
                {this.props.favoritesList.length == 0 ?
                    <ErrorMessage
                        text='You have not added any items to your favorites yet!. Tap on an asset from the home screen to add an asset to your favorites'
                    /> :
                    <FlatList
                        data={this.props.favoritesList}
                        renderItem={({ item }) => <AssetItemTile asset={item} navigation={this.props.navigation} />}
                        keyExtractor={(item, _) => item.id}
                        ItemSeparatorComponent={() => <ListItemSeperator />}
                    />}
            </View>
        );
    }
}


const mapStateToProps = (state: { assetsList: any; }) => ({
    favoritesList: state.assetsList.assets.filter((e: any) => e.isFavorite)
});

export default connect(mapStateToProps)(FavoritesScreen);