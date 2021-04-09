import React from 'react';
import 'reactjs-popup/dist/index.css';
import styled from 'styled-components';
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
            <svg style={{borderRadius:"16px"}}width="420" height="422" viewBox="0 0 411 422" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.5703 -237.381C46.5033 -240.729 50.7844 -241.876 54.1325 -239.943L591.422 70.2607C594.77 72.1937 595.917 76.4748 593.984 79.8229L420.354 380.559C418.133 384.405 412.238 382.114 413.198 377.777C436.708 271.604 347.416 174.418 239.636 188.871L128.258 203.806C27.5536 211.707 -70.73 170.29 -135.407 92.6982L-141.286 85.6459C-141.514 85.3718 -141.547 84.9843 -141.369 84.6753L44.5703 -237.381Z" fill="#9888BE"/>
                <path d="M-120 -215C-120 -218.866 -116.866 -222 -113 -222H436C439.866 -222 443 -218.866 443 -215V85.0682C443 88.9896 437.491 89.8576 436.285 86.1261C406.994 -4.52649 297.095 -39.2913 220.997 18.0233L140.082 78.9664C66.0062 128.664 -27.2773 140.204 -111.23 110.057L-119.49 107.091C-119.796 106.981 -120 106.691 -120 106.365V-215Z" fill="#583192"/>
            </svg>
        </TopRectangle>
        <MiddleRectangle>
            <Text>Log In</Text>
            <UserPassword>
                <LogInForm auth={temp} onChange={LoginClick}/>
            </UserPassword>
        </MiddleRectangle>
        
        <BottomRectangle>
            <svg style={{marginTop:'5px', borderRadius:"16px"}}width="420" height="208" viewBox="0 0 411 208" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M459.046 381.498C458.768 385.354 455.417 388.255 451.561 387.977L-96.0191 348.519C-99.8751 348.241 -102.776 344.89 -102.498 341.034L-80.9312 41.7416C-80.6494 37.8303 -75.0922 37.3605 -74.1578 41.169C-51.458 133.692 55.6585 176.266 135.679 124.569L220.765 69.5992C298.221 25.3543 392.093 20.5484 473.662 56.6517L481.687 60.2036C481.984 60.3352 482.167 60.6394 482.143 60.9637L459.046 381.498Z" fill="#583192"/>
            </svg>
            <ForgetContainer>
                    <ForgetUserName>Forgot Username?</ForgetUserName>
                    <ForgetPassword>Forgot Password?</ForgetPassword>
            </ForgetContainer>
        </BottomRectangle>
    </Container>
  )};

export default LogIn;


const Container = styled.div`
    width: 420px;
    height: 570px;
    background: white;
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
const MiddleRectangle = styled.div`
    height:300px;

`
const UserPassword = styled.div`
    position:relative;
    bottom:2px;
    left:20px;
    height:290px;
    padding-top:130px;
`
const Text = styled.h1`
    position:relative;
    top:110px;
    left:19px;
    color:#583192;
    white-space:nowrap;
`
const BottomRectangle = styled.div`
`
const ForgetContainer = styled.div`
    position:relative;
    bottom:150px;
    left:20px;
    color:#583192;
    font-size:20px;

`
const ForgetUserName = styled.h6`
`

const ForgetPassword = styled.h6`
`