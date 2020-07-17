import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { NavLink } from 'react-router-dom';
import logo from '../style/logo.png';
import Container from '@material-ui/core/Container';
import '../style/base.css';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <nav className="Navbar" id="contlogo" >
        <img src={logo} alt="logo.png" />
      </nav>
      <AppBar position="static" id="nav">

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <NavLink className="nav-link_IT" exact to='/'><Tab id="tab" label="العملاء" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/delivery'><Tab id="tab" label="المناديب" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/order'><Tab id="tab" label="الاوردرات" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/FilterBy'><Tab id="tab" label="بحث بالتاريخ" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/FilterByClient'><Tab id="tab" label="بحث بالعميل" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/Search'><Tab id="tab" label="بحث" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/ChooseDelivert'><Tab id="tab" label="توزيع اوردرات" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/DeliveryOrders'><Tab id="tab" label="حساب المناديب" /></NavLink>
          {/* <NavLink className="nav-link_IT" exact to='/clientProfile'><Tab label="7esab el 3amel" /></NavLink> */}
          <NavLink className="nav-link_IT" exact to='/Calc'><Tab id="tab" label="حساب العملاء" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/Discarded'><Tab id="tab" label=" المرتجعات" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/calcCards'><Tab id="tab" label=" دفتر العملاء" /></NavLink>
          <NavLink className="nav-link_IT" exact to='/moreOrders'><Tab id="tab" label="دفتر المناديب" /></NavLink>

        </Tabs>
      </AppBar>

    </div>
  );
}
