import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import assigment from '../services/Assignments';
import {ScrollView} from "react-native-gesture-handler";

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                {
                    subject: 'Traer mis llaves',
                    contactName: 'Emilio Reyes',
                    paymentStatus: 'PAGADO',
                    date: '2019-08-21T00:00:00.000Z'
                },
                {
                    subject: 'Traer mis llaves 2',
                    contactName: 'Emilio Reyes',
                    paymentStatus: 'PENDIENTE',
                    date: '2019-08-21T00:00:00.000Z'
                },
                {
                    subject: 'Traer mis llaves',
                    contactName: 'Emilio Reyes',
                    paymentStatus: 'PAGADO',
                    date: '2019-08-21T00:00:00.000Z'
                },
                {
                    subject: 'Traer mis llaves 2',
                    contactName: 'Emilio Reyes',
                    paymentStatus: 'PENDIENTE',
                    date: '2019-08-21T00:00:00.000Z'
                }
            ]
        }
    }

    async componentDidMount() {
        console.log('in history');
        const history = await assigment.getHistoryAssignments();
        this.setState({dataSource: history.assignments});
        console.log('response history', history);
    }

    cardRender = (data) => {
        return (
            <View style={style.card} key={data.date}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={style.subject}>{data.subject.subject} </Text>
                    <Text style={style.date}>{data.date.substring(0, 10)}</Text>
                </View>
                <View style={{flex: 3}}>
                    <View style={{flex: 1}}>
                        <Text style={{
                            textAlign: 'right',
                            paddingRight: 5,
                            paddingTop: 10
                        }}>{data.messengerPaid ? 'PAGADO' : 'PENDIENTE'}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 15, textAlign: 'left', paddingLeft: 10}}>
                            Contacto: {data.subject.contactName}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "stretch",
                paddingTop: 100
            }}>
                <View style={{paddingTop: 20, height: 100}}>
                    <Text style={{fontSize: 30, textAlign: 'center'}}>Historial de Asignaciones</Text>
                </View>
                <View style={{
                    flex: 1, flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "stretch"
                }}>
                    {/*<FlatList*/}
                    {/*    data={this.state.dataSource}*/}
                    {/*    renderItem={({item}) => this.cardRender(item)}*/}
                    {/*/>*/}
                    <ScrollView
                        style={{flex: 1, marginTop: 30, paddingTop: 7, paddingHorizontal: 7, marginHorizontal: -7}}
                        showsVerticalScrollIndicator={false}>
                        <View style={style.plainCard} key={1}>
                            <View style={style.cardStatus}>
                                <View style={[
                                    style.cardStatusAlt,
                                    {backgroundColor: 'gray'}]}/>
                            </View>
                            <View style={style.cardDate}>
                                <Text
                                    style={style.dateText}>2019-01-01</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    alert('hola mundo');
                                }}
                                style={style.cardBody}>
                                <Text style={style.cardTitle}>Ir por llaves</Text>
                                <View style={style.cardItem}>
                                    {/*<Ionicons name="ios-person" size={16} color="#595959"/>*/}
                                    <Text style={style.itemDescription}>Emilio Reyes</Text>
                                </View>
                                <View style={style.cardItem}>
                                    {/*<FontAwesome name="phone" size={16} color="#595959"/>*/}
                                    <Text style={style.itemDescription}>4383-0022</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const style = {
    card: {
        height: 200,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 1,
        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "stretch"

    },
    subject: {
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 20,
        width: '70%'
    },
    date: {
        width: '30%',
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 20,
    },
    plainCard: {
        backgroundColor: 'white',
        shadowColor: '#878787',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderRadius: 10,
        marginVertical: 15,
        marginLeft: 10,
        marginRight: 4,
        paddingHorizontal: 20
    },
    cardStatus: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: -7,
        right: -7,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    cardStatusAlt: {
        width: 10,
        height: 10,
        borderRadius: 50
    },
    cardDate: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 30,
        position: 'absolute',
        top: 50,
        right: 26,
    },
    dateText: {
        fontFamily: 'roboto-semibold',
        color: '#595959',
    },
    cardBody: {
        paddingVertical: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: 'roboto-semibold',
        color: '#595959',
        marginBottom: 20
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    itemDescription: {
        fontFamily: 'roboto',
        color: '#595959',
        fontSize: 14,
        marginLeft: 16
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2'
    },
};
