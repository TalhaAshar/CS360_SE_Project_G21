import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

function RemoveAccountFeedbackPopup(props) {
    const history = useHistory();
    return (
        <div>
        <Shadow>
        </Shadow>
            <Container>
                <Title>
                </Title>
                <Body>
                    <Heading>
                        Are you sure you want to delete your account?
                    </Heading>
                    <Buttons>
                        <Button1 onClick={() => props.remove(history)}>
                            Confirm
                        </Button1>
                        <Button2 onClick={props.toggle}>
                            Cancel
                        </Button2>
                    </Buttons>
                </Body>
            </Container>
        </div>
    )
}

export default RemoveAccountFeedbackPopup

const Container = styled.div`
    width: 505px;
    height: 206px;
    background: #FAFAFA;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999999999;
    transform: translate(-50%, -50%); 
    box-shadow: 0px 2px 8px rgba(117, 131, 142, 0.08), 0px 20px 32px rgba(52, 60, 68, 0.16);
    border-radius: 20px;
`
const Shadow = styled.div`
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.5;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999999998;
    transform: translate(-50%, -50%); 
`

const Title = styled.div`
    width: 505px;
    height: 50px;
    background: #9888BE;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 10px 10px 0px 0px;
`
const Body = styled.div`
display: flex;
justify-contents: space-between;
align-items:center;
    width: 505px;
    height: 156px;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(117, 131, 142, 0.08), 0px 20px 32px rgba(52, 60, 68, 0.16);
    border-radius: 20px;
`

const Buttons = styled.div`
`

const Button1 = styled.h3`
    position: absolute;
    height: 15%;
    width: 20%;
    align-items: center;
    margin-top: 5%;
    margin-left: -40%;
    padding-left: 1.5%;
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    color: white;
    background-color: #583192;
    border-radius: 8px;
    cursor: pointer;
`

const Button2 = styled.h3`
    position: absolute;
    height: 15%;
    width: 17%;
    border-radius: 8px;
    padding-left: 1.5%;
    align-items: center;
    margin-top: 5%;
    margin-left: -15%;
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    color: white;
    background-color: #583192;
    cursor: pointer;
`

const Heading = styled.h3`
    margin-left:20px;
    height: 14px;
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 25px;
    display: flex;
    align-items: center;
    letter-spacing: 0.169679px;
    color: #583192;
`