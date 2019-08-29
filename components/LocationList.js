import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export class LocationList extends React.Component {
    render() {
        const { location, index } = this.props;
        return (
            <View style={location.active ? styles.activeLocation : styles.location}>
                <View style={[styles.locationIndex, location.active ? {backgroundColor: '#8dbc2f'} : {backgroundColor: '#F1F4FA'}]}>
                    <Text style={[{ fontFamily: 'roboto-bold'}, location.active ? {color: '#607f21'} : {color: '#b8c5dd' }]}>{index + 1}</Text>
                </View>
                <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>{location.address}</Text>
                    <Text style={location.active ? styles.locationDescriptionActive : styles.locationDescription}>{location.brief}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    location: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginTop: 5
    },
    activeLocation: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.GREEN,
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginTop: 5,
        borderRadius: 10
    },
    locationName: {
        color: '#262626',
        fontFamily: 'roboto-semibold',
        fontSize: 16
    },
    locationDescription: {
        color: '#C1C1C1',
        fontFamily: 'roboto',
        fontSize: 12
    },
    locationDescriptionActive: {
        color: '#4f4f4f',
        fontFamily: 'roboto',
        fontSize: 12
    },
    locationIndex: {
        marginRight: 20,
        borderRadius: 5,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
});