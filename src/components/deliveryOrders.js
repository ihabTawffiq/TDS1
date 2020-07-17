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
import Modal from '@material-ui/core/Modal';
import firebase from '../services/firebase';
import { fromUnixTime } from 'date-fns';
const functions = firebase.functions()
const updateOrderFunction = functions.httpsCallable("updateOrder")//Update el state bta3et el order elle wad7a aslan mn om l esm
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
    const [teet, setTeet] = useState(0)
    const [calcFinish, setCalcFinish] = useState(false)
    const [modID, setModID] = useState(0)
    const [selectValue, setseletvalue] = useState(0)
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);
    const [hide, setHide] = useState(true)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(true);
    };
    const handleClose12 = () => {
        setOpen(false);
    };
    const [goz2iState, setGoz2iState] = React.useState(true);

    useEffect(() => {

    }, [far2sha7n, goz2iState])
    //handel select delivery's order

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
                    data["done12"] = false
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
        setCalcFinish(false)
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
    //                      70
    ///                     71
    function handleChange12(row, event) {

        const form = document.querySelector('#ddss');
<<<<<<< HEAD
      
        row.done = true
        const comment21 = row.order_id.toString() + "comment"
        const comment222 = document.getElementById(comment21).value 
        setcomment(comment222)
        console.log('lolo',comment222 );
=======
        row.done = true
        const comment21 = row.order_id.toString() + "comment"
        const comment222 = document.getElementById(comment21).value | ""
        setcomment(comment222)
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
        let old_price = row.price
        let mortaga3_price = 0
        let price_temp = 0
        if (selectValue !== 0) {
            let delivery_clc = 0;
            let client_clc = 0;
            row.state = selectValue;
            row.btnState = true
            let tot1 = total
            /***********Sha7n 3ala el rasel***************/
            if (selectValue === 3) {
                const name1 = row.order_id.toString() + "far2Sha7n"
                const far2sha7ntet = +document.getElementById(name1).value

                delivery_clc += 0
                client_clc += row.shipping
                tot1 -= +(far2sha7ntet)
                tot1 -= +(row.shipping)
                tot1 -= +(row.price)
                price_temp = old_price

            }//*************La8i************  
            else if (selectValue === 2) {
                delivery_clc += 0
                client_clc += 0
                tot1 -= +(row.price)
                tot1 -= +(row.shipping)
                price_temp = old_price

            }
            // ***************tam*********
            else if (selectValue === 1) {
                client_clc += 0
                delivery_clc += +row.price
                delivery_clc += +row.shipping
                if (row.order_id === modID) {
                    tot1 -= far2sha7n


                }
                const name1 = row.order_id.toString() + "far2Sha7n"
                const far2sha7ntet = +document.getElementById(name1).value

                tot1 -= +(far2sha7ntet)
                delivery_clc -= +(far2sha7ntet) | 0
                client_clc += +(far2sha7ntet) | 0
                tot1 -= +(0)
                price_temp = old_price
            }
            //tam daf3 el sha7n
            else if (selectValue === 4) {
                const name1 = row.order_id.toString() + "far2Sha7n"
                const far2sha7ntet = +document.getElementById(name1).value
                delivery_clc += +row.shipping
                delivery_clc -= +(far2sha7ntet) | 0
                client_clc += 0


                tot1 -= +(far2sha7ntet)
                tot1 -= +(row.price)
                price_temp = old_price
            }
            // mortaga3 goz2i

            else if (selectValue === 5) {
                setGoz2iState(false)
                delivery_clc += +row.price
                const name11 = row.order_id.toString() + "goz2ii"
                const mortaga3 = +document.getElementById(name11).value
                const name1 = row.order_id.toString() + "far2Sha7n"
                const far2sha7ntet = +document.getElementById(name1).value
                delivery_clc -= +mortaga3
                delivery_clc += +row.shipping
                // delivery_clc -= +(form.far2Sha7n.value) | 0
                delivery_clc -= far2sha7ntet | 0
                client_clc += +mortaga3

                client_clc += far2sha7ntet | 0
                console.log("7essssaaaaasssaas", delivery_clc, client_clc)
                //mortaga3_price = +form.goz2ii.value;


                tot1 -= +(far2sha7ntet)

                tot1 -= (mortaga3)
                price_temp = old_price - mortaga3
            }

            /* else if (selectValue === 5) {
                 if (row.order_id === modID) {
                     tot1 -= far2sha7n
                 }
 
                 tot1 -= +(row.far2Sha7n)
 
                 tot1 -= +(gozdata.price.value)
                 tot1 -= +(gozdata.shipping.value)
                 db.collection("orders").where("order_id", "==", row.order_id)
                     .onSnapshot(function (querySnapshot) {
                         querySnapshot.forEach(function (doc) {
                             db.collection('orders').doc(doc.id).update({
                                 price: gozdata.price.value,
                                 shipping: gozdata.shipping.value
                             })
                         })
                     })
 
             }*/
            settotal(tot1)


            swal(

                {
                    text: "جاري انهاء الاوردر" + "برجاء الانتظار ....",
                    buttons: false,
                    closeOnClickOutside: false,

                }
            );
            setseletvalue(-2)

            const name122 = row.order_id.toString() + "far2Sha7n"
            const far2sha7ntet22 = +document.getElementById(name122).value
            updateOrderFunction({
                idtt: row.order_id,
                state: selectValue,
<<<<<<< HEAD
                comment: comment222.toString(),
=======
                comment: comment222,
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
                far2Sha7n: far2sha7ntet22 | 0,
                price: +price_temp,//price_mor
                old_price: +old_price,
                delivery_clc: delivery_clc,
                client_clc: client_clc

            }).then((response) => {


                swal("تم تقفيل حساب اوردر", "...", "success");


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

        setOpen(false);
    };
    function handleChangeDelivery() {
        const form = document.querySelector("#deliveryCalc")
        const calcDay = +form.deliverydayCalc.value
        db.collection('delivery').where('name', '==', delivery)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let flag = true
                    const calc = doc.data().calc
                    calc.forEach(day1 => {
                        if (moment(new Date()).format('L') === day1.day && flag) {
                            day1.total += calcDay
                            flag = false
                        }

                    })
                    if (flag) {
                        calc.push({ "day": moment(new Date()).format('L'), total: calcDay })
                    }



                    db.collection('delivery').doc(doc.id).update({
                        calc: calc
                    })


                });

            })
        setCalcFinish(true)
        let msg = "حساب المندوب :  " + delivery + calcDay
        swal("تم انهاء حساب المندوب ", msg, "success");


    }
    function handelSelecctkhara(e) {
        setseletvalue(e.target.value)
    }

    function handelBtn(e) {
        e.preventDefault();
    }
    function handelFar2Sha7n(row, event) {

        setfar2sha7n(event.target.value)
        setModID(row.order_id)
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
<<<<<<< HEAD
                                            <TextField className="outlined-basic4" id={row.order_id.toString() + "comment"} label="تعليق" variant="outlined" name={row.order_id.toString() + "comment"} type="text" />
=======
                                            <TextField className="outlined-basic4" id={row.order_id.toString() + "comment"} label="تعليق" variant="outlined" name={row.order_id.toString() + "comment"} />
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
                                            <TextField className="outlined-basic4" id={row.order_id.toString() + "goz2ii"} label="السعر" variant="outlined" name={row.order_id.toString() + "goz2ii"} type="number" />
                                            {+(row.far2Sha7n) !== 0
                                                ? < TextField className="outlined-basic4" InputProps={{ readOnly: true, }} id="outlined-basic4" variant="outlined" type="number" label="فرق شحن" name="far2Sha7n" value={row.far2Sha7n} required />
                                                : <TextField className="outlined-basic4" id={row.order_id.toString() + "far2Sha7n"} type="number" variant="outlined" label="فرق شحن" name={row.order_id.toString() + "far2Sha7n"} onChange={(e) => handelFar2Sha7n(row, e)} />

                                            }



                                            <Select disabled={row.btnState}
                                                labelId={row.order_id.toString() + "demo-simple-select-outlined-label"}
                                                id="outlined"
                                                name="selectt"
                                                onChange={handelSelecctkhara}
                                                className={classes.formCell}
                                                variant="outlined"

                                            >
                                                <MenuItem value={row.state}>
                                                    لا شيء
                                        </MenuItem>
                                                <MenuItem value={1} name="tawsel">
                                                    <Button className="btndone" disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                        تم التوصيل
                                            </Button>
                                                </MenuItem>
                                                <MenuItem value={3} name="sha7nRasel">
                                                    <Button className="btndone" disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                        شحن علي الراسل
                                            </Button>
                                                </MenuItem>
                                                <MenuItem value={4} name="daf3Sha7n">
                                                    <Button className="btndone" disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                        تم دفع الشحن
                                            </Button>
                                                </MenuItem>
                                                <MenuItem value={2} name="la8i">
                                                    <Button className="btndone" disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                        لاغي
                                            </Button>
                                                </MenuItem>


                                                <MenuItem value={5} name="goz2i">
                                                    <Button className="btndone" disabled={row.btnState} variant="contained" color="primary" onClick={handelBtn}>
                                                        مرتجع جزئي
                                            </Button>
                                                </MenuItem>
                                            </Select>
                                            {/*
                                                <MenuItem value={5} name="goz2i">
                                                    <Button disabled={row.btnState} variant="contained" color="primary" type="button" onClick={handleOpen}>
                                                        جزئي
                                            </Button>

                                                </MenuItem>
                                            */}



                                            {/* <Button variant="contained" color="primary" component="span" value={3}
                                        onClick={(e) =>handleChange(row,e)} >
                                        done             
                                    </Button> */}
                                            <Button className="btndone" id={row.order_id} variant="contained" color="primary" disabled={row.done} onClick={(e) => handleChange12(row, e)}>
                                                تم
                                            </Button>

                                            {/*  <Modal
                                                aria-labelledby="simple-modal-title"
                                                aria-describedby="simple-modal-description"
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                <div style={modalStyle} className={classes.paper}>
                                                    <h2 id="simple-modal-title">عدل بيانات الاوردر</h2>
                                                    <form className="goz2ii-data">
                                                        <TextField className={classes.root} id="outlined-basic2" label="السعر" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="price" required />
                                                        <TextField className={classes.root} id="outlined-number" label="سعر الشحن" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="shipping" required />
                                                        <Button id="btndone" variant="contained" color="primary" disabled={row.done12} onClick={(e) => handleChange12(row, e)}>
                                                            تم
                                                        </Button>
                                                        <Button id="close" variant="contained" color="secondary" disabled={row.done12} onClick={handleClose12} >
                                                            الغاء
                                                        </Button>
                                                    </form>
                                                </div>
                                          </Modal>*/}
                                        </form>
                                    </Container>
                                </StyledTableCell>


                            </StyledTableRow>
                        ))}

                    </TableBody>

                </Table>
                <form id="deliveryCalc">
                    <TextField id="outlined-basic6" label="حساب المندوب" variant="outlined" name="deliverydayCalc" type="number" />

                    <Button className="btndone" disabled={calcFinish} id="btn123456789" variant="contained" color="primary" onClick={handleChangeDelivery}>
                        تم
            </Button>
                </form>
            </TableContainer>

        </div >
    );
}
