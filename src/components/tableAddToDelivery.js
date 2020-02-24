import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import Container from '@material-ui/core/Container';
import '../style/base.css'






const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 200,

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

    useEffect(() => {

        db.collection("orders").where("state", "==", -1)
            .onSnapshot(function (querySnapshot) {
                var orders = [];
                const IDs = []
                querySnapshot.forEach(function (doc) {
                    orders.push(doc.data());
                    IDs.push(doc.id);
                });
                orders.sort((a, b) => {
                    if (a.order_id > b.order_id) {
                        return -1
                    } else
                        return 1
                })
                setRows(orders)
                setIDs(IDs)
                setFilterOrders(orders)
            });

    }, [])



    const handleChange = event => {
        setDelivery(event.target.value);

    };
    const handelSearch = (e) => {
        const target = + e.target.value
        const filtered = rows.filter(order => {
            return (order.order_id === target)

        })
        if (filtered.length === 0)
            setFilterOrders(rows)
        else setFilterOrders(filtered)

    }
    const handelAdd = (ID, e) => {
        e.preventDefault();
        if (delivery === 'E5tar mandob') {
            console.log("matnsash el style ya OSOS")
        } else {


            db.collection("orders").where("state", "==", -1)
                .onSnapshot(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (doc.data().order_id === ID) {

                            db.collection('orders').doc(doc.id).update({ state: 0, delivery: delivery })
                        }
                    });

                })
        }
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

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell id="tbh">ID</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">العميل</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">اليوم</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">السعر</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">الشحن</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">العنوان</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">الموبايل</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">اسم العميل</StyledTableCell>
                            <StyledTableCell id="tbh" align="right">أضف الأورد للمندوب || ({filterOrders.length})</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {filterOrders.map(row => (
                            <StyledTableRow key={[row.order_id]}>
                                <StyledTableCell id="cell" component="th" scope="row">
                                    {row.order_id}
                                </StyledTableCell>
                                <StyledTableCell id="cell" align="right">{row.client}</StyledTableCell>
                                <StyledTableCell id="cell" align="right">{moment(row.date.toDate()).format('dddd')}</StyledTableCell>
                                <StyledTableCell id="cell" align="right">{row.price}</StyledTableCell>
                                <StyledTableCell id="cell" align="right">{row.shipping}</StyledTableCell>
                                <StyledTableCell id="cell" align="right">{row.adress}</StyledTableCell>
                                <StyledTableCell id="cell" align="right">{row.mobile}</StyledTableCell>
                                <StyledTableCell id="cell" align="right">{row.clientName}</StyledTableCell>
                                <StyledTableCell id="cell" align="right">
                                    <Button onClick={(e) => handelAdd(row.order_id, e)}
                                        variant="contained" id="btndelivery"
                                        startIcon={<AddShoppingCartIcon />}
                                        disabled={btnDisable}

                                    > إضافة
                                </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}
