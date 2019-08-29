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

let savedRegion;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 14.6108992;
const LONGITUDE = -90.51908639999999;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class NavigatorScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
    };

    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0
        },
        coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        destinationCoordinate: {
            latitude: 14.521837,
            longitude: -90.600022
        }
    };

    componentDidMount() {
        this.getInitialState();
        setInterval(() => {
            this.getInitialState();
        }, 8000);
    }

    fetchFollowingPoint() {

    }

    getInitialState() {
        console.log("Getting user location");
        getLocation().then(data => {
            this.updateState({
                latitude: data.latitude,
                longitude: data.longitude,
            });
            this.animate(data.latitude, data.longitude);
        });
    }

    updateState(location) {
        savedRegion = {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
        }
        this.setState({
            region: savedRegion,
        });
    }

    onRegionChange(region) {
        savedRegion = region;
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
    }

    render() {
        let width = Dimensions.get('window').width;
        let height = 300;
        return (
            <ScrollView style={[styles.container]}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={GOOGLE.MapStyle}
                    style={{ width: width, height: height }}
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    region={this.state.region}
                    onRegionChange={(reg) => this.onRegionChange(reg)}
                    ref={c => this.mapView = c}>
                    <Marker.Animated
                        coordinate={this.state.coordinate}
                        ref={marker => { this.marker = marker; }}>
                        <MaterialIcons name="person-pin-circle" size={44} color="#ffb600" />
                    </Marker.Animated>
                    <MapViewDirections
                        origin={this.state.coorditane}
                        destination={this.state.destinationCoordinate}
                        apikey={GOOGLE.apiKey}
                        strokeWidth={3}
                        strokeColor={Colors.CIAN}
                        onReady={async result => { console.log(result); }}
                    />
                </MapView>
                <View style={styles.orderDetails}>
                    <Text>Siguiente punto: </Text>
                    <Text>Detalle</Text>
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
});

