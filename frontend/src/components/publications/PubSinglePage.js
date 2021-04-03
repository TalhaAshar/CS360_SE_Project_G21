import React from 'react'
import styled from 'styled-components'
import Cards from '../Cards'
import { useLocation, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function PubSinglePage(props) {
    const { id } = useParams();
    const [pubs, setPubs] = useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Publisher' : '', 'Edition_Number' : 0, 'Year_Publication' : 0, 'Lang' : '', 'ISBN' : 0, 'Description' : '', 'Reason_for_Best_Pub' : '' ,'Front_Cover' : '../images/publications/Screenshot_1.png'}])


    
    function getData(id){
       console.log(id, "jjj");
        let url = "api/main/publication/" + id
        console.log(url, "edfghtuehhe")
        axios.get(url).then((res) => {
            setPubs(res.data)
        })
        .catch(error => console.log('Error:', error))
    }

    useEffect(() => {
        getData(id)
        //setParams(useParams())
    }, [id])

    console.log("ygygyuy")
    return (
        <Container>
            <BookTitleContainer>{pubs[0].Title}</BookTitleContainer>
            <BookContainer>
                <BookImageDetailContainer>
                    
                    <PublicationID>Publication ID: {pubs[0].id} </PublicationID>
                    <BookDetails>
                        <Text>Author: {pubs[0].Authors}</Text>
                        <Text>Publisher: {pubs[0].Publisher}</Text>
                        <Text>Edition: {pubs[0].Edition_Number}</Text>
                        <Text>Year: {pubs[0].Year_Publication}</Text>
                        <Text>Language: {pubs[0].Lang}</Text>
                        <Text>ISBN: {pubs[0].ISBN}</Text>
                    </BookDetails>
                </BookImageDetailContainer>
                <BookDescriptionComment>
                    <BookComment>
                        <Text>Comment:</Text>
                        <Comment>
                        {pubs[0].Reason_for_Best_Pub}
                        </Comment>
                    </BookComment>
                    <BookDescription>
                        <Text>Description:</Text>
                        <Description dangerouslySetInnerHTML={{ __html:pubs[0].Description}} />
                    </BookDescription>
                </BookDescriptionComment>
            </BookContainer>
            <BookRelatedEditionContainer>
                {
                    pubs.map((elem, index) => {
                        if(index > 0 && index < 6){
                            console.log(elem.id, "rec_idx")
                            return(
                                <Cards title={elem.Title} author={elem.Authors} id={elem.id} front_cover={elem.Front_Cover} />
                            )
                        }
                    })
                }
            </BookRelatedEditionContainer>
        </Container>
    )
}

export default PubSinglePage

const Container = styled.div`
    max-width:1360px;
    max-height:1840px;
    margin-left:50px;
    margin-right:50px;
`
const BookTitleContainer = styled.div`
    background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 150px;
    min-height:60px;
    margin-top:20px;
    display:flex;
    justify-content:center;
    align-items:center;


`

const BookContainer = styled.div`
    display:flex;
    max-width: 1150px;
    max-height: 1180px;
    margin-left: 10px;
    margin-top: 20px;
    margin-right:20px;

    background: conic-gradient(from 180deg at 50% 50%, #C2B8F9 -1.73deg, #D8E0F1 17.35deg, #CDC3FF 127.58deg, #BCD1FF 142.95deg, #BCD1FF 157.82deg, #CDC4FF 168.37deg, rgba(3, 134, 175, 0.95) 238.02deg, rgba(6, 129, 168, 0.95) 313.27deg, #C2B8F9 358.27deg, #D8E0F1 377.35deg);
    border-radius: 16px;
`
const BookImageDetailContainer = styled.div`

`
const Image = styled.img`
    margin-top:20px;
    margin-left:20px;
    border-radius: 16px 16px 0px 0px;
`
const BookDetails = styled.div`
    max-width: 470px;
    max-height: 306px;

    background: #FFFFF5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom:20px;
    margin-left:20px;
    padding-left:10px;
    padding-right:10px;
    padding-top:10px;
    padding-bottom:10px;
`
const Text = styled.p`

`
const PublicationID = styled.h3`
    margin-left:100px;
`

const BookDescriptionComment = styled.div`
/* White */
    background: #FFFFFF;
    border-radius: 16px;
    max-width:600px;
    max-height:1000px;
    padding-left:10px;
    padding-right:10px;
    padding-top:20px;
    margin-left:37px;
    margin-top:20px;
    margin-bottom:20px;
`
const BookComment = styled.div`
    background: #DCF2F8;
    border-radius: 16px;
    padding-left:10px;
    padding-right:10px;
    padding-top:20px;
    padding-bottom:10px;
    
`

const Comment = styled.h5`
`
const BookDescription = styled.div`
    margin-top:20px;
    background: #DCF2F8;
    border-radius: 16px;
    padding-left:10px;
    padding-right:10px;
    padding-top:20px;
    padding-bottom:10px;
`
const Description = styled.h5`

`
const BookRelatedEditionContainer = styled.div`

    width: 1150px;
    height: 393px;
    margin-left:10px;
    margin-top:20px;
    padding-left:70px;

    background: #DCF2F8;
    border-radius: 16px;
    display:grid;
    grid-template-columns: 250px 250px 250px 250px;

`
