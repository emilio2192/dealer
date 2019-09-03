import React from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler'; 

export class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = { user: AsyncStorage.getItem('userInformation') };
    }

    async componentDidMount() {
        let userInformation = await AsyncStorage.getItem('userInformation');
        userInformation = JSON.parse(userInformation);
        this.setState({ user: userInformation });
    }

    signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Image style={styles.headerBackground}
                       source={require('../assets/images/header-profile.png')} />
                <View style={styles.header}>
                    <View style={styles.imageContainer}>
                        <FontAwesome name="user" size={48} color="#D5D7D6" />
                    </View>
                </View>
                <ScrollView style={{ marginTop: 10 }}>
                    <View style={styles.actionCard}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Entypo name="email" size={14} color="#303030" style={{marginRight: 10}} />
                            <Text style={styles.cardTitle}>Usuario</Text>
                        </View>
                        <Text style={styles.cardDescription}>
                            {this.state.user.username}
                        </Text>
                    </View>
                    <View style={styles.actionCard}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="email-open" size={14} color="#303030" style={{marginRight: 10}} />
                            <Text style={styles.cardTitle}>Correo</Text>
                        </View>
                        <Text style={styles.cardDescription}>
                            {this.state.user.email}
                        </Text>
                    </View>
                    <View style={styles.actionCard}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome name="phone" size={14} color="#303030" style={{marginRight: 10}} />
                            <Text style={styles.cardTitle}>Teléfono</Text>
                        </View>
                        <Text style={styles.cardDescription}>
                            {this.state.user.mobile}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.signOutBtn}
                        onPress={() => this.signOut()}>
                        <Ionicons name="ios-exit" size={20} style={{ marginRight: 10 }}/>
                        <Text style={styles.cardTitle}> Cerrar Sesión </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 24,
        backgroundColor: '#F9F9F9'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 125,
        width: 125,
        backgroundColor: 'white',
        borderRadius: 150,
        shadowColor: '#878787',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        elevation: 10,
    },
    headerBackground: {
        height: 200,
        width: Dimensions.get('window').width,
        position: 'absolute',
        top: 0,
        zIndex: -1
    },
    header: {
        marginVertical: 35
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'roboto-bold'
    },
    actionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        paddingVertical: 26,
        borderBottomWidth: 1,
        borderBottomColor: '#ededed'
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#303030',
        fontFamily: 'roboto-bold'
    },
    cardDescription: {
        fontWeight: 'bold',
        color: '#5b5b5b',
        fontFamily: 'roboto-semibold'
    },
    signOutContainer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signOutBtn: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 25,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#878787',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        elevation: 10,
        alignSelf: 'stretch'
    },
    utitle: {
        fontWeight: 'bold',
        fontSize: 17,
        alignContent: 'flex-start'
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        alignContent: 'flex-start'
    },
    text: {

        fontSize: 16,
        paddingBottom: 15,
        alignContent: 'stretch'
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        height: 35,
        marginBottom: 5,
        alignContent: 'stretch'
    }
});
