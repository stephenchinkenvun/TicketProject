import React, { Component } from 'react';
import { Alert, Image, StyleSheet, ScrollView, View } from 'react-native';
import { InputWithLabel } from '../UI';
import { FloatingAction } from 'react-native-floating-action';

const actions = [
    {
        text: 'Delete',
        color: '#c80000',
        name: 'delete',
        position: 1,
    },
];

let config = require('../Config');
let common = require('./CommonData');

type Props = {};
export default class ShowScreen extends Component<Props> {
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
        this._delete = this._delete.bind(this);
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

    _delete() {
        Alert.alert(
            'Confirm Deletion',
            'Delete `' + this.state.bus.departure + '`?',
            [
                {
                    text: 'No',
                    onPress: () => { },
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        let url =
                            config.settings.serverPath + '/api/bus/' + this.state.id;

                        fetch(url, {
                            method: 'DELETE',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: this.state.id,
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
                                if (responseJson.affected == 0) {
                                    Alert.alert('Error deleting record');
                                }

                                this.props.navigation.getParam('refresh')();
                                this.props.navigation.goBack();
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    },
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        let bus = this.state.bus;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <InputWithLabel
                        style={styles.output}
                        label={'From'}
                        value={bus ? common.getValue(common.departures, bus.departure) : ''}
                        orientation={'vertical'}
                        editable={false}
                    />
                    <InputWithLabel
                        style={styles.output}
                        label={'To'}
                        value={bus ? common.getValue(common.arrivals, bus.arrival) : ''}
                        orientation={'vertical'}
                        editable={false}
                    />
                    <InputWithLabel
                        style={styles.output}
                        label={'Choose a Time'}
                        value={bus ? common.getValue(common.departureTime, bus.departureTime) : ''}
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
