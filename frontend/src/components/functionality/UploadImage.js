import React from 'react'
import styled from 'styled-components'


function UploadImage() {
    return (
        <Container>
            <Span>Font</Span>
            <Label style={{marginLeft:"135px", marginTop:"30px", marginBottom:'10px',padding:"10px 120px 10px 120px"}}>
                <Input type="file" id="front" name="Front_Cover" accept="image/*"/>
                <i class="fa fa-cloud-upload"></i> Upload
            </Label><br/>
            <Span>Back</Span>
            <Label style={{marginLeft:"130px", marginTop:"30px", marginBottom:'10px',padding:"10px 120px 10px 120px"}}>
                <Input type="file" id="back" name="Back_Cover" accept="image/*" />
                <i class="fa fa-cloud-upload"></i> Upload
            </Label><br/>
            <Span>Spine</Span>
            <Label style={{marginLeft:"128px", marginTop:"30px", marginBottom:'10px',padding:"10px 120px 10px 120px"}}>
                <Input type="file" id="spine" name="Spine" accept="image/*" />
                <i class="fa fa-cloud-upload"></i> Upload
            </Label><br/>
        </Container>
    )
}

export default UploadImage

const Container = styled.div`

`

const Form = styled.form`

`
const Span = styled.span`

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
