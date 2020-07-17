import React from 'react';
import { db } from '../services/firebase';
//import Table from "./table";
import Button from '@material-ui/core/Button';
import DateSelector from "./datecalc";
import TableC from './table-calc'
//import CardCalc from "./cards"
import '../style/base.css'




class Calc extends React.Component {


    state = {

        order: [],
        clients: [],
        client: "اختار العميل",
        filteredOrders: [],
        IDDS: [],
        filteredclient: []

    };


    componentDidMount() {
        db.collection('clients')
            .get()
            .then(snapshot => {
                const clients = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data["idts"] = doc.id;
                    clients.push(data);
                });
                this.setState({ clients: clients });
                //  console.log(this.state.clients);
            })
            .catch(error => console.log(error));

        db.collection('orders').where('state', '>', 0).where('done', '==', false)
            .onSnapshot(snapshot => {
                const orders = [];
                const IDDS = [];

                snapshot.forEach(doc => {
                    const data = doc.data();
                    IDDS.push(doc.id);
                    orders.push(data);
                });

                orders.sort((a, b) => {
                    if (a.order_id > b.order_id) {
                        return -1
                    } else
                        return 1
                })
                this.setState({
                    order: orders,
                    IDDS: IDDS
                });
            })

        const filteredOrders = this.state.order.filter(order => {
            return (order.client === this.state.client)
        })
        const filteredclient = this.state.clients.filter(client => {
            return (client.name === this.state.client)
        })
        this.setState({ filteredOrders })
        this.setState({ filteredclient })


    };


    handelSelectClient = (e) => {
        this.setState({ client: e.target.value })

    }
    handelFilter = () => {
        const filteredOrders = this.state.order.filter(order => {
            return (order.client === this.state.client)
        })
        this.setState({ filteredOrders })

    }
    render() {
        return (
            <div>
                {/* <center> <h2>*******************Filter by Date Section****************</h2> </center>
                <DateSelector orders={this.state.order} />
                <br />
                <br />
                <br /> */}

                <center> <h1> حسابات العميل </h1> </center>
                <center><select value={"this.state.client"} onChange={this.handelSelectClient} required >
                    <option onChange={this.handelSelectClient} value={this.state.client}>{this.state.client}</option>
                    {this.state.clients.map(cl => <option value={cl.name}>{cl.name}</option>)}
                </select>
                </center>
                <ul>



                </ul>
                <center>

                    <Button id="btnorder" variant="contained" color="secondary" onClick={this.handelFilter}>
                        البحث عن العميل
                    </Button>
                </center>

                {/* // <DateSelector
                //     IDDS={this.state.IDDS}
                //     orders={this.state.filteredOrders}
                //     client={this.state.client}
                //     ihab="yasserr"
               // />*/}
                <TableC orders={this.state.filteredOrders} IDDS={this.state.IDDS} client={this.state.client} />


            </div >
        )
    }

}
export default Calc;