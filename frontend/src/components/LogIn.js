import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const LogIn = () => (
    
    <Container>
        <TopRectangle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="100 60 1150 1800">
            <path fill="#0099ff" fill-opacity="1" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,112C672,85,768,75,864,69.3C960,64,1056,64,1152,101.3C1248,139,1344,213,1392,250.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
                </path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,96L48,96C96,96,192,96,288,90.7C384,85,480,75,576,58.7C672,43,768,21,864,37.3C960,53,1056,107,1152,160C1248,213,1344,267,1392,293.3L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        </TopRectangle>
        <MiddleRectangle>

        <svg style={{marginTop:"-80px",marginBottom:"80px"}}
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,288L48,277.3C96,267,192,245,288,245.3C384,245,480,267,576,234.7C672,203,768,117,864,74.7C960,32,1056,32,1152,42.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </MiddleRectangle>
        <BottomRectangle>

        </BottomRectangle>
    </Container>
  );

export default LogIn

const Container = styled.h1`
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
`
const MiddleRectangle = styled.div`
`
const BottomRectangle = styled.div`
`