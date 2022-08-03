import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Asset } from '../../models';
import { IconButton } from '../IconButton';
import { Spacer } from '../Spacer';
import styles from './AssetItemTile.style';

interface IProps {
    asset: Asset
    navigation: any
}

export default class AssetItemTile extends Component<IProps> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.openDetails()}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>{this.props.asset.name}</Text>
                        <Spacer height={10}></Spacer>
                        <Text style={styles.price}>{this.props.asset.price + " USD"}</Text>
                    </View>
                    {this.props.asset.isFavorite ? (<IconButton iconName="heart"></IconButton>) : null}
                </View>
            </TouchableOpacity>
        );
    }

    openDetails(): void {
        this.props.navigation.navigate('Asset', { assetId: this.props.asset.id })
    }
}