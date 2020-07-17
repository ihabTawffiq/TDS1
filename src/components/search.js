import React from 'react';
import { db } from '../services/firebase';
import TextField from '@material-ui/core/TextField';
import Table from "./table";
import '../style/base.css';
import Container from '@material-ui/core/Container';


export default class Search extends React.Component {


    state = {

        orders: [],
        filteredOrders: [],

    };


    componentDidMount() {

        db.collection('orders')
            .get()
            .then(snapshot => {
                const orders = [];

                snapshot.forEach(doc => {
                    const data = doc.data();
                    orders.push(data);
                });

                orders.sort((a, b) => {
                    if (a.order_id > b.order_id) {
                        return -1
                    } else
                        return 1
                })
                this.setState({
                    orders: orders,
                });
            })
            .catch(error => console.log(error));
    };
    handelChange = (e) => {
        const target = Number(e.target.value)
        const filteredOrders = this.state.orders.filter(order => {
            return (order.order_id === target)

        })
        this.setState({ filteredOrders })
    }
    render() {
        return (
            <div>
                                    <h1>ID بحث من خلال ال</h1>

                <Container id="contsearch">
                <TextField id="outlined-basic" label="Order ID" variant="outlined"  name="order_ID" onChange={this.handelChange} />

                </Container>

                <Table delete={false} orders={this.state.filteredOrders}  />
            </div>
        )
    }
}