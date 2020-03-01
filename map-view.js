import React from 'react';
import { StyleSheet, View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import GOOGLE from '../constants/Google'

const MyMapView = (props) => {
    let inputWidth = Dimensions.get('window').width - 48;
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            customMapStyle={GOOGLE.MapStyle}
            style={{ width: width, height: height }}
            initialRegion={props.region}
            region={props.region}
            onRegionChange={(reg) => props.onRegionChange(reg)}>
        </MapView>
    )
}

export default MyMapView;