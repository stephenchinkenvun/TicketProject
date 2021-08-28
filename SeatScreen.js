import React, { Component } from 'react';
import { Alert, Image, StyleSheet, ScrollView, View } from 'react-native';
import { InputWithLabel } from './UI';

let config = require('./Config');

type Props = {};
export default class SeatScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('headerTitle'),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.navigation.getParam('id'),
      bus: null,
    };

    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
  }

  _load() {
    let url = config.settings.serverPath + '/api/bus/' + this.state.id;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(bus => {
        this.setState({ bus });
      })
      .catch(error => {
        console.error(error);
      });
  }



  render() {
    let bus = this.state.bus;

    return (
      <View style={styles.container}>
        <ScrollView>
          <InputWithLabel
            style={styles.output}
            label={'Price'}
            value={bus ? bus.price : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            style={styles.output}
            label={'Departure'}
            value={bus ? bus.departure : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            style={styles.output}
            label={'Arrival'}
            value={bus ? bus.arrival : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            style={styles.output}
            label={'DepartureTime'}
            value={bus ? bus.departureTime : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            style={styles.output}
            label={'ArrivalTime'}
            value={bus ? bus.arrivalTime : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            style={styles.output}
            label={'Day'}
            value={bus ? bus.day : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            style={styles.output}
            label={'Date'}
            value={bus ? bus.date : ''}
            orientation={'vertical'}
            editable={false}
          />
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  output: {
    fontSize: 24,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
});
