import React , {Component} from 'react';
import {View, Text,ScrollView, ActivityIndicator} from 'react-native';
import {Header, Title,Button,Right,Left ,Body} from 'native-base';
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
const api_key='01484027a8b0d51b62199785a1bb1204';

export  default class StatusScreen extends Component{
    state={
        baseCurrency:'',
        ratesCurrency:[],
        loading:false
    }
    fetchData = async () => {
        try {
            const data =  await fetch('http://data.fixer.io/api/latest?access_key=01484027a8b0d51b62199785a1bb1204&symbols=USD,RUB,UZS,GBP,BTC,AUD,CAD,PLN,MXN&format=1');
            const json= await data.json();
            this.setState({
                baseCurrency: json.base,
                ratesCurrency:json.rates
            });
            console.log('Base', this.state.baseCurrency);
            console.log('Rates',this.state.ratesCurrency);
        } catch (e) {
            console.log('Error occured while fetching data', e)
        }
    }
    render(){
        return(
            <View>
                <Header style={{backgroundColor:'#72c9ff'}}>
                    <Left/>
                    <Body>
                        <Title>Dashboard</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={this.fetchData}
                        >
                            <FontAwesome
                                size={22}
                                name="refresh"
                                color="white"
                            />
                        </Button>
                    </Right>
                </Header>
                <View>
                    <Text>
                        {this.state.baseCurrency}
                    </Text>
                </View>
                <ScrollView>
                    {
                        // this.state.ratesCurrency &&
                        //     this.state.ratesCurrency.map(( item , index) => (
                        //         <View key={index}>
                        //             <Text>{item}</Text>
                        //         </View>
                        //     ))
                    }
                </ScrollView>
            </View>
        )
    }
}