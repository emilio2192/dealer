import * as React from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, Alert, AsyncStorage } from 'react-native';
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
import { getDistance } from 'geolib';
import Endpoints from '../constants/Endpoints';
import { gateway } from '../services/gateway';

let savedRegion;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 14.521837;
const LONGITUDE = -90.600022;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = 0.003;
let globalInterval;
const FINISH_DISTANCE = 15;

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
        item: {}
    };

    async componentDidMount() {
        // const assignmentId = await AsyncStorage.getItem('assignment');
        const assignmentId = 'x_lTRmuZF';
        console.log('ID ASSIGNMENT' + assignmentId);
        const response = await gateway(Endpoints.GetAssignement(assignmentId), 'GET');
        console.log('RESPONSE' + response);
        let item = response.Assignments[0];
        item.locations[0].active = true;
        this.setState({ item });
        console.log('ITEM ' + this.state.item);
        /*this.getInitialState();
        globalInterval = setInterval(() => {
            this.getInitialState();
        }, 5000);*/
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
        const locations = this.state.item.locations;
        const actualPoint = this.state.item.locations.find((element) => { return element.active });
        const actualCoor = { latitude: actualPoint.lat, longitude: actualPoint.lng }
        if (getDistance(this.state.origin, actualCoor) <= FINISH_DISTANCE) {
            const index = locations.findIndex((element) => { return element.active });
            if (index !== locations.length - 1) {
                locations[index].active = false;
                locations[index + 1].active = true;
                this.setState({ item: { locations } });
            } else if (index === locations.length - 1) {
                clearInterval(globalInterval);
                this.props.navigation.navigate('Main');
            }
        } else {
            Alert.alert(
                'Distancia requerida',
                `Sólo puedes finalizar un punto, cuando estés a ${FINISH_DISTANCE} metros de dicho punto.`,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        }
    }

    render() {
        let width = Dimensions.get('window').width;
        const height = 400;
        let { item } = this.state;
        let activeElement = item.locations && item.locations.find((element) => { return element.active });
        return (
            <ScrollView style={[styles.container]}>
                {item.locations && <MapView
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={GOOGLE.MinimalMap}
                    style={{ width: width, height: height }}
                    region={{...this.state.region, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}
                    ref={c => this.mapView = c}>
                    <Marker.Animated
                        coordinate={this.state.origin}
                        ref={marker => { this.marker = marker; }}>
                        <MaterialIcons name="person-pin-circle" size={44} color={Colors.YELLOW} />
                    </Marker.Animated>
                    <Marker
                        coordinate={{latitude: activeElement.lat, longitude: activeElement.lng}}>
                        <MaterialIcons name="location-on" size={44} color={Colors.YELLOW} />
                    </Marker>
                    <MapViewDirections
                        origin={this.state.origin}
                        destination={{latitude: activeElement.lat, longitude: activeElement.lng}}
                        apikey={GOOGLE.apiKey}
                        strokeWidth={4}
                        strokeColor={Colors.CIAN}
                        optimizeWaypoints={true}
                    />
                </MapView>}
                {item.locations && <View style={styles.orderDetails}>
                    <Text style={{ fontWeight: 'bold', color: Colors.DARK, fontSize: 20 }}>Dirección: {activeElement.address}</Text>
                    <Text style={{ fontWeight: 'bold', color: Colors.DARK, fontSize: 14 }}>Pago en efectivo: {activeElement.servicePayment ? 'Sí' : 'No'}</Text>
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
                </View>}
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

