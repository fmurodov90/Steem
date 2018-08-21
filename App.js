import React,{Component} from 'react';
import {StyleSheet} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation';
import  StatusScreen from './src/Screens/StatusScreen';
import  WitnessesScreen from './src/Screens/WitnessesScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default createBottomTabNavigator(
    {
        Status: StatusScreen,
        Witnesses: WitnessesScreen,
        Settings: SettingsScreen
    },
    {
        navigationOptions:({navigation }) => ({
            tabBarIcon:({focused , tintColor})=> {
                const { routeName } = navigation.state;
                if (routeName === 'Settings'){
                    return <Ionicons name='md-settings' size={20} color={tintColor} />;
                } else if ( routeName === 'Witnesses') {
                    return <Ionicons name='ios-pulse' size={20} color={tintColor}/>
                } else if ( routeName === 'Status') {
                    return <Ionicons name='logo-bitcoin' size={20} color={tintColor}/>
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'white',
            style:{backgroundColor:'#72c9ff'},
            labelStyle:{fontSize:14}
        },
    }
);

