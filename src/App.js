import React from 'react';
import { Component } from 'react';
<<<<<<< HEAD
// import { Route, BrowserRouter } from 'react-router-dom';
// import Client from './components/clients';
// import Delivery from './components/delivery';
// import Order from './components/orders';
// import Nav from './components/newNav';
// import FilterBy from './components/filterby';
// import FilterByClient from './components/filterbyclient';
// import Search from './components/search';
// import ChooseDelivert from './components/addorderfordelivery';
// import DeliveryOrders from './components/deliveryOrders';
// import clientProfile from './components/selectClient';
// import Calc from './components/calc';
 import Home from './components/Home';
 import firebase from './services/firebase'

=======
import { Route, BrowserRouter } from 'react-router-dom';
import Client from './components/clients';
import Delivery from './components/delivery';
import Order from './components/orders';
import Nav from './components/newNav';
import FilterBy from './components/filterby';
import FilterByClient from './components/filterbyclient';
import Search from './components/search';
import ChooseDelivert from './components/addorderfordelivery';
import DeliveryOrders from './components/deliveryOrders';
import clientProfile from './components/selectClient';
import Calc from './components/calc';
import Discarded from './components/discarded'
import calcCards from './components/calc-cards'
import moreOrders from './components/more-orders'
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
import './style/base.css';
import Login from './components/login'





class App extends Component {

  constructor(props){
      super(props);
      this.state={
          user:{}

      }
  }

  componentDidMount(){
    this.authListener();
  }
  authListener(){
      firebase.auth().onAuthStateChanged((user)=>{
          if(user){
            this.setState({user})
          }else{
            this.setState({user : null})
          }
      })
  }




  render() {
    return (
<<<<<<< HEAD

      
      
          <div className="App" >
            {this.state.user ? (<Home/>) : (<Login/>)}
          
            
          </div>

      // <BrowserRouter>
      //   <div>

      //     <Nav />
      //     <Route exact path='/' component={Client} />
      //     <Route exact path='/Delivery' component={Delivery} />
      //     <Route exact path='/Order' component={Order} />
      //     <Route exact path='/FilterBy' component={FilterBy} />
      //     <Route exact path='/FilterByClient' component={FilterByClient} />
      //     <Route exact path='/Search' component={Search} />
      //     <Route exact path='/ChooseDelivert' component={ChooseDelivert} />
      //     <Route exact path='/DeliveryOrders' component={DeliveryOrders} />
      //     <Route exact path='/clientProfile' component={clientProfile} />
      //     <Route exact path='/Calc' component={Calc} />


      //   </div>
      // </BrowserRouter>
=======
      // <div>
      //   <Order/>
      //   <Calc/>

      // </div>

      <BrowserRouter>
        <div>

          <Nav />
          <Route exact path='/' component={Client} />
          <Route exact path='/Delivery' component={Delivery} />
          <Route exact path='/Order' component={Order} />
          <Route exact path='/FilterBy' component={FilterBy} />
          <Route exact path='/FilterByClient' component={FilterByClient} />
          <Route exact path='/Search' component={Search} />
          <Route exact path='/ChooseDelivert' component={ChooseDelivert} />
          <Route exact path='/DeliveryOrders' component={DeliveryOrders} />
          <Route exact path='/clientProfile' component={clientProfile} />
          <Route exact path='/Calc' component={Calc} />
          <Route exact path='/Discarded' component={Discarded} />
          <Route exact path='/CalcCards' component={calcCards} />
          <Route exact path='/moreOrders' component={moreOrders} />



        </div>
      </BrowserRouter>
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
    );
  }
}

export default App;


















// Test1
// class App extends React.Component{

//   render(){
//       return(
//         <div>
//            {/* <Client/>

//           <Delivery/> */}
//     <div className="App__form"></div>
//     <div className="App__Aside"></div>
//         </div>
//       )
//   }
// }

// export default App;








//Test 2 
// <Router basename="/react-auth-ui/">
      //   <div className="App">
      //     <div className="App__Aside"></div>
      //     <div className="App__Form">
      //       <div className="PageSwitcher">
      //           <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
      //           <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
      //         </div>

      //         <div className="FormTitle">
      //             <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
      //         </div>


      //         <Route path="/sign-in" component={Client}>
      //         </Route>
      //     </div>

      //   </div>
      // </Router>