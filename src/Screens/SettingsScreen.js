import React, {Component} from 'react';
import {View, Text, Switch, AsyncStorage} from 'react-native';
import {Header, Title, Right, Left, Body} from 'native-base';

import {updateParticipation,getParticipation} from "../components/ConnectionToServer/serverConfig";

let fcmtoken=null;
export default class SettingsScreen extends Component {
    state = {
        value: false
    };

    handleOnToggle = async (value) => {
        //localNotification("Farhod");
        this.setState({
            value: !this.state.value
        });
        if(fcmtoken){
            await updateParticipation(fcmtoken,value);
            await getParticipation(fcmtoken);
        }

    };
    componentWillMount(){
        this.getToken();
    }
    getToken = async () => {
        fcmtoken = await AsyncStorage.getItem('fcmToken');
    };
    render() {
        return (
            <View>
                <Header style={{backgroundColor: '#72c9ff'}}>
                    <Left/>
                    <Body>
                    <Title>Settings</Title>
                    </Body>
                    <Right/>
                </Header>

                <View style={{flexDirection: 'row',width:"100%"}}>
                    <View style={{width:"70%"}}>
                        <Text>
                            Participation alert under 75%
                        </Text>
                    </View>
                    <View style={{width:"30%"}}>
                        <Switch
                            onValueChange={this.handleOnToggle}
                            value={this.state.value}
                        />
                    </View>
                </View>
            </View>
        )
    }
}