import React , {Component} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import {Header, Title,Right,Left ,Body} from 'native-base';
import {localNotification} from './../components/Notification/PushNotification';

export  default class SettingsScreen extends Component{
     handleOnPress = () => {
         localNotification("Farhod");
    };

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
                <TouchableOpacity
                    onPress={this.handleOnPress}
                >
                    <View style={{width:40, height:40, borderRadius:20}}><Text>Notification</Text></View>
                </TouchableOpacity>


                <Text>
                    Settings Screen
                </Text>
            </View>
        )
    }
}