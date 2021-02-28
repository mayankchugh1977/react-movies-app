import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import BookShow from '../../screens/bookshow/BookShow';
import { Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function(props){
    return(
        <Typography component="div" style={{padding: 0, textAlign: 'center' }} >
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}
class Header extends Component {

    constructor()
    {
        super();
        this.state = {
                modalIsOpen: false,
                value: 0,
                usernameRequired: "dispNone",
                username: "",
                passwordRequired: "dispNone",
                password: "",
                firstnameRequired: "dispNone",
                firstname: "",
                lastnameRequired: "dispNone",
                lastname: "",
                emailRequired: "dispNone",
                email: "",
                registerpasswordRequired: "dispNone",
                registerpassword: "",                
                contactRequired: "dispNone",
                contact: ""//,
                // registrationSuccess: false,
                // loggedIn: sessionStorage.getItem("access-token") == null ? false : true
               
            };
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen:true, 
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerpasswordRequired: "dispNone",
            registerpassword: "",
            contact: "",
            contactRequired: "dispNone",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        })
    }

    closeModalHandler = () => {
        this.setState({modalIsOpen:false})
    }

    tabChangeHandler = (event, value) => {
        this.setState({value});
    }

    loginClickHandler = () => {
        console.log("loginClickHandler called")
        this.state.username === "" ? this.setState({usernameRequired: "dispBlock"}) : this.setState({usernameRequired: "dispNone"});
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) : this.setState({passwordRequired: "dispNone"});

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            }
        });

        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.password));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value});
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value});
    }

    registerClickHandler = () => {
        console.log("registerClickHandler called")
        this.state.firstname === "" ? this.setState({firstnameRequired: "dispBlock"}) : this.setState({firstnameRequired: "dispNone"});
        this.state.lastname === "" ? this.setState({lastnameRequired: "dispBlock"}) : this.setState({lastnameRequired: "dispNone"});
        this.state.email === "" ? this.setState({emailRequired: "dispBlock"}) : this.setState({emailRequired: "dispNone"});
        this.state.registerpassword === "" ? this.setState({registerpasswordRequired: "dispBlock"}) : this.setState({registerpasswordRequired: "dispNone"});
        this.state.contact === "" ? this.setState({contactRequired: "dispBlock"}) : this.setState({contactRequired: "dispNone"});

        if(this.state.firstname ==="" || this.state.lastname ==="" || this.state.email ==="" || 
                    this.state.registerpassword ==="" || this.state.contact ==="" ) {return;}

        let dataSingup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerpassword
        })

        // let data = null;
        let xhrSingup = new XMLHttpRequest();
        let that = this;
        xhrSingup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText)
               that.setState({registrationSuccess: true})
            }
        });
        console.log(this.props.baseUrl);
        xhrSingup.open("POST", this.props.baseUrl + "signup");
        xhrSingup.setRequestHeader("Content-Type", "application/json");
        xhrSingup.setRequestHeader("Cache-Control", "no-cache");
        xhrSingup.send(dataSingup);
    }

    inputFirstnameChangeHandler = (e) => {
        this.setState({firstname: e.target.value});
    }

    inputLastnameChangeHandler = (e) => {
        this.setState({lastname: e.target.value});
    }

    inputEmailChangeHandler = (e) => {
        this.setState({email: e.target.value});
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({registerpassword: e.target.value});
    }

    inputContactChangeHandler = (e) => {
        this.setState({contact: e.target.value});
    }

    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");


        this.setState({
            loggedIn: false
        });
    }


    render(){
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className='app-logo' alt="logo" ></img>
                    {!this.state.loggedIn ?
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}> 
                            Login 
                        </Button>
                    </div>
                    :
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.logoutHandler}>
                            Logout
                        </Button>
                    </div>
                }   
                    {this.props.showBookShowButton === "true" ?
                        <div className="bookshow-button">
                            <Link to={"/bookshow/" + this.props.id}>
                                <Button variant="contained" color="primary">
                                        Book Show
                                </Button>
                            </Link>
                        </div> : "" }     
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" 
                    onRequestClose={this.closeModalHandler}  style={customStyles}> 
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login"/>
                        <Tab label="Register"/>
                    </Tabs>
                    {this.state.value === 0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="username">User Name</InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler}/>
                            <FormHelperText className={this.state.usernameRequired}> <span className="red"> required</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler}/>
                            <FormHelperText className={this.state.passwordRequired}> <span className="red"> required</span></FormHelperText>
                        </FormControl>
                        <br/><br/>
                        {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}> Login </Button>
                    </TabContainer>}

                    {this.state.value === 1 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstnameChangeHandler}/>
                            <FormHelperText className={this.state.firstnameRequired}> <span className="red"> required</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastnameChangeHandler}/>
                            <FormHelperText className={this.state.lastnameRequired}> <span className="red"> required</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler}/>
                            <FormHelperText className={this.state.emailRequired}> <span className="red"> required</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="registerpassword">Password</InputLabel>
                            <Input id="registerpassword" type="registerpassword" registerpassword={this.state.registerpassword} onChange={this.inputRegisterPasswordChangeHandler}/>
                            <FormHelperText className={this.state.registerpasswordRequired}> <span className="red"> required</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="contact">Contact</InputLabel>
                            <Input id="contact" type="contact" contact={this.state.contact} onChange={this.inputContactChangeHandler}/>
                            <FormHelperText className={this.state.contactRequired}> <span className="red"> required</span></FormHelperText>
                        </FormControl><br/><br/>
                        {this.state.registrationSuccess === true &&
                        <FormControl> 
                            <span  className="sucessText">
                                Registration Successful. Please Login!
                            </span>                            
                        </FormControl>  } <br/>

                        <Button variant="contained" color="primary" onClick={this.registerClickHandler}> Register </Button>
                    </TabContainer>}
                </Modal> 
            </div>
        )
    }
}

export default Header;