import React from 'react';
import { db } from '../services/firebase';
//import Table from "./table";
import Button from '@material-ui/core/Button';
import Selectdis from "./discardedSelector";
//import CardCalc from "./cards"





import '../style/base.css'




class Discarded extends React.Component {


    state = {

        order: [],
        clients: [],
        client: "اختار العميل",
        filteredOrders: [],
        IDDS: []

    };


    componentDidMount() {
        db.collection('clients')
            .get()
            .then(snapshot => {
                const clients = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    clients.push(data);
                });
                this.setState({ clients: clients });
                //  console.log(this.state.clients);
            })
            .catch(error => console.log(error));

        db.collection('orders').where('state', 'in', [2, 3, 4, 5]).where("done", "==", true)
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
        this.setState({ filteredOrders })


    };


    handelSelectClient = (e) => {
        this.setState({ client: e.target.value })

    }
    handelFilter = () => {
        const filteredOrders = this.state.order.filter(order => {
            //   console.log(order.client, this.state.client)
            return (order.client === this.state.client)
        })
        this.setState({ filteredOrders })
        // console.log(this.state.filteredOrders)

    }
    render() {
        return (
            <div>
                {/* <center> <h2>*******************Filter by Date Section****************</h2> </center>
                <DateSelector orders={this.state.order} />
                <br />
                <br />
                <br /> */}

                <center> <h1>  العميل </h1> </center>
                <center><select value={"this.state.client"} onChange={this.handelSelectClient} required >
                    <option onChange={this.handelSelectClient} value={this.state.client}>{this.state.client}</option>
                    {this.state.clients.map(cl => <option value={cl.name}>{cl.name}</option>)}
                </select>
                </center>

                <center>

                    <Button id="btnorder" variant="contained" color="secondary" onClick={this.handelFilter}>
                        البحث عن العميل
                    </Button>
                </center>

                <Selectdis IDDS={this.state.IDDS} orders={this.state.filteredOrders} client={this.state.client} />


            </div >
        )
    }

}
export default Discarded;