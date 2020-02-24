import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";
import swal from 'sweetalert';
import { db } from '../services/firebase';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import '../style/base.css'


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



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables(props) {
    const rows = props.orders
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell id="tbh" >ID</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">العميل</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">اليوم</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">السعر</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">الشحن</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">فرق الشحن</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">العنوان</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">الموبايل</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">اسم العميل</StyledTableCell>
                        <StyledTableCell id="tbh" align="right">إزالة اوردر</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (

                        <StyledTableRow key={[row.order_id]}>
                            <StyledTableCell id="cell" component="th" scope="row">
                                {row.order_id}
                            </StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.client}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{moment(row.date.toDate()).format('l')}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.price}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.shipping}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.far2Sha7n || "0"}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.adress}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.mobile}</StyledTableCell>
                            <StyledTableCell id="cell" align="right">{row.clientName}</StyledTableCell>
                            <StyledTableCell id="cell" align="right"><Button onClick=
                                {
                                    e => {
                                        e.preventDefault()

                                        swal("متاكد عايز تمسح الاوردر ده؟", {
                                            dangerMode: true,
                                            buttons: {
                                                Ok: "OK",
                                                cancel: "Cancel"
                                            }
                                        })
                                            .then((value) => {
                                                console.log(row.IDss)
                                                switch (value) {
                                                    case "Ok":
                                                        db.collection('orders').doc(row.IDss).delete();
                                                        swal("الاوردر تم مسحه", " ", "success");
                                                        break

                                                    default:
                                                        swal("مافيش حاجه اتمسحت")
                                                }

                                            })



                                    }
                                }
                                variant="contained" id="btn" startIcon={<DeleteIcon align="center" />}> Delete
                           </Button> </StyledTableCell>

                        </StyledTableRow>

                    ))}

                </TableBody>
            </Table>
        </TableContainer >
    );
}
