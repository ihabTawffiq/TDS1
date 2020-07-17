import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
//import Table from "./table";
import TableC from './table-calc'
import '../style/base.css'
import Container from '@material-ui/core/Container';


import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const ihab12 = props.ihab;
    console.log(ihab12)
    const handleDateChange = date => {
        setSelectedDate(date);
        console.log(date)

    };
    //console.log(moment(selectedDate).format('dddd'))
    const orders = props.orders.filter(order => {
        return moment(order.date.toDate()).format('dddd') === moment(selectedDate).format("dddd");
    });
    //  console.log(orders)
    return (

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">


                <Container id="contdate">

                    <KeyboardDatePicker
                        id="btnorder"
                        margin="normal"
                        id="date-picker-dialog"
                        label="اختار تاريخ الأوردر"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Container>
                <TableC orders={orders} IDDS={props.IDDS} client={props.client} />



            </Grid>
        </MuiPickersUtilsProvider>
    );
}
