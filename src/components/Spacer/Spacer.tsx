import React, { Component } from 'react';
import {
    View,
} from 'react-native';

interface IProps {
    height?: number
    width?: number
}

export default class Spacer extends Component<IProps> {
    render() {
        return (
            <View style={{ height: this.props.height, width: this.props.width }} />
        );
    }
}