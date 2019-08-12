import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constants/Colors';

export class ScreenHeader extends React.Component {
    render() {
        const { title } = this.props;
        const { goBack } = this.props.navigation;
        return (
            <View style={[styles.header, this.props.customStyle]}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={styles.backBtn}>
                    <Ionicons name="ios-arrow-back" color={Colors.DARK} size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        left: 4,
        top: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 15,
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 10
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        left: 60,
        fontFamily: 'bebas',
        color: Colors.DARK
    }
});