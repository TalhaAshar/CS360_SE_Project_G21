import React from 'react'
import styled from 'styled-components'
import Card from '../Cards'
import '../App.scss';
import Dropdown from '../Dropdown';
import { useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const items = [
    {
      id: 1,
      value: 'Alphabetical',
    },
    {
      id: 2,
      value: 'Read',
    },
    {
      id: 3,
      value: 'Unread',
    },
  ];

function PersonalizedListUserRead() {

	const [pubs, setPubs] = useState([{'id' : 0, 'ListOwner' : {}, 'ListPub' : {}, 'Status' : ''}])
    const [recs, setRecs] = useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Publisher' : '', 'Edition_Number' : 0, 'Year_Publication' : 0, 'Lang' : '', 'ISBN' : 0, 'Description' : '', 'Reason_for_Best_Pub' : '' ,'Front_Cover' : '../images/publications/Screenshot_1.png'}])
    const [sorter, setSorter] = useState('alphabetical')
    const [user, setUser] = useState('')

    function handleChange(event){
        let temp = event.charAt(0).toLowerCase() + event.slice(1)
        setSorter(temp)
        
    }


    function getData(){
        let url = "api/accounts/mylist/" + sorter
        axios.get(url).then((res) => {
            setPubs(res.data)
            console.log(res.data)
            setUser(res.data[0]["ListOwner"]["username"])
        })
        
            axios.get("api/accounts/recs").then((res) => {
                console.log("done recs")
                setRecs(res.data)
            })
        
        .catch(error => console.log('Error:', error))
    }

    useEffect(() => {
        getData()
    }, [sorter])
	
    return (
        <Overall>
        <Container>

            <UserNameContainer>
                <User>{user}'s List</User>
            </UserNameContainer>
            <Background>
                <SortBy>
                    <Dropdown title="Sort By" items={items} onChange={handleChange} multiSelect />
                </SortBy>
            <Cards>
               {
                    
                    pubs.map((elem, index) => {
                        if(index < 8){
                            return(
                                <Card title={elem.ListPub["Title"]} author={elem.ListPub["Authors"]} front_cover={elem.ListPub["Front_Cover"]} id={elem.ListPub["id"]}/>
                                )
                        }
                        console.log(index)
                    })
                }
                
           </Cards>
            </Background>
        </Container>
        <Lower>
        <Background2>
                <Recommended>
                    Recommended
                </Recommended>
            <Cards2>
                {
                    
                    recs.map((elem, index) => {
                        if(index < 4){
                            return(
                                <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                )
                        }
                        console.log(index)
                    })
                }
           </Cards2>
            </Background2>
        </Lower>
        </Overall>
    )
}

export default PersonalizedListUserRead

const Container = styled.div`

`

const UserNameContainer = styled.div`
background: #0A3977;
margin-left:150px;
margin-right:150px;
margin-top:20px;
width:600px;
color:white;
border-radius:12px;
height:50px;
width:1000px;
display:flex;
align-items:center;
justify-content:center;
`
const User = styled.h3`

`
const Background = styled.div`
margin-left:150px;
margin-right:150px;
margin-top:20px;
width: 1000px;
height: 700px;

background: #DCF2F8;
border-radius: 16px;

`
const SortBy = styled.div`
padding-top: 3px;
margin-left:15px;
margin-right:150px;
margin-top:20px;
max-width:250px;
background: #3B058B;
display:flex;
align-items:center;
justify-content:center;
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 27px;
color: white;

        
`

const Overall = styled.h3`

`
const Lower = styled.div`

`

const Background2 = styled.div`
margin-left:150px;
margin-right:150px;
margin-top:20px;
width: 1000px;
height: 350px;

background: #DCF2F8;
border-radius: 16px;

`
const Recommended = styled.h4`
border-radius: 20px 20px 20px 20px;
margin-left:15px;
margin-right:150px;
margin-top:20px;
width: 250px;
height: 35px;
background: #3B058B;
display:flex;
align-items:center;
justify-content:center;
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 27px;
    color: white;
`

const Cards = styled.h4`
margin-left:0px;
    margin-right:50px;
    margin-top:20px;
    margin-bottom:20px;
    display:grid;
    height: 600px;
    grid-template-rows: 375px 375px 375px 375px;
    grid-template-columns: 250px 250px 250px 250px;
    background:#DCF2F8;
`

const Cards2 = styled.h4`
margin-left:0px;
    margin-right:50px;
    margin-top:20px;
    margin-bottom:20px;
    display:grid;
    height: 250px;
    grid-template-rows: 375px 375px 375px 375px;
    grid-template-columns: 250px 250px 250px 250px;
    background:#DCF2F8;
`