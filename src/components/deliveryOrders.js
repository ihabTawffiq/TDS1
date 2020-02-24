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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import green from '@material-ui/core/colors/green';
import swal from 'sweetalert';
import Container from '@material-ui/core/Container';
import '../style/base.css'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 100,

    },
    formCell: {
        margin: theme.spacing(0),
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
    const [selectValue, setseletvalue] = useState(0)
    useEffect(() => {

    }, [far2sha7n])
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
        const form = document.querySelector('#ddss');

        setcomment(form.comment.value)

        if (selectValue !== 0) {

            row.state = selectValue;
            row.btnState = true
            let tot1 = total
            if (selectValue === 1) {

                tot1 -= far2sha7n

                tot1 -= +(row.far2Sha7n)
                tot1 -= +(row.shipping)

            } else if (selectValue === 2) {

                tot1 -= far2sha7n

                tot1 -= +(row.far2Sha7n)
                tot1 -= +(row.price)
                tot1 -= +(row.shipping)
            } else if (selectValue === 3) {

                tot1 -= far2sha7n

                tot1 -= +(row.far2Sha7n)

                tot1 -= +(0)
            } else if (selectValue === 4) {

                tot1 -= far2sha7n

                tot1 -= +(row.far2Sha7n)
                tot1 -= +(row.price)
            }
            settotal(tot1)
            db.collection("orders").where("state", "==", 0)
                .onSnapshot(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (doc.data().order_id === row.order_id) {
                            db.collection('orders').doc(doc.id).update({
                                state: selectValue,
                                comment: comment,
                                far2Sha7n: far2sha7n
                            })
                        }
                    });

                })
        }
        else {

            swal("ماتختار يابني حالة الاوردر ... ماصباح الفل بقي", {
                dangerMode: true,
                buttons: {
                    Ok: "ماشي لامواخذة نسيت",
                }
            })




        }

    };
    function handelSelecctkhara(e) {
        setseletvalue(e.target.value)
    }

    function handelBtn(e) {
        e.preventDefault();
    }
    function handelFar2Sha7n(event) {

        setfar2sha7n(event.target.value)

    }

    const classes = useStyles();

    return (
        <div>

            <Container id="contselect">


                <FormControl required className={classes.formControl}>
                    <InputLabel id="demo-simple-select-required-label">اختار المندوب</InputLabel>
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

            </Container>
            <h1>ID بحث من خلال ال</h1>

            <Container id="contsearch">

                <TextField id="outlined-basic" type="number" label="Order ID" variant="outlined" name="order_ID" onChange={handelSearch} />

            </Container>


            <h1 align="center" > {total} :حساب {delivery === 'E5tar mandob' ? "المندوب" : delivery} اليومي </h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell id="tbh" >ID</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">اسم العميل</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">التاريخ</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">السعر</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">الشحن</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">المنطقة</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">الموبيل</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">اسم المرسل اليه</StyledTableCell>
                            <StyledTableCell id="tbh" align="right"> الحاله و العدد و التعليق || ({filterOrders.length})</StyledTableCell>

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
                                <StyledTableCell align="center">{row.clientName}</StyledTableCell>


                                <StyledTableCell align="right">
                                    <Container id="contcell">


                                        <form onSubmit={(e) => handleChange12(row, e)} id="ddss">
                                            <TextField id="outlined-basic4" label="تعليق" variant="outlined" name="comment" />
                                            {+(row.far2Sha7n) !== 0
                                                ? <TextField InputProps={{ readOnly: true, }} id="outlined-basic4" variant="outlined" type="number" label="فرق شحن" name="far2Sha7n" value={row.far2Sha7n} required />
                                                : <TextField id="outlined-basic4" type="number" variant="outlined" label="فرق شحن" name="far2Sha7n" onChange={handelFar2Sha7n} />
                                            }

                                            <Select disabled={row.btnState}
                                                labelId="demo-simple-select-outlined-label"
                                                id="outlined"
                                                name="selectt"
                                                onChange={handelSelecctkhara}
                                                className={classes.formCell}
                                                variant="outlined"

                                            >
                                                <MenuItem value={row.state}>
                                                    لا شيء
                                        </MenuItem>
                                                <MenuItem value={3} name="tawsel">
                                                    <Button disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                        تم التوصيل
                                            </Button>
                                                </MenuItem>
                                                <MenuItem value={1} name="sha7nRasel">
                                                    <Button disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                        شحن علي الراسل
                                            </Button>
                                                </MenuItem>
                                                <MenuItem value={4} name="daf3Sha7n">
                                                    <Button disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                        تم دفع الشحن
                                            </Button>
                                                </MenuItem>
                                                <MenuItem value={2} name="la8i">
                                                    <Button id="btn" disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                        لاغي
                                            </Button>
                                                </MenuItem>


                                            </Select>


                                            {/* <Button variant="contained" color="primary" component="span" value={3}
                                        onClick={(e) =>handleChange(row,e)} >
                                        done             
                                    </Button> */}
                                            <Button id="btndone" variant="contained" color="primary" onClick={(e) => handleChange12(row, e)}>
                                                تم
                                        </Button>


                                        </form>
                                    </Container>
                                </StyledTableCell>


                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}
