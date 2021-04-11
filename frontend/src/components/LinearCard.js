import React from 'react'
import styled from 'styled-components'
import CardMedia from '@material-ui/core/CardMedia';
import {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";

function LinearCard({title, author, front, id}) {

    let j = "/publication/" + id
  //location = useLocation()
  console.log(j)
  const [path, setPath] = useState(useLocation().pathname)

    return (
        <Container>
            <Link to={j}>
            <Image src={front}
                width = "200px"
                height = "160px"
            />
            <BookDetails>
                <Booktitle>

                <Text
                    style={{marginTop:"20px",
                    marginLeft:"20px",
                    marginBottom:"40px",
                }}
                >{title}</Text>
                <Text
                    style={{marginTop:"20px",
                    marginLeft:"20px",
                    marginBottom:"40px",
            }}
                >{author}</Text>

                </Booktitle>
                <DateTime>
                    <Text
                        style={{marginTop:"20px",
                        marginLeft:"20px",
                        marginBottom:"40px",
                        paddingLeft:"650px"
                }}    
                    >17 days ago</Text>
                </DateTime>
            </BookDetails>
            </Link>
        </Container>
    )
}

export default LinearCard

const Container = styled.div`
    width: 1100px;
    height: 125px;
    display:flex;
    cursor: pointer;
`

const Image = styled.img`
    border-radius:16px 0px 0px 16px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)), 
            drop-shadow(0px 24px 64px rgba(0, 0, 0, 0.06));
`
const BookDetails = styled.div`
    width: 995px;
    height: 160px;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display:flex;
    border-radius:0px 16px 16px 0px;
`
const Booktitle = styled.div`

`
const Text = styled.h5`

`
const DateTime = styled.div`

`