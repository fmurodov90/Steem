import React , {Component} from 'react';
import {View, Text} from 'react-native';
import {Header, Title,Button,Right,Left ,Body} from 'native-base';
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
export  default class StatusScreen extends Component{
    render(){
        return(
            <View>
                <Header style={{backgroundColor:'#72c9ff'}}>
                    <Left/>
                    <Body>
                        <Title>Dashboard</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <FontAwesome
                                size={22}
                                name="refresh"
                                color="white"
                            />
                        </Button>
                    </Right>
                </Header>
                <Text>
                    Status Screen
                </Text>
            </View>
        )
    }
}