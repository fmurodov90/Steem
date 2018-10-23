import React , {Component} from 'react';
import {View,ActivityIndicator,ScrollView,FlatList} from 'react-native';
import {Header, Title,Button,Right,Left ,Body} from 'native-base';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  * as dsteem  from 'dsteem';
import ItemView from './../components/WitnessScreenUI/ItemView';
import {createStackNavigator} from 'react-navigation';
import  WebScreen from './WebScreen';


class WitnessesScreen extends Component{
    state={
        fetching:false,
        witnessList:[]
    };
    componentWillMount(){
        this.fetchWitnessList()
    }

    fetchWitnessList = async () => {
        try {
            this.setState({
                fetching: true
            })
            const client = new dsteem.Client('https://api.steemit.com');
            const witnesses = await client.database.call('get_witnesses_by_vote', ["", 70]);
           // console.log('Witnesses=', witnesses);
            this.setState({
                witnessList: witnesses,
                fetching: false
            })
        } catch (e) {
            alert(e)
        }
    };
    render(){
        return(
            <View style={{paddingBottom:60}}>
                <Header style={{backgroundColor:'#72c9ff'}}>
                    <Left/>
                    <Body>
                        <Title>Witnesses</Title>
                    </Body>
                    <Right>
                        <ActivityIndicator
                            size="large"
                            color="red"
                            animating={this.state.fetching}
                        />
                        <Button
                            transparent
                            onPress={this.fetchWitnessList}
                        >
                            <FontAwesome
                                size={22}
                                name="refresh"
                                color="white"
                            />
                        </Button>
                    </Right>
                </Header>
                { this.state.witnessList &&
                    <ScrollView style={{paddingBottom:30}}>
                        <FlatList
                            data={this.state.witnessList}
                            renderItem={({item,index}) => (
                                <ItemView
                                    first={item.owner.toUpperCase()}
                                    second={item.owner}
                                    third={item.sbd_exchange_rate.base}
                                    fourth={item.last_sbd_exchange_update}
                                    fifth={item.votes}
                                    sixth={item.running_version}
                                    seventh={item.total_missed}
                                    eight={item.url}
                                    nine={index+1}
                                    onClick={()=> this.props.navigation.navigate('Details', {"url":item.url})}
                                />
                            )}
                            keyExtractor={item => item.owner}

                        />
                    </ScrollView>
                }
            </View>
        )
    }
}

export  default createStackNavigator(
    {
        Home: {
            screen: WitnessesScreen,
        },
        Details: {
            screen: WebScreen,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);
