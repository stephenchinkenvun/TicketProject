import React, { Component } from 'react';
import { Alert, StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { InputWithLabel, PickerWithLabel, AppButton } from '../UI';
import CalendarPicker from 'react-native-calendar-picker';

let config = require('../Config');
let common = require('./CommonData');

type Props = {};
export default class HomeScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);

    this.state = {
      price: '',
      departure: '',
      arrival: '',
      departureTime: '',
      arrivalTime: '',
      day: '',
      date: '',
    };

    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);

    this._store = this._store.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  search(){
    
  }
  _store() {
    let url = config.settings.serverPath + '/api/bus';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: this.state.price,
        departure: this.state.departure,
        arrival: this.state.arrival,
        departureTime: this.state.departureTime,
        arrivalTime: this.state.arrivalTime,
        day: this.state.day,
        date: this.state.date,
      }),
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(responseJson => {
        if (responseJson.affected > 0) {
          Alert.alert(
            'Record Saved',
            'Record for `' + this.state.departure + 'to ' + this.state.arrival + '` has been saved',
          );
        } else {
          Alert.alert('Error saving record');
        }

        this.props.navigation.getParam('refresh')();
        this.props.navigation.navigate('Show');
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() :
      ''; 
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}> Bus Ticket Booking</Text>

        <PickerWithLabel
          style={styles.picker}
          label={'From'}
          items={common.departures}
          mode={'dialog'}
          value={this.state.departure}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ departure: itemValue });
          }}
          
          orientation={'vertical'}
          textStyle={{ fontSize: 24 }}
        />
        <PickerWithLabel
          style={styles.picker}
          label={'To'}
          items={common.arrivals}
          mode={'dialog'}
          value={this.state.arrival}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ arrival: itemValue });
          }}
          orientation={'vertical'}
          textStyle={{ fontSize: 24 }}
        />
        <PickerWithLabel
          style={styles.picker}
          label={'Choose a time'}
          items={common.departureTime}
          mode={'dialog'}
          value={this.state.departureTime}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ departureTime: itemValue });
          }}
          orientation={'vertical'}
          textStyle={{ fontSize: 24 }}
        />
        <Text style={styles.text}>Choose a date</Text>
        <View style={styles.container}>
          <CalendarPicker
            onDateChange={this.onDateChange}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ date: itemValue });
            }}
          />
        </View>
        <AppButton
          style={styles.button}
          title={'Book'}
          theme={'primary'}
          onPress={this._store}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
  },

  picker: {
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 150,
  },
});
