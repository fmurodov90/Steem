import React, {Component} from 'react';
import {View, Text, Switch} from 'react-native';
import {Header, Title, Right, Left, Body} from 'native-base';
import {localNotification} from './../components/Notification/PushNotification';

export default class SettingsScreen extends Component {
    state = {
        value: false
    };
    handleOnToggle = (value) => {
        //localNotification("Farhod");
        this.setState({
            value: !this.state.value
        })
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

                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text>
                            Participation alert under 75%
                        </Text>
                    </View>
                    <View>
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