import React from 'react';
import { db } from '../services/firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../style/base.css';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import swal from "sweetalert";
import ClientSheet from './delivery-sheet';
import moment from "moment";
const styles = theme => ({
  root: {
    border: 0,
    margin: theme.spacing(1),

  },
});




class Delivery extends React.Component {

  state = {
    name: null,
    mobile: null,
    delivery: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.mobile]: e.target.value,
      [e.target.delivery]: e.target.value
    })

  };

  componentDidMount() {

    db.collection('delivery')
      .get()
      .then(snapshot => {
        const delivery = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          delivery.push(data);
        });
        this.setState({ delivery: delivery });
        console.log(snapshot);
      })
      .catch(error => console.log(error));
  };

  addDB = (e) => {
    const form = document.querySelector('#add0');
    e.preventDefault();
    db.collection('delivery')
      .add({
        name: form.name.value,
        mobile: form.mobile.value,
        calc: [{ "day": moment(new Date()).format('L'), "total": 0 }]
      })
    let msg = " تم اضافة مندوب جديد باسم :  " + form.name.value
    swal("  تم اضافة مندوب جديد ", msg, "success");
    form.name.value = '';
    form.mobile.value = '';
  };


  render() {
    const { classes } = this.props;

    return (


      <div className="App">

        <h1>إضافة مندوب</h1>

        <Container  >


          <form id="add0"  >

            <TextField className={classes.root} id="outlined-basic" label="الاسم" variant="outlined" name="name" onChange={this.handleChange.bind(this)} />

            <TextField className={classes.root} id="outlined-basic" label="الموبايل" variant="outlined" name="mobile" onChange={this.handleChange.bind(this)} />

            <Button variant="contained" id="add-btn" onClick={this.addDB.bind(this)}>
              أضف
                  </Button>

            <br />
            <br />
          </form>
        </Container>
        <ClientSheet />
      </div>
    )
  }
}

Delivery.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Delivery);