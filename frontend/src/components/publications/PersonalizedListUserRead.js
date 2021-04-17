import React from 'react'
import styled from 'styled-components'
import Card from '../Cards'
// import '../App.scss';
// import Dropdown from '../Dropdown';
import { useEffect, useState } from "react";
import axios from 'axios';
import ViewPub from './SortPerList'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
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
    const [start, setStart] = useState(0)

      
    const [PopView, setPopView] = useState(false)
    const [PopEdit, setPopEdit] = useState([false, false,false, false,false, false,false, false,false, false,false, false,false, false,false, false])    
    

    function handleChange(event){
        let temp = event.charAt(0).toLowerCase() + event.slice(1)
        setSorter(temp)
        
    }

    function DeleteMyList(){
        let url = "api/accounts/mylist/delete/" + id
        axios.delete(url).then((res) => {
            console.log(res)
        })
        .catch(error => console.log('Error:', error))
    }

    function MarkAsRead(){
        
    }

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/accounts/mylist/" + sorter
        axios.get(url).then((res) => {
            if (isComponentMounted){
                console.log(res.data)
                console.log(res.status)
                if(res.data.length > 0){
                    setPubs(res.data)
                    setUser(res.data[0]["ListOwner"]["username"])
                }
                else{
                    console.log(res.data)
                    setUser(res.data["ListOwner"])
                }
            };
        })
        axios.get(`api/accounts/recs`).then((res) => {
            if (isComponentMounted){
                setRecs(res.data)
            };
        })
        .catch(error => {
            setUser(error.data["ListOwner"])
        })
        return () => {
            isComponentMounted = false;
        }
    }, [sorter])

    const handleClick = () =>{
        setPopView(!PopView)
        console.log("NEW VIEW", PopView)
    }
    const editClick = (value) =>{
        const updated = [...PopEdit.slice(0, value), !PopEdit[value], ...PopEdit.slice(value+1)]
        console.log(updated)
        setPopEdit(updated)
    }
    const closeClick = () =>{
        const updated = [false, false,false, false,false, false,false, false,false, false,false, false,false, false,false, false]
        console.log(updated)
        setPopEdit(updated)
    }

    function leftClick(){
        if(start > 0){
            setStart(start - 8)
        }
    }

    function rightClick(){
        if(start + 8 < pubs.length){
            setStart(start + 8)
        }
    }

    const changeView = (choice) => {
        handleClick()
        setSorter(choice)
        console.log(choice, "updated")
    }


    return (
        <Overall>
        <Container>

            <UserNameContainer>
                <User>{user}'s List</User>
            </UserNameContainer>
            <Background>
            <ViewNextButtonContainer>
                    <View onClick = {handleClick}>
                                <ViewText>Sort By</ViewText>
                            <Svg  width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 20L0.411545 0.5H31.5885L16 20Z" fill="#66CEF2"/>
                            </Svg>
                            <ViewPopContainer>
                            <ViewPub className = "view" trigger={PopView} setTrigger={changeView}/>
                            </ViewPopContainer>
                            </View>
                            <NextPrevious>
                                <SkipPreviousRoundedIcon onClick={leftClick}/>
                                <SkipNextRoundedIcon onClick={rightClick}/>
                            </NextPrevious>
                    </ViewNextButtonContainer>

            <Cards>
               {
                    
                    pubs.map((elem, index) => {
                        if(index >= start && index < (start + 8) && index < pubs.length){
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

const Overall = styled.h3`
    width:100%;
    height:100%;
    margin-left:10%;
    margin-right:3%;
`
const Lower = styled.div`
    width:80%;

`

const Container = styled.div`
    width:80%;

`

const UserNameContainer = styled.div`
min-width: 55%;
min-height: 2%;
margin-top: 2%;
margin-left:2%;
margin-right:2%;
display:flex;
justify-content:center;
align-items:center;
color:white;
background: #03204C;
border-radius: 8px;
`
const User = styled.h3`

`
const Background = styled.div`
margin-top:20px;
width: 100%;
height: 90%;

background: #DCF2F8;
border-radius: 16px;

`


const Background2 = styled.div`
    margin-top:3%;
    width:100%;
    height: 470px;

    background: #DCF2F8;
    border-radius: 16px;

`
const Recommended = styled.h4`
    border-radius: 6px;
    margin-left:2%;
    margin-right:4%;
    margin-top:2%;
    width: 30%;
    height: 8%;
    background: #03204C;
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
const ViewNextButtonContainer = styled.div`
    display:flex;
    margin-left:2%;
    margin-right:2%;
    justify-content:space-between;
    align-items:center;
    `
const Svg = styled.svg`
    position:relative;
    bottom:85%;
    left:70%;
`
const ViewPopContainer = styled.div`
position:relative;
margin-top:1%;
z-index:1;
top:6%;
left:30%;
`

const ViewText = styled.h4`
    z-index:2;
    display:flex;
    justify-content:center;
    align-items:center;
`
const View = styled.h4`
    background:#3B058B;
    width:10%;
    height:30px;
    color:white;
    border-radius:6px;
    margin-top:1%;
`
const NextPrevious = styled.h4`
    margin-top:1%;
`
