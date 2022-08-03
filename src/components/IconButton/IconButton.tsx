import React, { Component } from 'react';
import { GestureResponderEvent, TouchableOpacity, View, } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

interface IProps {
    iconName: string,
    onPress?: (event: GestureResponderEvent) => void
}

export default class IconButton extends Component<IProps> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Icon name={this.props.iconName} size={30} />
            </TouchableOpacity>
        );
    }
}