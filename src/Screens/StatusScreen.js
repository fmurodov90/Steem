import React, {Component} from 'react';
import {View, Text, ScrollView, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {Header, Title, Button, Right, Left, Body, Form, Picker} from 'native-base';
import FontAwesome from 'react-native-vector-icons/Ionicons'
import  * as dsteem  from 'dsteem';
import MyText from '../components/MyText';
import MySepView from '../components/SeparotorView'

const url="https://gtg.steem.house:8090";
const client = new dsteem.Client(url);
export default class StatusScreen extends Component {
    state = {
        baseCurrency: "STEEM",
        ratesCurrency: [],
        source:[],
        loading: false
    };

    componentWillMount() {
        setInterval( ()=> this.fetchData(),3000);
    }
    fetchData = async () => {
        try {
            this.setState({
                loading:true
            });
            const data1 = await client.database.getDynamicGlobalProperties();
            const data = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${this.state.baseCurrency}&tsyms=USD,BTC,EUR`);
            const json = await data.json();
            let result = [];
            for (let key in json) {
                if (json.hasOwnProperty(key)) {
                    result.push({
                        key: key,
                        value: json[key]
                    });
                }
            }
            this.setState({
                ratesCurrency: result,
                loading:false,
                source:data1
            })
        } catch (e) {
           // console.log('Error occured while fetching data', e),
                alert(`Sorry couldn't connect to server, please check your internet connection `)
        }
    };

    render() {
        return (
            <View>
                <Header style={{backgroundColor: '#72c9ff'}}>
                    <Left/>
                    <Body>
                    <Title>Dashboard</Title>
                    </Body>
                    <Right>
                        <ActivityIndicator
                            size="large"
                            color="red"
                            animating={this.state.loading}
                        />
                        <Button transparent
                                onPress={this.fetchData}
                        >
                            <FontAwesome
                                size={22}
                                name="md-refresh"
                                color="white"
                            />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.content}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome to Steem Monitor</Text>
                    </View>
                    <MySepView
                        first={"Block:"}
                        second={this.state.source.head_block_number}
                    />
                    <MySepView
                        first={"Time:"}
                        second={this.state.source.time}
                    />
                    <MySepView
                        first={"Witness:"}
                        second={this.state.source.current_witness}
                    />
                    <MySepView
                        first={"Steem Supply:"}
                        second={this.state.source.current_supply}
                    />
                    <MySepView
                        first={"SBD Supply:"}
                        second={this.state.source.current_sbd_supply}
                    />
                    <View style={{borderWidth:1, backgroundColor:'#BBB', marginVertical:20}}></View>
                    {
                        this.state.ratesCurrency.map((item, index) => (
                            <MySepView
                                key={index}
                                first = {"Price "+item.key+":"}
                                second ={item.value}
                            />
                        ))
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    welcomeContainer:{alignItems:'center', justifyContent:'center'},
    welcomeText: {fontSize: 20, color: 'blue', fontWeight: 'bold'},
    content:{paddingHorizontal:20, paddingVertical:5},
});