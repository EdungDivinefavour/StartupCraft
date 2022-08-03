import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import style from './ListItemSeperator.style';

export default class ItemSeperator extends Component {
    render() {
        return (
            <View style={style.seperator} />
        );
    }
}