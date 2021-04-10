import React from 'react'
import styled from 'styled-components'

function SearchFilter(props) {
    return (
        <Container>
           <Text>
               Type or filter by category:
           </Text>
           <Flex>
                <AT>
                    <Author>
                            <AText onClick={() => props.onChange("Authors")}>
                            ＋    Author
                            </AText>
                    </Author>
                    <Title onClick={() => props.onChange("Title")}>
                    ＋   Title
                    </Title>
                </AT>
                <IG>
                    <ISBN onClick={() => props.onChange("ISBN")}>
                    ＋   ISBN
                    </ISBN>
                    <Genre onClick={() => props.onChange("Genre")}>
                    ＋   Genre
                    </Genre>
                </IG>
                <PY>
                    <Publisher onClick={() => props.onChange("Publisher")}>
                    ＋   Publisher
                    </Publisher>
                    <Year onClick={() => props.onChange("Year_Publication")}>
                    ＋   Year
                    </Year>
                </PY>
                <DL>
                    <D onClick={() => props.onChange("Year_Publication")}>
                    ＋   Date
                    </D>
                    <L onClick={() => props.onChange("Lang")}>
                    ＋   Language
                    </L>
                </DL>
           </Flex>
        </Container>
    )
}

export default SearchFilter

const Container = styled.div`
    width: 285px;
    height: 210px;
    background: white;
    border-radius: 15px;

`

const Text = styled.div`
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 27px;
padding-right: 45px;
padding-top: 5px;
color: #000000;

`

const AT = styled.div`
display:flex;
flex-direction:row;
`
const Author = styled.div`
width: 130px;
    height: 30px;
    background: #AE14DB;
    border-radius: 50px;
    margin-left: 10px;
    margin-top: 10px;
`
const Title = styled.div`
width: 100px;
    height: 30px;
    background: #AE14DB;
    border-radius: 50px;
    margin-left: 10px;
    margin-top: 10px;
    font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 142%;
align-items: center;
text-align: center;
color: white;
`
const AText = styled.div`
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 142%;
align-items: center;
text-align: center;
color: white;
`
const IG = styled.div`
display:flex;
flex-direction:row;
`
const ISBN = styled.div`
width: 90px;
    height: 30px;
    background: #AE14DB;
    border-radius: 50px;
    margin-left: 10px;
    margin-top: 10px;
    font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 142%;
align-items: center;
text-align: center;
color: white;
`
const Genre = styled.div`
width: 100px;
    height: 30px;
    background: #AE14DB;
    border-radius: 50px;
    margin-left: 10px;
    margin-top: 10px;
    font-family: Manrope;
font-style: normal;
color: white;
font-weight: bold;
font-size: 20px;
line-height: 142%;
align-items: center;
text-align: center;
`
const PY = styled.div`
display:flex;
flex-direction:row;
`
const Publisher = styled.div`
width: 140px;
    height: 30px;
    background: #AE14DB;
    border-radius: 50px;
    margin-left: 10px;
    color: white;
    margin-top: 10px;
    font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 142%;
align-items: center;
text-align: center;
`
const Year = styled.div`
width: 100px;
    height: 30px;
    background: #AE14DB;
    border-radius: 50px;
    margin-left: 10px;
    margin-top: 10px;
    font-family: Manrope;
font-style: normal;
font-weight: bold;
color: white;
font-size: 20px;
line-height: 142%;
align-items: center;
text-align: center;
`
const DL = styled.div`
display:flex;
flex-direction:row;
`
const D = styled.div`
width: 90px;
    height: 30px;
    background: #AE14DB;
    border-radius: 50px;
    margin-left: 10px;
    color: white;
    margin-top: 10px;
    font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 142%;
align-items: center;
text-align: center;
`
const L = styled.div`
width: 145px;
    height: 30px;
    background: #AE14DB;
    border-radius: 50px;
    margin-left: 10px;
    margin-top: 10px;
    font-family: Manrope;
    color: white;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 142%;
align-items: center;
text-align: center;
`

const Flex = styled.div`

`