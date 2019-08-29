import * as React from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, Platform } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import assigment from '../services/Assignments';
import MapView, { PROVIDER_GOOGLE, ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import { getLocation } from '../services/location-service';
import GOOGLE from '../constants/Google';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
import Colors from '../constants/Colors';
import { LocationList } from '../components/LocationList';
import { TouchableOpacity } from 'react-native-gesture-handler';

let savedRegion;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 14.521837;
const LONGITUDE = -90.600022;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class NavigatorScreen extends React.Component {
    constructor(props) {
        super(props);
        this.mapView = null;
    }

    static navigationOptions = {
        header: null,
    };

    state = {
        region: {
            latitude: 0,
            longitude: 0,
        },
        coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        origin: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
        },
        destinationCoordinate: {
            latitude: 14.601988,
            longitude: -90.509842
        },
        item: {
            locations: [
                {
                    address: "Address 1",
                    brief: "This is a brief for address 1"
                },
                {
                    address: "Address 2",
                    brief: "This is a brief for address 2",
                    active: true,
                    cash: true
                },
                {
                    address: "Address 3",
                    brief: "This is a brief for address 3"
                }
            ]
        }
    };

    componentDidMount() {
        this.getInitialState();
        setInterval(() => {
            this.getInitialState();
        }, 15000);
    }

    fetchFollowingPoint() {

    }

    getInitialState() {
        getLocation().then(data => {
            this.updateState({
                latitude: data.latitude,
                longitude: data.longitude,
            });
            this.animate(data.latitude, data.longitude);
        });
    }

    updateState(location) {
        this.setState({
            region: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            origin: {
                latitude: location.latitude,
                longitude: location.longitude,
            }
        });
    }

    animate(newLat, newLong) {
        const { coordinate } = this.state;
        const newCoordinate = {
            latitude: newLat,
            longitude: newLong,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        };

        coordinate.timing(newCoordinate).start();
        this.mapView.animateToRegion(newCoordinate, 1000 * 2);
    }

    async _finishAdress() {

    }

    render() {
        let width = Dimensions.get('window').width;
        const height = 400;
        let { item } = this.state;
        let activeElement = item.locations.find((element) => { return element.active });
        return (
            <ScrollView style={[styles.container]}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={GOOGLE.MinimalMap}
                    style={{ width: width, height: height }}
                    region={{...this.state.region, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}
                    ref={c => this.mapView = c}>
                    <Marker.Animated
                        coordinate={this.state.region}
                        ref={marker => { this.marker = marker; }}>
                        <MaterialIcons name="person-pin-circle" size={44} color="#ffb600" />
                    </Marker.Animated>
                    <MapViewDirections
                        origin={this.state.origin}
                        destination={this.state.destinationCoordinate}
                        apikey={GOOGLE.apiKey}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={false}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log('Distance: ${result.distance} km')
                            console.log('Duration: ${result.duration} min.')

                            this.mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: (width / 20),
                                    bottom: (height / 20),
                                    left: (width / 20),
                                    top: (height / 20),
                                }
                            });
                        }}
                        onError={(errorMessage) => {
                            // console.log('GOT AN ERROR');
                        }}
                    />
                </MapView>
                <View style={styles.orderDetails}>
                    <Text style={{ fontWeight: 'bold', color: Colors.DARK, fontSize: 20 }}>Dirección: {activeElement.address}</Text>
                    <Text style={{ fontWeight: 'bold', color: Colors.DARK, fontSize: 14 }}>Pago en efectivo: {activeElement.cash ? 'Sí' : 'No'}</Text>
                    <View style={{ paddingTop: 20 }}>
                        {
                            item.locations.map((location, index) => (
                                <LocationList
                                    location={location}
                                    index={index}
                                    key={index}
                                />
                            ))
                        }
                    </View>
                    <TouchableOpacity
                        style={styles.completeButton}
                        onPress={() => this._finishAdress()}>
                        <Text style={{ color: '#f43535', fontWeight: 'bold' }}>FINALIZAR PUNTO</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        );
    }
}

NavigatorScreen.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    orderDetails: {
        paddingHorizontal: 24,
        paddingBottom: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#727272',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 15,
        backgroundColor: 'white',
        top: -50,
        paddingTop: 40,
        marginBottom: -50
    },
    completeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#f43535',
        padding: 10,
        height: 50,
        borderRadius: 5,
        alignSelf: 'stretch',
        zIndex: 10,
        fontFamily: 'roboto-bold',
        marginTop: 20
    }
});

