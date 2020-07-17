
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { db } from '../services/firebase';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
<<<<<<< HEAD
import Container from '@material-ui/core/Container';

=======
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import moment from "moment";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../style/base.css';
import { NavLink } from 'react-router-dom';
import { set } from 'date-fns';
const useStyles = makeStyles({
    root: {
        margin: "0 auto",
        textAlign: "center",
        maxWidth: "80%",
        direction: "rtl"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    FormControl: {
<<<<<<< HEAD
        margin: "0 auto",
        minWidth: 200,
    },  
    selectEmpty: {
        minWidth: 200,
    },
=======
        margin: "0 auto"
    }
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
});
export default function SimpleCard() {
    const classes = useStyles();
    const [clients, setClients] = React.useState([])
    const [clientname, setClientname] = React.useState("")
    const [cards, setCards] = React.useState([])
    const [clientcalc, setClientcalc] = React.useState("")
    const [clientmobile, setClientmobile] = React.useState("")
    const clientss = []
    React.useEffect(() => {
        db.collection('clients')
            .get()
            .then(snapshot => {
                const delivery = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    delivery.push(data);
                });
                setClients(delivery);
            })
            .catch(error => console.log(error));
        db.collection('clc_finished')
            .get()
            .then(snapshot => {
                const cards1 = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    cards1.push(data);
                });
                setCards(cards1);
            })
            .catch(error => console.log(error));

    }, [])


    console.log(clientss)

    function handelSelectClient(e) {

        setClientname(e.target.value)
        db.collection('clc_finished').where('client', '==', e.target.value)
            .get()
            .then(snapshot => {
                const cards1 = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    cards1.push(data);
                });
                setCards(cards1);
            })
            .catch(error => console.log(error));



    }


    return (
<<<<<<< HEAD
        <div >
            <Container id="contselect" >
            <FormControl required className={classes.formControl}>

=======
        <div className="card-container">

            <FormControl required className={classes.formControl} className='select-card'>
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
                <InputLabel id="demo-simple-select-required-label">اختار المندوب</InputLabel>
                <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={[clients][0].name}
                    onChange={handelSelectClient}
                    className={classes.selectEmpty}
                >

                    {clients.map(delivery => <MenuItem value={delivery.name}>{delivery.name}</MenuItem>)}


                </Select>
<<<<<<< HEAD
            </FormControl>

            </Container>
            <Container className="card-container">

=======

            </FormControl>
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
            {cards.map(card => {
                return (
                    <Card className={classes.root} className="card-boody" >
                        <CardContent>
                            <Typography variant="h5" component="h2">
<<<<<<< HEAD
                                <h3> {card.client} </h3>

                            </Typography>
                            <Typography variant="h5" component="h2" className={classes.title} color="textSecondary" gutterBottom>
                                <h4> {moment(card.day.toDate()).format('LL')}</h4>
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                <h4> {" عدد الاوردارات : " + card.orders.length} </h4>
                            </Typography>
                            <Typography variant="body2" component="p">
                                <h4> {" اجمالي الحساب : " + card.total}</h4>
=======
                                <h1> {card.client} </h1>

                            </Typography>
                            <Typography variant="h5" component="h2" className={classes.title} color="textSecondary" gutterBottom>
                                <h2> {moment(card.day).format('LL')}</h2>
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                <h2> {" عدد الاوردارات : " + card.orders.length} </h2>
                            </Typography>
                            <Typography variant="body2" component="p">
                                <h2> {" اجمالي الحساب : " + card.total}</h2>
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14

                            </Typography>
                        </CardContent>



                    </Card>)
            })}
<<<<<<< HEAD
            </Container>

=======
>>>>>>> 47376ffc458fe4e2fab127daa1c6300adbb09b14
        </div >
    );
}
