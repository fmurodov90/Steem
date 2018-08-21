import React , {Component} from 'react';
import {View, Text} from 'react-native';
import {Header, Title,Button,Right,Left ,Body} from 'native-base';

export  default class SettingsScreen extends Component{
    render(){
        return(
            <View>
                <Header style={{backgroundColor:'#72c9ff'}}>
                    <Left/>
                    <Body>
                    <Title>Settings</Title>
                    </Body>
                    <Right/>
                </Header>
                <Text>
                    Settings Screen
                </Text>
            </View>
        )
    }
}