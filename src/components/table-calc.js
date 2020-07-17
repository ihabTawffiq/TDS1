import React, { useEffect, useState, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";
import { db } from '../services/firebase';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardCalc from './cards';
import '../style/base.css'
import swal from "sweetalert";
import green from '@material-ui/core/colors/green';

import firebase from '../services/firebase';
const functions = firebase.functions()
const finishClientCalc = functions.httpsCallable("finishClientCalc")

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },


}))(TableRow);



const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 700,
    },
    formControl: {
        margin: "0 auto",
        minWidth: 100,

    },
    formCell: {
        margin: theme.spacing(200),
        minWidth: 100,

    },
    formtext: {
        margin: theme.spacing(1),

    },
    selectEmpty: {
        marginTop: theme.spacing(2), color: green
    },
    table: {
        minWidth: 200,

    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}));

export default function TableC(props) {

    const Idees = props.IDDS;
    const rows = props.orders;
    const client = props.client

    // const rows = props.orders.filter(row=>{
    //     return rows.state == 0
    // })
    const classes = useStyles();
    const [total, setTotal] = useState(0)
    const [orders, setOrders] = useState([])
    const [btnState, setBtnState] = useState(false)
    const [dof3a, setDof3a] = useState(0)

    useEffect(() => {
        let tot = 0
        rows.forEach(ro => { tot += +(ro.price) - +(ro.far2Sha7n) })
        db.collection("clients").where("name", "==", client)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const totalCalc = doc.data().totalCalc || []
                    setDof3a(doc.data().dof3a)
                    setOrders(totalCalc)
                });
            });
        setTotal(tot);
        setBtnState(false)
    }, [client, rows])


    function finishCalc() {

        let total1 = total
        rows.forEach(row => {

            // da 47n 3la el rasel w bgm3 el price m3 shipping
            if (row.state === 3) {
                total1 -= (+(row.price) + +(row.shipping))

                // da la8i w bgm3 s3r el 47n
            } else if (row.state === 2) {
                total1 -= +(row.price)


                // Done
            } else if (row.state === 1 || row.state === 5) {
                total1 -= 0

            }
            // tm daf3 el sha7n
            else if (row.state === 4) {
                total1 -= +(row.price)

            }

            setTotal(total1 - dof3a);

            console.log(total)
        })

        db.collection("clients").where("name", "==", client)
            .get().then(function (querySnapshot) {

                querySnapshot.forEach(function (doc) {
                    const totalCalc = doc.data().totalCalc || []
                    let i = 0;

                    totalCalc.forEach(bob => {


                        setDof3a(doc.data().dof3a)
                        const dd = +(doc.data().dof3a)

                        bob.total = total - dd
                    })
                    swal(

                        {
                            text: "جاري انهاء الحساب " + "برجاء الانتظار ....",
                            buttons: false,
                            closeOnClickOutside: false,

                        }
                    );
                    finishClientCalc({
                        total: total,
                        done: true,
                        client: client,
                        orders: rows
                    })
                        .then((response) => {


                            swal("تم تقفيل حساب اوردر", "...", "success");

                        })
                    totalCalc.push({
                        day: new Date(),
                        total: total,
                        done: true,
                        client: client
                    })
                    db.collection('clients').doc(doc.id).update({ totalCalc: totalCalc })


                    setOrders(totalCalc)

                });

            });
        //Update the state of orders to finshed calculations
        // rows.forEach(order => {
        //     db.collection("orders").where("order_id", "==", order.order_id)
        //         .onSnapshot(function (querySnapshot) {
        //             querySnapshot.forEach(function (doc) {
        //                 db.collection('orders').doc(doc.id).update({ done: true })
        //             })
        //         })
        // })

        setBtnState(true)
    }


    return (

        <TableContainer component={Paper}>
            <h1>دفعات حالية ل{client === "اختار العميل" ? "..." : client} : {dof3a}</h1>
            <h1 align="center" >  {total} :حساب العميل اليومي </h1>
            {/* <CardCalc data={orders} client={client} /> */}
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell id="tbh" >ID</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">العميل</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">التاريخ</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">السعر</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">الشحن</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">ملحوظة</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">فرق الشحن</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">الحالة </StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (

                        <StyledTableRow key={[row.order_id]}>
                            <StyledTableCell id="cell" component="th" scope="row">
                                {row.order_id}
                            </StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.client}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{moment(row.date.toDate()).format('llll')}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{Number(row.price)}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.shipping}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.comment || "لا يوجد تعليق"}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.far2Sha7n}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{
                                row.state === 3 ? "شحن علي الراسل"
                                    : row.state === 2 ? "لاغي"
                                        : row.state === 1 ? "تم التوصيل"
                                            : row.state === 5 ? "مرتجع جزئي"
                                                : row.state === 4 ? "تم دفع الشحن"
                                                    : row.state === 5 ? "مرتجع جزئي"
                                                        : row.state
                            }</StyledTableCell>

                        </StyledTableRow>

                    ))}

                </TableBody>
            </Table>

            <Button id="btndone" variant="contained" color="primary" component="span" disabled={btnState}
                onClick={finishCalc}>
                Finish
             </Button>

            <TextField InputProps={{ readOnly: true, }} id="outlined-basic" variant="outlined" value={total} />
        </TableContainer   >


    );
}
