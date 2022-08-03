import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from './ErrorMessage.style';

interface IProps {
    text: string
}

export default class ErrorMessage extends Component<IProps> {
    render() {
        return (
            <Text style={styles.text}>{this.props.text}</Text>
        );
    }
}
