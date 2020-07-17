import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { db } from '../services/firebase';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';
import '../style/base.css';




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





class ClientSheet extends React.Component {




  state = {
    name: null,
    mobile: null,
    client: null,
    region: null,

  };


  componentDidMount() {

    db.collection('delivery')

      .onSnapshot(snapshot => {
        const clients = [];
        const ids = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const dat = doc.id;
          clients.push(data);
          ids.push(dat)

        });

        this.setState({
          clients: clients,
          ids: ids


        });

      })
  };

  s = () => {
    console.log(this.state.ids[0]);
  }

  S

  render() {


    return (
      <TableContainer >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* Headline of table */}
              <StyledTableCell id="tbh" align="center">اسم المندوب</StyledTableCell>
              <StyledTableCell id="tbh" align="center">الموبايل</StyledTableCell>
              <StyledTableCell id="tbh" align="center">إزالة عميل</StyledTableCell>
            </TableRow>
          </TableHead>



          <TableBody id="row-sheet">


            {this.state.clients && this.state.clients.map((client, index) => {


              return (
                // Content of Table
                <StyledTableRow id="cell" name="client-dd" >
                  <StyledTableCell id="cell" name="name" align="center" component="th" scope="row">{client.name}</StyledTableCell>
                  <StyledTableCell id="cell" name="mobile" align="center">{client.mobile}</StyledTableCell>
                  <StyledTableCell id="cell" name="button" align="center">
                    <Button onClick=
                      {
                        e => {
                          e.preventDefault()

                          swal("متاكد عايز تمسح المندوب ده؟", {
                            dangerMode: true,
                            buttons: {
                              Ok: "OK",
                              cancel: "cancel"
                            }
                          })
                            .then((value) => {
                              switch (value) {
                                case "Ok":
                                  db.collection('delivery').doc(this.state.ids[index]).delete();
                                  swal("المندوب تم مسحه", " ", "success");
                                  break

                                default:
                                  swal("مافيش حاجه اتمسحت")
                              }

                            })



                        }
                      }
                      variant="contained" id="btn" startIcon={<DeleteIcon align="center" />}> Delete
                                           </Button>
                  </StyledTableCell>


                </StyledTableRow>

              )
            })
            }
          </TableBody>




        </Table>
      </TableContainer>
    )
  }
}

export default ClientSheet;