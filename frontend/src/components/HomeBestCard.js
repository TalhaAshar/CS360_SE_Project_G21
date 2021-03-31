import React from 'react'
import styled from 'styled-components'
import Card from './Card'


function HomeBestCard() {
    return (
        <Container>
            <Cards>
                <Card/>
            </Cards>
        </Container>
    )
}

export default HomeBestCard
//out main rectangle of the best edition
const Container = styled.div`
background:black;
display:grid;
grid-template-columns: 45% 45%;

`
//inner rectangle of the best edition
const Cards = styled.div`
height:465px;
background:red;
`