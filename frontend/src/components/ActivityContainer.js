import React from 'react'
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import styled from 'styled-components'
import {Link} from "react-router-dom";

function Activity(props) {
    if(props.type == 'Pub'){
        let placeholder = "/publication/" + props.pub.Publication_ID["id"]
        return (
            <ActivityContainer>
                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                <Text>You {(props.pub.Edit_Type).toLowerCase()}ed the publication "<Link to={placeholder}>{props.pub.Publication_ID["Title"]}</Link>".</Text>
                <NLine></NLine>
            </ActivityContainer>
        )
    }
    else{
        return (
            <ActivityContainer>
                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                <Text>Hello</Text>
                <NLine></NLine>
            </ActivityContainer>
        )
    }
}

export default Activity

const ActivityContainer = styled.h3`
width:1050px;
height:60px;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;
display: flex;
align-items: center;
color: Black;
`

const NLine = styled.line`
position:absolute;
width:1050px;
heigth:0px;
margin-top: 60px;
border: 1px solid #F9F7FC;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Text = styled.text``