import React, {Component} from 'react';
import {View, Text, ScrollView, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {Header, Title, Button, Right, Left, Body, Form, Picker, Content} from 'native-base';
import FontAwesome from 'react-native-vector-icons/Ionicons'


export default class StatusScreen extends Component {
    state = {
        baseCurrency: "BTC",
        ratesCurrency: [],
        loading: false
    };

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        try {
            this.setState({
                loading:true
            })
            const data = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${this.state.baseCurrency}&tsyms=USD,JPY,EUR,GBP`);
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
            //const result = Object.keys(json).map(key => ({ key, value: json[key] }));
            console.log(result, typeof (result));
            this.setState({
                ratesCurrency: result,
                loading:false
            })
        } catch (e) {
           // console.log('Error occured while fetching data', e),
                alert(`Sorry couldn't connect to server, please check your internet connection `)
        }
    }
    onValueChange = val => {
        this.setState({
            baseCurrency: val,
            loading: true
        }, this.fetchData)

    }

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
                <View style={styles.baseCurrencyHeader}>
                    <Form style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Picker
                            note
                            mode="dropdown"
                            style={{width: 220, alignItems: 'center', justifyContent: 'center'}}
                            placeholder="Select currency"
                            textStyle={{color: 'blue'}}
                            itemTextStyle={{color: 'blue'}}
                            itemStyle={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#ddd'}}
                            selectedValue={this.state.baseCurrency}
                            onValueChange={(val) => this.onValueChange(val
                            )}
                        >
                            <Picker.Item label="BTC" value="BTC"/>
                            <Picker.Item label="ETH" value="ETH"/>
                            <Picker.Item label="DASH" value="DASH"/>
                            <Picker.Item label="NXT" value="NXT"/>
                            <Picker.Item label="ZEC" value="ZEC"/>
                        </Picker>
                    </Form>
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.ratesCurrency}
                        renderItem={({item}) => (
                            <View style={{
                                width: '100%',
                                borderWidth: 1,
                                borderColor: '#aaa',
                                height: 35,
                                paddingTop: 2,
                                flexDirection: 'row',
                                paddingHorizontal: 5
                            }}>
                                <Text style={{
                                    color: 'red',
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    width: '75%'
                                }}>{item.key}</Text>
                                <Text style={{
                                    color: 'blue',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    width: '25%'
                                }}> {item.value}</Text>

                            </View>
                        )}
                        keyExtractor={item => item.key}
                    />
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    baseCurrencyHeader: {backgroundColor: '#ddd',},
    baseCurrencyHeaderText: {fontSize: 24, color: 'blue', fontWeight: 'bold'},
    //  flatlist: {
    //      paddingVertical: 1,
    //      borderWidth: 1,
    //      borderColor: '#aaa',
    //      width: '100%',
    //      height: '20',
    //      flexDirection: 'row'
    //  },
    // flatlistKey: {color: 'red', fontSize: 20, fontWeight: 'bold'},

});