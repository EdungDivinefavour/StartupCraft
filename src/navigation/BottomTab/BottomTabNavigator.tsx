import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabScreens } from '../../types';
import { AssetsScreen } from '../../screens/AssetsScreen';
import { FavoritesScreen } from '../../screens/FavoritesScreen';
import Icon from 'react-native-vector-icons/Entypo';

const BottomTab = createBottomTabNavigator<BottomTabScreens>();

export default class BottomTabNavigator extends Component {
    render() {
        return (
            <BottomTab.Navigator screenOptions={{ headerShown: false }}>
                <BottomTab.Screen
                    name="Home"
                    component={AssetsScreen}
                    options={{
                        headerShown: true, title: 'Assets',
                        tabBarIcon: ({ size, color }) => (<Icon name="home" size={size} color={color} />),
                    }}
                />
                <BottomTab.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ size, color }) => (<Icon name="heart" size={size} color={color} />),
                    }}
                />
            </BottomTab.Navigator>
        );
    }
}