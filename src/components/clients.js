import React from 'react';
import { db } from '../services/firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ClientSheet from './client-sheet';
import '../style/base.css';
import PropTypes from 'prop-types';
import swal from "sweetalert";


const styles = theme => ({
  root: {
    border: 0,
    margin: theme.spacing(1),

  },
});





class Client extends React.Component {



  state = {
    name: null,
    mobile: null,
    client: null,
    region: null,
    client_id: 0,
  };

  makeStyles = (theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: 200,
      },
    },
  }));


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.mobile]: e.target.value,
      [e.target.client]: e.target.value,
      [e.target.region]: e.target.value,
    })

  };

  componentDidMount() {

  };



  addDB = (e) => {
    const form = document.querySelector('#add');
    console.log(form)
    e.preventDefault();
    db.collection('clients')
      .add({
        name: form.name.value,
        mobile: form.mobile.value,
        region: form.region.value,
        client_id: Number(this.state.client_id) + 1,
        totalCalc: [{
          day: new Date(),
          dof3a: 0,
          total: 0
        }]
      })
    let msg = "تم اضافة عميل :  " + form.name.value
    swal("تم اضافة عميل ", msg, "success");
    form.name.value = '';
    form.mobile.value = '';
    form.region.value = '';
  };


  render() {
    const { classes } = this.props;


    return (

      <div  >
        <h1>إضافة عميل</h1>
        <Container id="contanier" maxWidth="md">

          <form id="add">
            <TextField className={classes.root} id="outlined-basic" label="الاسم" variant="outlined" name="name" onChange={this.handleChange.bind(this)} />
            <TextField className={classes.root} id="outlined-basic" label="الموبايل" variant="outlined" name="mobile" onChange={this.handleChange.bind(this)} />
            <TextField className={classes.root} id="outlined-basic" label="المنطقة" variant="outlined" name="region" onChange={this.handleChange.bind(this)} />
            <Button id="add-btn" variant="contained" onClick={this.addDB.bind(this)}>أضف</Button>
          </form>
        </Container>


        <ClientSheet />
      </div>
    )
  }
}
Client.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Client);






















