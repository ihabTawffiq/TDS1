import React from 'react';
/*material-ui imports...you must install material-ui/core to import like this...example: npm install @material-ui/core*/
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SweetAlert from 'sweetalert2-react';
import '../style/base.css';
import logo from '../style/logo.png';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import firebase from '../services/firebase'





  
//Email regex to validate the form of the email
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({formErrors, ...rest }) => {
    let valid = true;

    //validate the formErrors length
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });

    //validate the formInput's values length
    Object.values(rest).forEach(value => {
        value == null && (valid = false)
    });

    return valid;
}



class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            formErrors: {
                email: "",
                password: ""
            },
            show: false
        };
    }

    
    
    //submit function to handle the errors and submission
    handleSubmit = e => {
        e.preventDefault();
        if(formValid(this.state)){
            firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
                console.log(u)
            }).catch((err)=>{
                console.log(err);
            })
            
        }else{
            console.error("form invalid - display", this.state.show);
            this.state.show =  true;
            console.log(this.state.show);
        }
    }


    //function to handle the changes in the inputs and to set the errors in the form errors array in state
    handleChange = e => {
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;
        
        switch (name){
          
            case 'email':
                formErrors.email = emailRegex.test(value) 
                    ? '' 
                    : "Invalid email address";
                break;
            case 'password':
                formErrors.password = value.length < 6 //if the password is < 6 put this text in the password field in the formerrors array 
                    ? "the password length must be at least 6" 
                    : "";
                break;
            default:
                break;
        }

        //storing the data in the state
        this.setState({formErrors, [name] : value}, () => {
            console.log(this.state);
        })
    }
    
    render(){
         
        const {formErrors} = this.state;

        return(
            <div>
            <div id="bglogin" >
                

                <Hidden  only={['xs']}>
                    <Container  id="contnav">
                    <nav className="Navbar" >
                        <img id="contlogo" src={logo} alt="logo.png"/>
                    </nav>
                    </Container>
                </Hidden>
                <Hidden  only={['lg', 'md', 'sm', 'xl']}>
                    <nav className="Navbar" id="contnavxs" >
                        <img id="contlogoxs" src={logo} alt="logo.png"/>
                    </nav>
                </Hidden>



                    <Container id="contcont">

                    <Container className = "login-container-Tm" maxWidth="sm"  >
                        <h1 className = "login-head-Tm"> تسجيل الدخول</h1>
                        <form onSubmit = {this.handleSubmit}  >

                           
                                
                               <Container container spacing = {3} id="cont-textfield">

                                    <TextField 
                                        id="outlined-basic2"
                                        label="الإيميل"
                                        onChange = {this.handleChange} 
                                        className={formErrors.email.length > 0 ? "error" : null}
                                        margin="normal"
                                        variant="outlined"
                                        name = "email"
                                        fullWidth
                                        />
                                    {
                                        formErrors.email.length > 0 && (
                                            <span className = "signUpForm-error-Tm">{formErrors.email}</span>
                                            )
                                        }
                                
                               </Container>
                                
                                <Container>
                                    <TextField 
                                        id="outlined-password-input2"
                                        label="كلمة المرور"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        name = "password"
                                        fullWidth
                                        onChange = {this.handleChange}
                                        container spacing = {3}
                                        />
                                
                                    {
                                        formErrors.password.length > 0 && (
                                            <span className = "login-error-Tm">{formErrors.password}</span>
                                            )
                                        }
                                
                                

                                </Container>
                                    {
                                        
                                        <Button 
                                        type = "submit"
                                            id ="btn-login"
                                            onClick={(e) => { //choosing when to show the sweet alert component
                                                this.handleSubmit(e)
                                                formValid(this.state) ?
                                                this.setState({ show: false }) :
                                                this.setState({ show: true })
                                            }}   
                                            >
                                         تسجيل دخول
                                        </Button>
                                    
                                }
                                
                                {/* <Grid container justify="flex-end"  >
                                    <Grid item>
                                       <Link id="link">
                                              تسجيل دخول
                                       </Link>
                                       
                                    </Grid>
                                    <Grid item>
                                       
                                              لديك حساب بالفعل؟     
                                       
                                    </Grid>
                                </Grid>                             */}
                            
                        </form>
                        <SweetAlert //pop up error message
                            show={this.state.show}
                            title="عفوا ، لم تتم عملية الدخول "
                            text="إملأ البيانات بشكل صحيح وحاول مرة أخرى"
                            onConfirm={() => this.setState({ show: false })}
                            />
                    </Container>
                            </Container>
                </div>

            </div>
        )
    }
}


Login.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  };
  
  export default withWidth()(Login);

