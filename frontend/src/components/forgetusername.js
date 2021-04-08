import React from 'react'
import styled from 'styled-components'

function forgetpassword() {
    return (
        <Container>
            <Title>
                <Text>
                    Forgot Username
                </Text>
            </Title>
            <Body>
                <Heading>
                    Enter Email Address
                </Heading>
                <Email>
                    
                </Email>
                <Button>
                    <TextButton>
                            Submit
                    </TextButton>
                </Button>
            </Body>
        </Container>
    )
}

export default forgetpassword

const Container = styled.div`

    width: 505px;
    height: 206px;

    background: #FAFAFA;

    box-shadow: 0px 2px 8px rgba(117, 131, 142, 0.08), 0px 20px 32px rgba(52, 60, 68, 0.16);
    border-radius: 20px;
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
    padding-top: 17px;
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

const Email = styled.div`
margin-left: 20px;
margin-top: 20px;
justify-contents: center;
align-items: center;
display: flex;
    width: 423px;
    height: 29px;

    background: #FFFFFF;
    border: 1px solid #7AADF4;
    box-sizing: border-box;
    border-radius: 10px;
`

const Button = styled.div`
margin-left: 315px;
margin-top: 20px;
    width: 130px;
    height: 48px;

    background: #583192;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 7px;
`
const TextButton = styled.h4`
margin-left: 30px;
margin-top: 5px;

    width: 77px;
    height: 33px;

    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 33px;

    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.015em;

    color: #FFFFFF;
`
