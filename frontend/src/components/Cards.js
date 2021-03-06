import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import styled from 'styled-components'
import { Link, useLocation } from "react-router-dom";
import {useEffect, useState} from "react";

// function showPub({current}){
//   console.log(current)
// }

export default function ImgMediaCard({title, author, front_cover, id}) {
  let j = "/publication/" + id
  //location = useLocation()
  const [path, setPath] = useState(useLocation().pathname)

  return (
    <StyledView>
      <Link to={j} style={{textDecoration:"none"}}>
      <Card
      style={{
              height: "350px",
              width: "234.7px",
              border:"2px",
              filter: "drop-shadow(0px 24px 64px rgba(0, 0, 0, 0.06))"            
          }}>
        <CardActionArea>
        
          <CardMedia
            component="img"
            alt={title}
            height="200"
            width="200"
            src={front_cover}
            title={title}
          />
          <Divider variant="middle" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h5" >
              <h4>{title}</h4>
            </Typography>
            <Typography variant="h6" color="textSecondary" component="h6">
              <h5>{author}</h5>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
      
    </StyledView>
  );
}

const StyledView = styled.div`
  border-width: 1px;
  border-radius: 2px;
  border-color: #ddd;
  border-bottom-width: 0;
  shadow-color: #000000;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.8px;
  shadow-radius: 2px;
  elevation: 1px;
  max-width:250px;
  max-height:300px;
  margin: 1% 1.3% 5.4% 3.5%;
`
