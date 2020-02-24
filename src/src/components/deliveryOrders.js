import React, { useState, useEffect } from 'react';
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
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 700,

    },
    selectEmpty: {
        marginTop: theme.spacing(2), color: green
    },
    table: {
        minWidth: 700,

    },
}));
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




export default function CustomizedTables() {
    const [rows, setRows] = useState([])
    const [filterOrders, setFilterOrders] = useState([])
    const [deliverys, setDeliverys] = useState([])
    const [delivery, setDelivery] = useState('E5tar mandob')
    const [IDs, setIDs] = useState([])
    const [btnDisable, setBtnDisable] = useState(false)
    const [comment, setcomment] = useState("")
    const [far2sha7n, setfar2sha7n] = useState(0)
    const [total, settotal] = useState(0)

    const handleChange = event => {
        setDelivery(event.target.value);
        db.collection("orders").where("state", "==", 0).where("delivery", "==", event.target.value)
            .get().then(function (querySnapshot) {
                var orders = [];
                let tot = total
                let btnSS = "btnState"
                querySnapshot.forEach(function (doc) {
                    let data = doc.data()
                    data[btnSS] = false
                    data["ID"] = doc.id
                    orders.push(data);
                    tot += +(doc.data().price)
                    tot += +(doc.data().shipping)
                });
                orders.sort((a, b) => {
                    if (a.order_id > b.order_id) {
                        return -1
                    } else
                        return 1
                })
                setFilterOrders(orders)
                settotal(tot)
                console.log(delivery)
            });

    };

    useEffect(() => {
        db.collection('delivery')
            .get()
            .then(snapshot => {
                const delivery = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    delivery.push(data);
                });
                setDeliverys(delivery);
            })
            .catch(error => console.log(error));
    }, [])

    // useEffect(() => {

    //     db.collection("orders").where("state", "==", 0).where("delivery", "==", delivery)
    //         .onSnapshot(function (querySnapshot) {
    //             var orders = [];
    //             querySnapshot.forEach(function (doc) {
    //                 orders.push(doc.data());
    //             });
    //             orders.sort((a, b) => {
    //                 if (a.order_id > b.order_id) {
    //                     return -1
    //                 } else
    //                     return 1
    //             })
    //             setFilterOrders(orders)
    //             console.log(delivery)
    //         });

    // }, [])



    const handelSearch = (e) => {
        const target = + e.target.value
        const filtered = rows.filter(order => {
            return (order.order_id === target)

        })
        if (filtered.length === 0)
            setFilterOrders(rows)
        else setFilterOrders(filtered)

    }
    const handelAdd = (ID, e) => { }
    //     e.preventDefault();
    //     if (delivery === 'E5tar mandob') {
    //         console.log("matnsash el style ya bashmohandes OSOS")
    //     } else {


    //         db.collection("orders").where("state", "==", -1)
    //             .onSnapshot(function (querySnapshot) {
    //                 querySnapshot.forEach(function (doc) {
    //                     console.log("i")
    //                     if (doc.data().order_id === ID) {

    //                         db.collection('orders').doc(doc.id).update({ state: 0, delivery: delivery })

    //                         console.log(filterOrders)
    //                     }
    //                 });



    //                 // db.collection("orders")
    //                 //     .get()
    //                 //     .then(function (querySnapshot) {

    //                 //         querySnapshot.forEach(function (doc) {
    //                 //             console.log("i")
    //                 //             if (doc.data().order_id === ID) {

    //                 //                 db.collection('orders').doc(doc.id).update({ state: 0, delivery: delivery })

    //                 //                 console.log(filterOrders)
    //                 //             }

    //                 //         });
    //                 //     }).catch(error => console.log(error));
    //             })
    //     }
    // }
    function handleChange12(row, event) {
        row.state = event.target.value;
        row.btnState = true
        let tot1 = total
        if (event.target.value === 1) {
            tot1 -= +(row.shipping)

        } else if (event.target.value === 2) {
            tot1 -= +(row.price)
            tot1 -= +(row.shipping)
        } else if (event.target.value === 3) {
            tot1 -= +(0)
        } else if (event.target.value === 4) {
            tot1 -= +(row.price)
        }
        settotal(tot1)
        db.collection("orders").where("state", "==", 0)
            .onSnapshot(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    if (doc.data().order_id === row.order_id) {
                        db.collection('orders').doc(doc.id).update({
                            state: event.target.value,
                            comment: comment,
                            far2Sha7n: far2sha7n
                        })
                    }
                });

            })

    };
    function handelSubmit() {
        const form = document.querySelector('#ddss');
        setcomment(form.comment.value)
        setfar2sha7n(form.far2sha7n.value)
    }

    function handelBtn(e) {
        e.preventDefault();
    }


    const classes = useStyles();

    return (
        <div>

            <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">e5tar el delivery</InputLabel>
                <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={[deliverys][0].name}
                    onChange={handleChange}
                    className={classes.selectEmpty}
                >

                    {deliverys.map(delivery => <MenuItem value={delivery.name}>{delivery.name}</MenuItem>)}


                </Select>

            </FormControl>

            <h2>Search by ID</h2>
            <TextField id="outlined-basic1" label="Order ID" variant="outlined" name="order_ID" onChange={handelSearch} />
            <h1 align="center" > {total} :حساب العميل اليومي </h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">El 3amel</StyledTableCell>
                            <StyledTableCell align="right">El youm</StyledTableCell>
                            <StyledTableCell align="right">El se3r</StyledTableCell>
                            <StyledTableCell align="right">El sha7n</StyledTableCell>
                            <StyledTableCell align="right">El 3enwan</StyledTableCell>
                            <StyledTableCell align="right">El Mobile</StyledTableCell>
                            <StyledTableCell align="right">Esm el 3amel</StyledTableCell>
                            <StyledTableCell align="right">El mandob</StyledTableCell>
                            <StyledTableCell align="right">Action || ({filterOrders.length})</StyledTableCell>
                            <StyledTableCell align="right">تعليق</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {filterOrders.map(row => (
                            <StyledTableRow key={[row.order_id]}>
                                <StyledTableCell component="th" scope="row">
                                    {row.order_id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.client}</StyledTableCell>
                                <StyledTableCell align="right">{moment(row.date.toDate()).format('dddd')}</StyledTableCell>
                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                                <StyledTableCell align="right">{row.shipping}</StyledTableCell>
                                <StyledTableCell align="right">{row.adress}</StyledTableCell>
                                <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                                <StyledTableCell align="right">{row.clientName}</StyledTableCell>
                                <StyledTableCell align="right">{row.delivery}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <form onSubmit={handelSubmit} id="ddss">
                                        <TextField id="outlined-basic4" label="تعليق" variant="outlined" name="comment" />
                                        <TextField id="outlined-basic4" label="فرق شحن" type="number" variant="outlined" name="far2sha7n" />
                                        <Button variant="contained" color="primary" onClick={handelSubmit}>
                                            تم
                                        </Button>
                                    </form>
                                </StyledTableCell>

                                <StyledTableCell align="right">
                                    <Select disabled={row.btnState}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={(e) => handleChange12(row, e)}

                                    >
                                        <MenuItem value={row.state}>
                                            <em>لا شيء</em>
                                        </MenuItem>
                                        <MenuItem value={3}>
                                            <Button disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                تم التوصيل
                                            </Button>
                                        </MenuItem>
                                        <MenuItem value={1}>
                                            <Button disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                شحن علي الراسل
                                            </Button>
                                        </MenuItem>
                                        <MenuItem value={4}>
                                            <Button disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                تم دفع الشحن
                                            </Button>
                                        </MenuItem>
                                        <MenuItem value={2}>
                                            <Button disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                لاغي
                                            </Button>
                                        </MenuItem>


                                    </Select>


                                    {/* <Button variant="contained" color="primary" component="span" value={3}
                                   onClick={(e) =>handleChange(row,e)} >
                                done             
                                </Button> */}


                                </StyledTableCell>


                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}
