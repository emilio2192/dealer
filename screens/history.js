import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import assigment from '../services/Assignments';

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
                <View style={{ flexDirection:'row'}}>
                    <Text style={style.subject}>{data.subject.subject} </Text>
                    <Text style={style.date}>{data.date.substring(0, 10)}</Text>
                </View>
                <View style={{flex:3}}>
                    <View style={{flex:1}}>
                        <Text style={{textAlign: 'right', paddingRight:5, paddingTop:10}}>{data.messengerPaid? 'PAGADO' : 'PENDIENTE'}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:15, textAlign:'left', paddingLeft:10}}>
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
                    <Text style={{fontSize:30,textAlign:'center'}}>Historial de Asignaciones</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "stretch"}}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({item}) => this.cardRender(item)}
                    />
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
        shadowOffset: { width: 0, height: 1 },
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
        paddingTop:10,
        paddingLeft:10,
        fontSize:20,
        width:'70%'
    },
    date: {
        width:'30%',
        paddingTop:10,
        paddingLeft:10,
        fontSize:20,
    }
};
