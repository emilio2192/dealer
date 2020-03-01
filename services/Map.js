import React from 'react';
import {StyleSheet, View, TextInput, Dimensions, Image, TouchableOpacity} from 'react-native';
import {Permissions, Location, Text} from 'expo';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Autocomplete from '../../components/map-input';
import {getLocation} from '../../services/location-service';

export class MapAssign extends React.Component {

    state = {
        region: {},
    };

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState() {
        getLocation().then(data => {
            this.updateState({
                latitude: data.latitude,
                longitude: data.longitude,
            });
        });
    }

    updateState(location) {
        this.setState({
            region: {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            },
        });
    }

    getCoordsFromName(loc) {
        this.updateState({
            latitude: loc.lat,
            longitude: loc.lng,
        });
    }

    onMapRegionChange(region) {
        this.setState({region});
    }

    onPress = () => {
        console.log(this.state.currentRegion);
    }

    render() {
        const mapStyle = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "color": "#8d8d8d"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#acd99e"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e4e4e4"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ];
        let inputWidth = Dimensions.get('window').width - 48;
        let width = Dimensions.get('window').width;
        let height = Dimensions.get('window').height;
        return (
            <View style={[styles.container]}>
                <View style={[styles.searchContainer, {width: inputWidth}]}>
                    {/*  <Autocomplete />*/}
                    <TextInput
                        style={[styles.searchInput]}
                        onChangeText={(text) => this.setState({search: text})}
                        value={this.state.text}
                        underlineColorAndroid={'transparent'}
                        placeholder="¿Qué lugar quieres buscar?"
                    />
                    <EvilIcons name="search" size={18} color="#151515"/>
                </View>
                <Image
                    source={require('../../assets/images/marker.png')}
                    style={[styles.marker, {top: (height / 2) - 20}]}
                />
                <MapView/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPress}>
                    <Ionicons name="ios-checkmark" color="white" size={36}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchContainer: {
        position: 'absolute',
        top: 100,
        alignSelf: 'center',
        height: 50,
        backgroundColor: 'white',
        zIndex: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#d6d6d6',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    searchInput: {
        color: '#151515',
        height: 50,
        flex: 1,
        marginRight: 30
    },
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 75,
    },
    marker: {
        zIndex: 9,
        top: 20,
        position: 'absolute',
        alignSelf: 'center',
        width: 65,
        height: 65,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
        shadowColor: '#F9B232',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#98CC33',
        padding: 10,
        width: 65,
        height: 65,
        borderRadius: 50,
        shadowColor: '#98CC33',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
});
