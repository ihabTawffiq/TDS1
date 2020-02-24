
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../style/base.css';
import { NavLink } from 'react-router-dom';
import logo from '../style/logo.png';


export default function Nav() {

  const [setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper>
      
      <Tabs
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        scrollButtons="auto"

      >
        <img src={logo} alt="Logo" />
        <NavLink className="nav-link_IT" exact to='/delivery'><Tab label="المناديب" /></NavLink>
        <NavLink className="nav-link_IT" exact to='/order'><Tab label="الاوردرات" /></NavLink>
        <NavLink className="nav-link_IT" exact to='/FilterBy'><Tab label="بحث بالتاريخ" /></NavLink>
        <NavLink className="nav-link_IT" exact to='/FilterByClient'><Tab label="بحث بالعميل" /></NavLink>
        <NavLink className="nav-link_IT" exact to='/Search'><Tab label="بحث" /></NavLink>
        <NavLink className="nav-link_IT" exact to='/ChooseDelivert'><Tab label="توزيع اوردرات" /></NavLink>
        <NavLink className="nav-link_IT" exact to='/DeliveryOrders'><Tab label="حساب المناديب" /></NavLink>
        {/* <NavLink className="nav-link_IT" exact to='/clientProfile'><Tab label="7esab el 3amel" /></NavLink> */}
        <NavLink className="nav-link_IT" exact to='/Calc'><Tab label="حساب العملاء" /></NavLink>


      </Tabs>
    </Paper>
  );
}





























// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   Nav,
//   NavItem,
//   NavLink,
//   NavbarText
// } from 'reactstrap';

// const NavBar = (props) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       <Navbar id="v" className="nav"  color="light" light expand="md">

//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mr-auto" navbar>
//           <NavItem>
//               <NavLink href="/">Client</NavLink>
//             </NavItem>  
//             <NavItem>
//               <NavLink href="/order">Order</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/delivery">Delivery</NavLink>
//             </NavItem>
//           </Nav>
//           <NavbarText>TDS</NavbarText>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// }

// export default NavBar;




