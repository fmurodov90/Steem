import React , {Component} from 'react';
import {View, Text,ActivityIndicator,ScrollView,FlatList} from 'react-native';
import {Header, Title,Button,Right,Left ,Body} from 'native-base';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  * as dsteem  from 'dsteem';
export  default class WitnessesScreen extends Component{
    state={
        fetching:false,
        witnessList:[]
    };
    componentDidMount(){
        this.fetchWitnessList()
    }

    fetchWitnessList = async () => {
        try {
            this.setState({
                fetching: true
            })
            const client = new dsteem.Client('https://api.steemit.com');
            const witnesses = await client.database.call('get_witnesses_by_vote', ["", 100]);
            console.log('Witnesses=', witnesses);
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
            <View>
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
                <View style={{backgroundColor:'#eee', flexDirection:'row', width:'100%', height:30}}>
                    <View style={{width:'30%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:12, color:'blue'}} > Owner</Text></View>
                    <View style={{width:'35%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:12, color:'blue'}} > Sbd exchange rate</Text></View>
                    <View style={{width:'35%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:12, color:'blue'}} >Account creation fee</Text></View>
                </View>
                { this.state.witnessList &&
                    <ScrollView>
                        <FlatList
                            data={this.state.witnessList}
                            renderItem={({item}) => (
                                <View  style={{borderWidth:1,paddingVertical:2 ,flexDirection:'row', width:'100%', height:35}}>
                                    <View style={{width:'30%', alignItems:'center', justifyContent:'center'}}>
                                        <Text style={{fontSize:12, color:'red'}}>{item.owner}</Text>
                                    </View>
                                    <View style={{width:'35%', alignItems:'center', justifyContent:'center'}}>
                                        <Text style={{fontSize:12, color:'red'}}>{item.sbd_exchange_rate.base}</Text>
                                    </View>
                                    <View style={{width:'35%', alignItems:'center', justifyContent:'center'}}>
                                        <Text style={{fontSize:12, color:'red'}}>{item.props.account_creation_fee}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.owner}

                        />
                    </ScrollView>
                }
            </View>
        )
    }
}