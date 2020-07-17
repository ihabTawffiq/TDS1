import React from 'react';
import { db } from '../services/firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from "./table";
import '../style/base.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import swal from "sweetalert";
import swal2 from "sweetalert2";
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import { addOrder } from '../store/actons/addOrder'
import firebase from '../services/firebase';

const styles = theme => ({
  root: {
    border: 0,
    margin: theme.spacing(1),

  },
});
const functions = firebase.functions()
const addOrderFunction = functions.httpsCallable("addOrder")
const addDof3aFunction = functions.httpsCallable("addDof3a")

class Order extends React.Component {

  state = {

    shipping: null,
    mobile: null,
    price: null,
    order: [],
    adress: null,
    dayOrders: [],
    clients: [],
    client: "اختار عميل",
    btnState: false,
    dof3a: 0,
    far2Sha7n: 0,
    data: {}


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
        orders.sort((a, b) => {
          if (a.date > b.date) {
            return -1
          } else
            return 1
        })
        this.setState({
          order: orders,
        });
      })

  };


  addOrder = (e) => {

    const form = document.querySelector('#add3');
    if (form.adress.value !== "" && form.price.value !== ""
      && form.shipping.value !== "" && this.state.client !== ""
      && this.state.client !== "اختار عميل" && form.far2Sha7n.value !== "") {


      e.preventDefault();

      // this.props.addOrder({
      //   delivery: null,
      //   client: this.state.client,
      //   adress: form.adress.value,
      //   mobile: form.mobile.value,
      //   price: form.price.value,
      //   shipping: form.shipping.value,
      //   far2Sha7n: +(form.far2Sha7n.value),
      //   date: new Date(),
      //   order_id: Number(this.state.order_id) + 1,
      //   clientName: form.clientName.value,
      //   state: -1,
      //   done: false

      // })
      swal(

        {
          text: "جاري اضافة الاوردر" + "برجاء الانتظار ....",
          buttons: false,
          closeOnClickOutside: false,

        }
      );
      addOrderFunction({
        client: this.state.client,
        adress: form.adress.value,
        mobile: form.mobile.value,
        price: form.price.value,
        shipping: form.shipping.value,
        far2Sha7n: +(form.far2Sha7n.value),
        clientName: form.clientName.value

      }).then((response) => {


        swal("تم اضافة اوردر", "...", "success");

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

    } else if (this.state.client === "اختار عميل" || this.state.client === "") {

      swal("يادي النيلة...", "ماتختار يابني العميل ... ماصباح الفل بقي", "error")
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
    let d = 0
    db.collection('clients').where('name', '==', e.target.value)
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          d = doc.data().dof3a
        })
      })



    this.setState({
      client: e.target.value,
      dof3a: d,
      btnState: false
    })
  }
  finishDof3a = (e) => {
    db.collection("clients").where("name", "==", this.state.client)
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          db.collection('clients').doc(doc.id).update({ dof3a: 0 })
        })
      })
  }
  addDof3a = (e) => {
    const form = document.querySelector('#add2');
    let dof11 = +form.dof3a.value
    db.collection("clients").where("name", "==", this.state.client)
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          dof11 += doc.data().dof3a
          db.collection('clients').doc(doc.id).update({ dof3a: dof11 })
        })
      })

    // .then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     const totalCalc = doc.data().totalCalc || []
    //     let i = 0;

    //     totalCalc.forEach(bob => {

    //       if (moment(bob.day.toDate()).format('l') === moment(new Date()).format('l')) {
    //         bob.dof3a += +(form.dof3a.value)

    //       } else {
    //         i++;
    //       }
    //     })

    //     if (i === totalCalc.length) {

    //       totalCalc.push({
    //         day: moment(new Date()).format('L'),
    //         total: 0,
    //         dof3a: +(form.dof3a.value)
    //       })

    //     }

    //     db.collection('clients').doc(doc.id).update({ totalCalc: totalCalc })
    //   });


    // });
    this.setState({
      dof3a: dof11,
      btnState: true,

    })
    let msg = " تم اضافة دفعة بملغ " + form.dof3a.value + " للعميل : " + this.state.client

    swal("تم اضافة دفعة!", msg, "success");
  }
  render() {
    const { classes } = this.props;
    console.log("Redux Test", this.props)

    return (
      <div className="FormField">

        <select name='client' value={this.state.client} onChange={this.handelSelectClient} required >
          <option value="">{this.state.client}</option>
          {this.state.clients.map(cl => {

            return <option value={cl.name}>{cl.name + " : " + cl.dof3a}</option>
          })}
        </select>

        <form id="add2" onSubmit={this.addDof3a}>

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
          <Button id="btnorder2" variant="contained" color="primary" onClick={this.finishDof3a} >
            انهاء الدفعة
        </Button>
        </form>

        <h1>  إضافة أوردر جديد </h1>
        <Container id="cont">
          <form id="add3" onSubmit={this.addOrder} key={Math.random()}>
            <TextField className={classes.root} id="outlined-basic2" label="السعر" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="price" required />
            <TextField className={classes.root} id="outlined-number" label="سعر الشحن" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="shipping" required />
            <TextField className={classes.root} id="outlined-basic7" defaultValue="0" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="far2Sha7n" required />
            <TextField className={classes.root} id="outlined-basic2" label="الموبايل" type="number" variant="outlined" InputLabelProps={{ shrink: true, }} name="mobile" required />
            <TextField className={classes.root} id="outlined-basic2" label="العنوان" variant="outlined" name="adress" required />
            <TextField className={classes.root} id="outlined-basic2" label="اسم العميل" variant="outlined" name="clientName" required />
            <Button variant="contained" id="btnorder" onClick={this.addOrder}>
              أضف
          </Button>
          </form>
        </Container>
        <Table orders={this.state.order} delete={true} dof3at={this.state.dof3at} />

      </div >
    )

  }
}



Order.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapDispatchToProps = (dispatch) => {
  return {
    addOrder: (order) => dispatch(addOrder(order))
  }
}
export default withStyles(styles)(connect(null, mapDispatchToProps)(Order));
