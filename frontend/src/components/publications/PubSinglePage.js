import React from 'react'
import styled from 'styled-components'
import Cards from '../Cards'
import {HashRouter as Router, Route, Switch , Link} from 'react-router-dom'
import { useLocation, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from 'axios';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import FlagIcon from '@material-ui/icons/Flag';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function PubSinglePage(props) {
    const { id } = useParams();
    const [pubs, setPubs] = useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Publisher' : '', 'Edition_Number' : 0, 'Year_Publication' : 0, 'Lang' : '', 'ISBN' : 0, 'Description' : '', 'Best_Edition' : false ,'Reason_for_Best_Pub' : '' ,'Front_Cover' : '../images/publications/Screenshot_1.png'}])
    const [IDs, setIDs] = useState();

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/main/publication/" + id
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setPubs(res.data)
                let Temp = []
                for (let i = 1; i < res.data.length; i++) {
                    Temp.push(res.data[i]['id'])
                }
                setIDs(Temp.join())
            };
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [id])

    function AddToMyList(){
        let url = "api/accounts/mylist/add/" + id
        axios.post(url).then((res) => {
            console.log(res)
        })
        .catch(error => console.log('Error:', error))
    }

    return (
 <Container>
            <BookTitleContainer><h1>{pubs[0].Title}</h1></BookTitleContainer>
            <BookContainer>
                <BookImageDetailContainer>
                <Image src={pubs[0].Front_Cover} width="470px" height ="590px"/>
                    <PublicationID>Publication ID: {pubs[0].id} </PublicationID>
                    <BookDetails>
                        <Text>Author: {pubs[0].Authors}</Text>
                        <Text>Publisher: {pubs[0].Publisher}</Text>
                        <Text>Edition: {pubs[0].Edition_Number}</Text>
                        <Text>Year: {pubs[0].Year_Publication}</Text>
                        <Text>Language: {pubs[0].Lang}</Text>
                        <Text>ISBN: {pubs[0].ISBN}</Text>
                    </BookDetails>
                    <ButtonIcons>
                            <AddCircleIcon onClick={AddToMyList}/>
                            <Link to={{
                                        pathname: "/editpublication",
                                        state: pubs[0],
                                        batchIDs: IDs
                                    }}>
                                <EditIcon/>
                            </Link>                        
                            <Link to={{
                                pathname: "/reportpublication",
                                state : pubs[0].id
                            }}>
                                <FlagIcon/>
                            </Link>
                    </ButtonIcons>
                </BookImageDetailContainer>
                <BookDescriptionComment>
                    {pubs[0].Best_Edition && <BookComment>
                        <Text>Comment:</Text>
                        <Comment>
                            {pubs[0].Reason_for_Best_Pub}
                        </Comment>
                    </BookComment>}
                    <BookDescription>
                        <Text>Description:</Text>
                        <Description dangerouslySetInnerHTML={{ __html:pubs[0].Description}} />
                    </BookDescription>
                </BookDescriptionComment>
            </BookContainer>
            <BookRelatedEditionContainer>
                {
                    pubs.map((elem, index) => {
                        if(pubs.length == 1){
                            return(
                                <h1 style={{textAlign:'justify-center'}}>This publication has no related editions.</h1>
                            )
                        }
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
    max-width:100%;
    max-height:100%;
    margin-left:3%;
    margin-right:3%;
    margin-bottom:10%;
`
const BookTitleContainer = styled.div`
    background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 55%;
    min-height: 4%;
    margin-top: 2%;
    display:flex;
    justify-content:center;
    align-items:center;
`

const BookContainer = styled.div`
    display:flex;
    flex-grow: 3;
    max-width: 100%;
    min-height: 70%;
    max-height: 100%;
    margin-top: 2%;
    background: conic-gradient(from 180deg at 50% 50%, #C2B8F9 -1.73deg, #D8E0F1 17.35deg, #CDC3FF 127.58deg, #BCD1FF 142.95deg, #BCD1FF 157.82deg, #CDC4FF 168.37deg, rgba(3, 134, 175, 0.95) 238.02deg, rgba(6, 129, 168, 0.95) 313.27deg, #C2B8F9 358.27deg, #D8E0F1 377.35deg);
    border-radius: 16px;
`
const BookImageDetailContainer = styled.div`
`
const Image = styled.img`
    margin-top:20px;
    margin-left:20px;
    border-radius: 16px 16px 0px 0px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
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
const ButtonIcons = styled.h6`
    margin-left:30%;
    margin-right:30%;
    margin-bottom:3%;
    display:flex;
    flex-direction: row;
    align-items: stretch;
    justify-content:space-between;
`

const PublicationID = styled.h3`
    margin-left:35%;
`

const BookDescriptionComment = styled.div`
    background: #FFFFFF;
    border-radius: 16px;
    max-width:100%;
    max-height:100%;
    padding-left:1%;
    padding-right:1%;
    padding-top:1%;
    margin-left:1.55%;
    margin-top:1.55%;
    margin-bottom:1.55%;
    margin-right:1.55%;
    flex: 1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const BookComment = styled.div`
    background: #DCF2F8;
    min-width:100%;
    max-height:25%;
    border-radius: 16px;
    padding-left:1%;
    padding-right:1%;
    padding-top:2%;
    padding-bottom:1%;
`

const Comment = styled.h5`
`

const BookDescription = styled.div`
    margin-top:2%;
    min-width:100%;
    max-height:75%;
    background: #DCF2F8;
    border-radius: 16px;
    padding-left:1%;
    padding-right:1%;
    padding-top:2%;
    padding-bottom:1%;
`
const Description = styled.h5`
`

const BookRelatedEditionContainer = styled.div`
    width: 100%;
    height: 30%;
    margin-left:1%;
    margin-right:10%;
    margin-top:2%;
    margin-bottom:2%;
    background: #DCF2F8;
    border-radius: 16px;
    display:grid;
    grid-template-columns: 250px 250px 250px 250px;
`
