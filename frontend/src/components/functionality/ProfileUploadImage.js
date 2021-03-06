import React from 'react'
import styled from 'styled-components'
import {useState } from 'react'


function ProfileUploadImage (props) {
    return (props.trigger) ? (
            <ContentContainer>
                <Content>
                        <Container>
                            <Spann>Profile Image</Spann>
                            <Label style={{marginLeft:"135px", marginTop:"30px", marginBottom:'10px', padding:"10px 120px 10px 120px"}}>
                                <Input type="file" required id="ProfileImage" name="ProfileImage" accept="image/*" onChange={props.PFunc} />
                                <i className="fa fa-cloud-upload" style= {{color:"black"}}>Upload</i> 
                            </Label>
                        </Container>
                    <Button onClick = {props.setTrigger}>Upload</Button>
                </Content>
            </ContentContainer>
    ) : null;
}

export default ProfileUploadImage;

const Container = styled.div`
cursor:pointer;
`

const Form = styled.form`

`
const Spann = styled.span`
    color:black;
    margin-left:60px;

`
const Input = styled.input`
    width: 400px;
    height: 41px;
    background: #F9F7FC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border:2px solid #ccc;
    :focus{
        outline:2px;   
    }
`
const Label = styled.label`
    margin-left:60px;
    input[type="file"] {
        display: none;
    }
    width: 400px;
    height: 41px;
    background: #F9F7FC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 2px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer

`

const Button = styled.button`
    position:relative;
    top:16px;
    right:16px;
    width:100px;
    height:50px;
    background:#03204C;
    color:white;
    border-radius:15px;

`
const ContentContainer = styled.div`

position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(0,0,10); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`
const Content = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
`
const Span = styled.span`
color: #aaa;
float: right;
font-size: 28px;
font-weight: bold;
:hover, :focus{
    color: black;
    text-decoration: none;
    cursor: pointer;
}

`
const Para = styled.p`

`