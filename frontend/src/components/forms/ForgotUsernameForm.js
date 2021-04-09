import React, { Component } from "react";
import styled from 'styled-components';
import { render } from "react-dom";

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default class ForgotUsername extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { email:'' };
    }
    
    handleChange = (event) =>{
        this.setState({ [event.target.name]:event.target.value });
    }
    
    handleSubmit = (event) =>{
      event.preventDefault();
      const data = { email:this.state.email };
      
      axios.post(`api/register/login`, { data })  //Talha
        .then(res => { })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success', response))
        
    }
    
    handleClick = () => {
        this.props.toggle();
    }

    render(){
        return (
                <Container>
                    <Title>
                        <Text>
                            Forgot Username
                        </Text>
                    </Title>
                    <form onSubmit={this.handleSubmit}>
                        <Body>
                            <Heading>
                                Enter Email Address
                            </Heading>
                            <Form>
                                <input type="text" name="email" minLength="5" style={{width: "440px", height: "30px", fontSize: "16px", borderColor: "#2F80ED", borderRadius: "14px", padding:"10px", outline: "none"}} onChange={this.handleChange} />
                            </Form>
                            <input type="submit" value="Submit" style={{width: "126px", height: "48px", position: "relative", marginTop: "15px", marginLeft: "345px", fontSize: "18px", color: "#FFFFFF", padding:"10px", backgroundColor: "#583192", borderRadius: "7px", borderColor: "#000000"}} onClick={this.handleClick}/>
                        </Body>
                    </form>
                </Container>
        );
    }
}

const Container = styled.div`

    width: 505px;
    height: 206px;

    background: #FAFAFA;

    box-shadow: 0px 2px 8px rgba(117, 131, 142, 0.08), 0px 20px 32px rgba(52, 60, 68, 0.16);
    border-radius: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
`

const Form = styled.div`
    margin-left: 32px;
    margin-right: 32px;
    margin-top: 32px;
`

const Title = styled.div`
    
    width: 505px;
    height: 50px;

    background: #9888BE;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 10px 10px 0px 0px;
`

const Text = styled.h2`
    margin-left: 120px;
    margin-right: 120px;
    justify-contents: center;
    align-items: center;
    display: flex;
    padding-top: 5%;
    width: 300px;
    height: 14px;

    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 14px;

    display: flex;
    align-items: center;
    letter-spacing: 0.169679px;

    color: #000000;
`

const Body = styled.div`

    width: 505px;
    height: 156px;

    background: #FFFFFF;

    box-shadow: 0px 2px 8px rgba(117, 131, 142, 0.08), 0px 20px 32px rgba(52, 60, 68, 0.16);
    border-radius: 20px;
`

const Heading = styled.h3`
margin-left: 20px;
margin-right: 20px;
margin-top: 20px;
justify-contents: center;
align-items: center;
display: flex;
    width: 223px;
    height: 14px;

    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 14px;

    display: flex;
    align-items: center;
    letter-spacing: 0.169679px;

    color: #583192;

`