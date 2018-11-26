import React , {Component} from 'react';
import {View,ActivityIndicator,ScrollView,FlatList,Text,AsyncStorage,ToastAndroid} from 'react-native';
import {Header, Title,Button,Right,Left ,Body} from 'native-base';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  * as dsteem  from 'dsteem';
import ItemView from './../components/WitnessScreenUI/ItemView';
import {createStackNavigator} from 'react-navigation';
import  WebScreen from './WebScreen';
import firebase from 'react-native-firebase';
import {
    saveSubscription,
    getSubscription,
    deleteSubscription,
    updateSubscription,
    getParticipation,
    updateParticipation
} from './../components/ConnectionToServer/serverConfig';
const fcmToken = null;
let subscribedWitnesses=null;

class WitnessesScreen extends Component{
    state={
        fetching:false,
        witnessList:[],
        subscribed:false
    };
    componentWillMount(){
        this.fetchWitnessList();
    }
    onSubscribe = async (deviceId,item)=>{
        console.log("OnSubscribe pushhed");
        await saveSubscription(deviceId,item.owner);
        this.fetchWitnessList();
        ToastAndroid.showWithGravityAndOffset(
            "You subscribed to "+item.owner+" witness",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            20,
            80,
        );
    };
    onDelete = async (deviceId,witness)=>{
        console.log("OnDelete pushhed");
        await deleteSubscription(deviceId,witness);
        this.fetchWitnessList();
        ToastAndroid.showWithGravityAndOffset(
            "You unsubscribed from  "+witness+" witness",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            20,
            80,
        );
    };

    fetchWitnessList = async () => {
        try {
            this.setState({
                fetching: true,
            });
            fcmToken = await AsyncStorage.getItem('fcmToken');
            if(fcmToken){
                subscribedWitnesses = await getSubscription(fcmToken);
                console.log("Subscribed witnessessss:",subscribedWitnesses);
            }
            getParticipation(fcmToken);
            const client = new dsteem.Client('https://api.steemit.com');
            const witnesses = await client.database.call('get_witnesses_by_vote', ["", 70]);
            this.setState({
                witnessList: witnesses,
                fetching: false
            })

        } catch (e) {
            console.log('Error',e)
        }
    };
    ifSubscribed = (witness)=> {
        let s=0;
        if(subscribedWitnesses){
            for (let i=0 ; i<subscribedWitnesses.length; i++){
                if(witness===subscribedWitnesses[i]){
                    s++;
                }
            }
        }
        return s > 0;
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
                <View style={{flexDirection:"row", height:15, width:"100%"}}>
                    <View style={{width:"70%",alignItems:"center", justifyContent:'center',backgroundColor:'#72c9ff'}}><Text>Witness</Text></View>
                    <View style={{width:"30%",alignItems:"center", justifyContent:'center',backgroundColor:'#72c9ff'}}><Text>Subscribe</Text></View>
                </View>
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
                                    subscribed={this.ifSubscribed(item.owner)}
                                    onClick={()=> this.props.navigation.navigate('Web', {"url":item.url})}
                                    onSubscribe={()=>this.onSubscribe(fcmToken,item)}
                                    onDelete = {()=>this.onDelete(fcmToken,item.owner)}
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
        Web: {
            screen: WebScreen,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);
