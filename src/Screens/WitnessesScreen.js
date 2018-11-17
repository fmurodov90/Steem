import React , {Component} from 'react';
import {View,ActivityIndicator,ScrollView,FlatList,Text} from 'react-native';
import {Header, Title,Button,Right,Left ,Body} from 'native-base';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  * as dsteem  from 'dsteem';
import ItemView from './../components/WitnessScreenUI/ItemView';
import {createStackNavigator} from 'react-navigation';
import  WebScreen from './WebScreen';
import {localNotification} from './../components/Notification/PushNotification';
import DeviceInfo from 'react-native-device-info';


const senderid="193745023103";
const deviceId = DeviceInfo.getUniqueID();
const serverApiKey="AAAALRwacH8:APA91bHXOYGY1U8p7ldD_yUX1HI9cIA0mvd3FMOfDRIZ_QybfaX85b9AI4cHQOP8gMBLzONCbkgXmRfRizlNn4soJDbsbDftJ5cG0Bs5TDD088a_Uj4_Rh_Wk3P4NVsGY8g1uGIdSU77";
const saveSubscription = async (deviceid,witness)=> {
   return await fetch("http://api.esteem.ws:8080/api/wdevices", {
        method: 'POST',
        body: JSON.stringify({
            deviceid: deviceid,
            witness: witness,
        }),
    }).then((response)=>response.json())
       .catch((error)=>console.error("error on subscription",error));
   //return $http.post("http://api.esteem.ws:8080/api/wdevices",{deviceid:deviceid,witness:witness})
};
const updateSubscription=(deviceid,witness,del)=>{
    if(!del){
        return $http.put("http://api.esteem.ws:8080/api/wdevices",{deviceid:deviceid,witness:witness})
    }else {
        return $http.put("http://api.esteem.ws:8080/api/wdevices",{deviceid:deviceid,witness:witness,delete:true})
    }
};
const updateParticipation=(deviceid,status)=>{
    return $http.post("http://api.esteem.ws:8080/api/wdevicesp",{deviceid:deviceid,participation:status})
};
const getParticipation=(deviceid)=>{
    return $http.get("http://api.esteem.ws:8080/api/wdevicesp/"+deviceid)
};
const deleteSubscription=(deviceid,witness)=>{
    return $http.delete("http://api.esteem.ws:8080/api/wdevices/"+deviceid+"/"+witness)
};

const getSubscription = async (deviceid)=>{
    let response = await fetch("http://api.esteem.ws:8080/api/wdevices/"+deviceid)
    let responseJson = await response.json();
    console.log(responseJson);
        // .catch((error) => {
        //     console.error(error);
        // });

    //return $http.get("http://api.esteem.ws:8080/api/wdevices/"+deviceid)
};
class WitnessesScreen extends Component{
    state={
        fetching:false,
        witnessList:[]
    };
    componentWillMount(){
        this.fetchWitnessList()
    }

    onSubscribe =(witness,deviceid)=>{
        localNotification(witness,deviceid);
        saveSubscription(deviceid,witness);
       // console.log(getSubscription(deviceid));
    };

    fetchWitnessList = async () => {
        try {
            this.setState({
                fetching: true
            })
            const client = new dsteem.Client('https://api.steemit.com');
            const witnesses = await client.database.call('get_witnesses_by_vote', ["", 70]);
           //console.log('Witnesses=', witnesses);
            this.setState({
                witnessList: witnesses,
                fetching: false
            })
        } catch (e) {
            console.log('Error',e)
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
                            // onPress={this.fetchWitnessList}
                            onPress={()=>getSubscription(deviceId)}
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
                                    onClick={()=> this.props.navigation.navigate('Web', {"url":item.url})}
                                    onSubscribe={()=>this.onSubscribe(item.owner,deviceId)}
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
