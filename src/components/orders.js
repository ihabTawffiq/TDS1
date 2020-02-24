import React from 'react';
import { db } from '../services/firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from "./table";
import '../style/base.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import swal from "sweetalert";
import moment from 'moment';
import Container from '@material-ui/core/Container';


const styles = theme => ({
  root: {
    border: 0,
    margin: theme.spacing(1),

  },
});



class Order extends React.Component {


  state = {
    shipping: null,
    mobile: null,
    price: null,
    order: [],
    adress: null,
    order_id: 0,
    dayOrders: [],
    day: new Date(),
    clients: [],
    client: "اختار عميل",
    btnState: false,
    dof3a: 0,
    far2Sha7n: 0

  };




  componentDidMount() {
    db.collection('clients')
      .onSnapshot(snapshot => {
        const clients = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          clients.push(data);
        });
        this.setState({ clients: clients });

      })
    let maxID = 0
    db.collection('orders')
      .onSnapshot(snapshot => {
        const orders = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.order_id > maxID) {
            maxID = data.order_id
          }
          data["IDss"] = doc.id
          orders.push(data);
        });
        const order_id = maxID
        orders.sort((a, b) => {
          if (a.order_id > b.order_id) {
            return -1
          } else
            return 1
        })
        this.setState({
          order: orders,
          order_id: Number(order_id)
        });
      })

  };


  addOrder = (e) => {

    const form = document.querySelector('#add3');
    if (form.adress.value !== "" && form.price.value !== ""
      && form.shipping.value !== "" && this.state.client !== ""
      && this.state.client !== "اختار عميل" && form.far2Sha7n.value !== "") {

      let numberOfCurrentOrders = Number(this.state.numberOfCurrentOrders)
      numberOfCurrentOrders++
      e.preventDefault();
      db.collection('orders')
        .add({
          delivery: null,
          client: this.state.client,
          adress: form.adress.value,
          mobile: form.mobile.value,
          price: form.price.value,
          shipping: form.shipping.value,
          far2Sha7n: +(form.far2Sha7n.value),
          date: new Date(),
          order_id: Number(this.state.order_id) + 1,
          clientName: form.clientName.value,
          state: -1
        })
      /*
            db.collection('orders')
      
              .onSnapshot(snapshot => {
                const orders = [];
                const ides = [];
                snapshot.forEach(doc => {
                  const data = doc.data();
                  const datt = doc.id;
                  orders.push(data);
                  ides.push(datt);
                });
                orders.sort((a, b) => {
                  if (a.order_id > b.order_id) {
                    return -1
                  } else
                    return 1
                })
                this.setState({
                  order: orders,
                  ides: ides,
      
                });
              })
      */
      this.setState({
        order_id: Number(this.state.order_id) + 1,
        numberOfCurrentOrders: numberOfCurrentOrders,
      })
    } else if (this.state.client === "اختار عميل" || this.state.client === "") {

      swal("ماتختار يابني العميل ... ماصباح الفل بقي", {
        dangerMode: true,
        buttons: {
          Ok: "ماشي لامواخذة نسيت"
        }
      })
    } else if (form.price.value === "") {

      swal("اباااا حط السعر  بقي ماتتعبوناش معاكم", {
        dangerMode: true,
        buttons: {
          Ok: "ماشي لامواخذة نسيت"
        }
      })

    } else if (form.shipping.value === "") {
      swal("اباااا حط الشحن  بقي ماتتعبوناش معاكم", {
        dangerMode: true,
        buttons: {
          Ok: "ماشي لامواخذة نسيت",
        }
      })
    }
    else if (form.adress.value === "") {

      swal("اباااا حط العنوان بقي ماتتعبوناش معاكم", {
        dangerMode: true,
        buttons: {
          Ok: "ماشي لامواخذة نسيت"
        }
      })
    }

  };

  handelSelectClient = (e) => {
    let dof = 0
    db.collection('clients').where('name', '==', e.target.value)
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          const totalCalc = doc.data().totalCalc;
          totalCalc.forEach(bob => {
            if (moment(bob.day.toDate()).format('l') === moment(new Date()).format('l')) {
              dof = +(bob.dof3a)
              this.setState({

                dof3a: +(bob.dof3a),
                btnState: false
              })
              console.log("ssss", dof)
            }
          })
        });
      })

    this.setState({
      client: e.target.value,
      dof3a: dof,
      btnState: false
    })
  }

  addDof3a = (e) => {
    const form = document.querySelector('#add2');
    db.collection("clients").where("name", "==", this.state.client)
      .get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const totalCalc = doc.data().totalCalc || []
          let i = 0;

          totalCalc.forEach(bob => {

            if (moment(bob.day.toDate()).format('l') === moment(new Date()).format('l')) {
              bob.dof3a += +(form.dof3a.value)

            } else {
              i++;
            }
          })

          if (i === totalCalc.length) {

            totalCalc.push({
              day: new Date(),
              total: 0,
              dof3a: +(form.dof3a.value)
            })

          }

          db.collection('clients').doc(doc.id).update({ totalCalc: totalCalc })
        });


      });
    this.setState({
      btnState: true,
      dof3a: this.state.dof3a + +(form.dof3a.value)
    })
  }
  render() {
    const { classes } = this.props;


    return (
      <div className="FormField">

        <select name='client' value={this.state.client} onChange={this.handelSelectClient} required >
          <option value="">{this.state.client}</option>
          {this.state.clients.map(cl => <option value={cl.name}>{cl.name}</option>)}
        </select>
      <h1>الدفعات الحالية ل{this.state.client === "اختار عميل" ? "..." : this.state.client} : {this.state.dof3a}</h1>
        <form id="add2" onSubmit={this.addDof3a}>
          {console.log(this.state.dof3a)}
          <TextField
            id="outlined-basic2"
            label="دفعة"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name="dof3a"
          />           

          <Button id="btnorder2" variant="contained" color="primary" onClick={this.addDof3a} disabled={this.state.btnState}>
            إضافة دفعة
          </Button>
        </form>

            <h1>  إضافة أوردر جديد </h1>
          <Container id="cont">
        <form id="add3" onSubmit={this.addOrder} key={Math.random()}>
          <TextField className={classes.root} InputProps={{ readOnly: true, }} id="outlined-basic2" variant="outlined" label="ID" name="order_id" value={this.state.order_id + 1} required />
          <TextField className={classes.root} id="outlined-basic2" label="السعر" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="price" required />
          <TextField className={classes.root} id="outlined-number" label="سعر الشحن" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="shipping" required />
          <TextField className={classes.root} id="outlined-basic2" defaultValue="0" label="فرق الشحن" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="far2Sha7n" required />
          <TextField className={classes.root} id="outlined-basic2" label="الموبايل" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="mobile" required />
          <TextField className={classes.root} id="outlined-basic2" label="العنوان" variant="outlined" name="adress" required />
          <TextField className={classes.root} id="outlined-basic2" label="اسم العميل" variant="outlined" name="clientName" required />
          <Button variant="contained" id="btnorder" onClick={this.addOrder}>
            أضف
          </Button>
        </form>
        </Container>
        <Table orders={this.state.order} dof3at={this.state.dof3at} />

      </div >
    )

  }
}



Order.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Order);
