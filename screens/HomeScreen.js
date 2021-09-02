import React, { Component } from 'react';
import { Alert, StyleSheet, ScrollView, View, Text, Button, DatePickerAndroid,TouchableHighlight } from 'react-native';
import { InputWithLabel, PickerWithLabel, AppButton } from '../UI';

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
      date: 0,
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

  openDatePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.state.date,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2099, 11, 31),
        mode: 'calendar',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let selectedDate = new Date(year, month, day);
        let selectedDatesec = selectedDate.getTime();
        this.setState({
          date : selectedDatesec,
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
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
            'Record has been saved',
            [
              {
                onPress:() => navigation.navigate('Ticket'),
              },
            ],
          );
        } else {
          Alert.alert('Error saving record');
        }


        //this.props.navigation.getParam('refresh')();
        //this.props.navigation.goback();
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {

      let date=this.state.date;
      var dateday = new Date(date).getDate();
      var month = new Date(date).getMonth() ;
      var year = new Date(date).getFullYear();
      var day = new Date(date).getDay();
      var daysText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var monthsText = [
        'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep', 'Oct','Nov','Dec',];
      var dayName = daysText[day];
      var monthName = monthsText[month];
      var newdate = dayName + ', ' + dateday + ' ' + monthName + ', ' + year;
  
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

        <TouchableHighlight
        underlayColor={'#cccccc'}
          onPress={ this.openDatePicker }>
          <View style={styles.container}>
            <InputWithLabel
              style={styles.input}
              label={'Choose a Date'}
              value={newdate}
              editable={false}
              onChangeText={(date) => {
                this.setState({date: itemvalue});
            }}
            />
          </View></TouchableHighlight>
          <PickerWithLabel
          style={styles.picker}
          label={'Choose a Class'}
          items={common.price}
          mode={'dialog'}
          value={this.state.price}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ price: itemValue });
          }}
          orientation={'vertical'}
          textStyle={{ fontSize: 24 }}
        />
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
