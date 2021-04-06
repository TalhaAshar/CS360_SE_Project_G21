import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LogInForm from './forms/LogInForm';


const LogIn = (props) => {

    const [temp, setTemp] = React.useState({'Status' : 'Unauthentic'})

    function updateParent(event){
        props.onChange(event)
    }

    function LoginClick(event) {
        //console.log(event.target.value)
        //props.onChange(event.target.value); // pass any argument to the callback
        setTemp(event)
        updateParent(event)

      }
    return (
        <Container> 
            <TopRectangle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 10 300 250"><path fill="#9888BE" fill-opacity="1" d="M0,160L30,181.3C60,203,120,245,180,218.7C240,192,300,96,360,48C420,0,480,0,540,37.3C600,75,660,149,720,170.7C780,192,840,160,900,176C960,192,1020,256,1080,277.3C1140,299,1200,277,1260,229.3C1320,181,1380,107,1410,69.3L1440,32L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="300 100 740 320"><path fill="#583192" fill-opacity="1" d="M0,96L40,133.3C80,171,160,245,240,277.3C320,309,400,299,480,261.3C560,224,640,160,720,128C800,96,880,96,960,106.7C1040,117,1120,139,1200,160C1280,181,1360,203,1400,213.3L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
            </TopRectangle>
            <MiddleRectangle1> 
                <h1>Login</h1>
                <LogInForm auth={temp} onChange={LoginClick}/>
            </MiddleRectangle1>
            <MiddleRectangle2>
                <First>
                    <FGUsername>Forgot Username?</FGUsername>
                </First>
                <Second>
                    <FGPassword>Forgot Password?</FGPassword>
                </Second>
            </MiddleRectangle2>
            <BottomRectangle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="350 100 320 320"><path fill="#583192" fill-opacity="1" d="M0,224L48,202.7C96,181,192,139,288,154.7C384,171,480,245,576,245.3C672,245,768,171,864,154.7C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </BottomRectangle>
    </Container>
  )};

export default LogIn;


const Container = styled.div`
    width: 420px;
    height: 570px;
    background: #ffffff;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
`
const TopRectangle = styled.div`
    width: 420px;
    height: 100px;
    border-color: transparent transparent #000 transparent;
    svg {
        position: absolute;
    }
`

const MiddleRectangle1 = styled.div`
    width: 420px;
    height: 200px;
    margin-top: 40px;
    left: 20px;
    position: absolute;
    color: white;
`
const MiddleRectangle2 = styled.div`
    margin-top: 240px;
    left: 20px;
    position: absolute;
    svg {
        position: absolute;
    }
`

const First = styled.div`
`

const Second = styled.div`
`

const FGUsername = styled.span`
    font-size: 13px;
    color: #583192;
`

const FGPassword = styled.span`
    font-size: 13px;
    color: #583192;
`

const BottomRectangle = styled.div`
    width: 420px;
    height: 100px;
    margin-top: 185px;
    border-color: transparent transparent #000 transparent;
    border-radius: 20px;
`