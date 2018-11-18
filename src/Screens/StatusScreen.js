import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet,AsyncStorage} from 'react-native';
import {Header, Title, Button, Right, Left, Body} from 'native-base';
import FontAwesome from 'react-native-vector-icons/Ionicons'
import  * as dsteem  from 'dsteem';
import MySepView from '../components/SeparotorView'
import {notificationListener, notificationOpenedListener} from '../components/Firebase/fbConfig';
import MyView from '../components/MyView';

const url="https://api.steemit.com";
const client = new dsteem.Client(url);
export default class StatusScreen extends Component {
    state = {
        CurrencyInfo: null,
        source:[],
        opacity: 0
    };

    componentWillMount() {
        setInterval(()=> this.fetchData(),3000);
    }
    // componentDidMount(){
    //     setInterval(()=> this.fetchData(),6000);
    // }
    componentWillUnmount() {
        notificationListener();
        notificationOpenedListener();
        clearInterval();
    }
    fetchData = async () => {
        try {
            this.setState({
                opacity:1
            });
            const data1 = await client.database.getDynamicGlobalProperties();
            const data = await fetch(`http://api.esteem.ws:8080/api/market-data/`);
            const json = await data.json();
            console.log("data:" , json);
            this.setState({
                CurrencyInfo: json,
                opacity:0,
                source:data1
            });
        }
        catch (e) {
            console.log('Error occured while fetching data', e)
                //alert(`Sorry couldn't connect to server, please check your internet connection `)
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
                    <Right style={{alignItems:"center", justifyContent:'flex-end'}}>
                        <ActivityIndicator
                            size = {35}
                            color = "red"
                            animating = {this.state.true}
                            style={{height: 80, marginTop: 10, opacity: this.state.opacity }}
                        />
                        <Button transparent
                                onPress={() => this.fetchData()}
                        >
                            <FontAwesome
                                size={28}
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
                    <View style={{borderWidth: 1, backgroundColor: '#BBB', marginVertical: 20}}>
                    </View>
                    {
                        this.state.CurrencyInfo && (
                            <MyView
                                sbd_usd_price={this.state.CurrencyInfo.sbd.quotes.usd.price}
                                sbd_usd_change={this.state.CurrencyInfo.sbd.quotes.usd.percent_change}
                                sbd_usd_update={this.state.CurrencyInfo.sbd.quotes.usd.last_updated}
                                sbd_btc_price={this.state.CurrencyInfo.sbd.quotes.btc.price}
                                sbd_btc_change={this.state.CurrencyInfo.sbd.quotes.btc.percent_change}
                                sbd_btc_update={this.state.CurrencyInfo.sbd.quotes.btc.last_updated}
                                steem_usd_price={this.state.CurrencyInfo.steem.quotes.usd.price}
                                steem_usd_change={this.state.CurrencyInfo.steem.quotes.usd.percent_change}
                                steem_usd_update={this.state.CurrencyInfo.steem.quotes.usd.last_updated}
                                steem_btc_price={this.state.CurrencyInfo.steem.quotes.btc.price}
                                steem_btc_change={this.state.CurrencyInfo.steem.quotes.btc.percent_change}
                                steem_btc_update={this.state.CurrencyInfo.steem.quotes.btc.last_updated}
                            />
                        )
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