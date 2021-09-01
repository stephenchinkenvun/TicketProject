import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';


let config = require('../Config');

type Props = {};
export default class ShowTicketScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Bus',
  };

  constructor(props) {
    super(props);

    this.state = {
      bus: [],
      isFetching: false,
    };

    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
  }

  _load() {
    let url = config.settings.serverPath + '/api/bus';

    this.setState({ isFetching: true });

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
        this.setState({ isFetching: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.bus}
          showsVerticalScrollIndicator={true}
          refreshing={this.state.isFetching}
          onRefresh={this._load}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor={'#cccccc'}
              onPress={() => {
                this.props.navigation.navigate('Show', {
                  id: item.id,
                  headerTitle: item.id,
                  refresh: this._load,
                });
              }}>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.departure}</Text>
                <Text style={styles.itemSubtitle}>...</Text>
                <Text style={styles.itemTitle}>{item.arrival}</Text>
                <Text style={styles.itemSubtitle}>{item.departureTime}                              -                         {item.arrivalTime}</Text>
                <Text style={styles.itemSubtitle}>{item.date}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => {
            item.id.toString();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },

  item: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },

  itemSubtitle: {
    fontSize: 18,
  },
});
