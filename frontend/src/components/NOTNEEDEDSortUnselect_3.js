import React from 'react'
import styled from 'styled-components'

function SortUnselect() {
    return (
        <Container>

            <Alphabetical>
                
                Alphabetical
            </Alphabetical>
            <Line>

            </Line>
            <Read>
                
                Read
                
            </Read>
            <Line>
                
            </Line>
            <Unread>
                <AText> 
                Unread
                </AText>
            </Unread>
        </Container>
    )
}

export default SortUnselect

const Container = styled.div`
width: 250px;
height: 120px;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const Alphabetical = styled.div`
width: 250px;
height: 40px;
margin-left: 20px;


display: flex;
align-items: center;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const AText = styled.div`
margin-left: 20px;
width: 215px;
height: 40px;
font-family: Manrope;
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 14px;
/* or 113% */

display: flex;
align-items: center;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const Read = styled.div`

margin-left: 20px;
width: 250px;
height: 40px;
font-family: Manrope;
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 14px;
/* or 113% */

display: flex;
align-items: center;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const Unread = styled.div`
background: #CDC5C5;
margin-left: 0px;
width: 250px;
height: 40px;
font-family: Manrope;
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 14px;
/* or 113% */

display: flex;
align-items: center;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const Line = styled.div`
width: 250px;
height: 1px;
background: #DCF2F8;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`