import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTab';
import { AssetScreen } from '../screens/AssetScreen';
import { NavigationContainer } from '@react-navigation/native';
import { RootScreens } from '../types';

const RootStack = createNativeStackNavigator<RootScreens>();

export default class RootNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <RootStack.Navigator>
                    <RootStack.Screen
                        name="BottomTabs"
                        component={BottomTabNavigator}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name="Asset"
                        component={AssetScreen}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        );
    }
}