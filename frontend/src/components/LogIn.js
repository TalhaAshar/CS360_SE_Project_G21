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
        </TopRectangle>
        <MiddleRectangle>

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