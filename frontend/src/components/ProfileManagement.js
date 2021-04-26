import React, { Component } from "react";
import styled from 'styled-components';
import axios from 'axios';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SecurityIcon from '@material-ui/icons/Security';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ProfileUploadImage from './functionality/ProfileUploadImage'

//User profile type icon needs to be added.

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class ProfileManagement extends Component{
    constructor(props){
        super(props)
        this.ID = "/List" + this.props.passID
        this.handleSubmitData = this.handleSubmitData.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
        this.state = {'User_Type':this.props.passDetails['User_Type'], 'biography':this.props.passDetails['biography'], 'education':this.props.passDetails['education'], 'institution':this.props.passDetails['institution'], 'profession':this.props.passDetails['profession'], 'company':this.props.passDetails['company'], 'location':this.props.passDetails['location'], 'age':this.props.passDetails['age'], 'newpassword':'', 'currentpassword':'', invalid: false, Pop: false, 'ProfileImage':null, Display:this.props.passDetails['ProfileImage'] };
    }

    removeAccount = () => {
      let url = "/api/register/user/delete"
      axios.post(url)
          .then(res => console.log("done"))
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success', response));
    }

    handleChange = (event) =>{
        this.setState({ [event.target.name]:event.target.value });
    }
    
    handleClick = (event) => {
      event.preventDefault();
      this.setState({Pop:!this.state.Pop});
    }

    onProfileImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setState({
          ProfileImage: img,
          Display: URL.createObjectURL(img)
        })
      }
    }

    handleSubmitData = (event) =>{
      event.preventDefault();
      const url = `api/accounts/edit_profile`;
      const data = { User_Type:this.state.User_Type, biography:this.state.biography, education:this.state.education, institution:this.state.institution, profession:this.state.profession, company:this.state.company, location:this.state.location, age:this.state.age, ProfileImage:this.state.ProfileImage };
      const formData = new FormData();
      formData.append("User_Type", data["User_Type"]);
      formData.append("biography", data["biography"]);
      formData.append("education", data["education"]);
      formData.append("institution", data["institution"]);
      formData.append("profession", data["profession"]);
      formData.append("company", data["company"]);
      formData.append("location", data["location"]);
      formData.append("age", data["age"]);

      if (this.state.ProfileImage) {
        formData.append("ProfileImage", this.state.ProfileImage, this.state.ProfileImage.name);
      } else {
        formData.append("ProfileImage", null);
      }

      axios.put(url, formData, {
        headers: {
          'content-type': 'multipart/form-data'
          }
      } )
        .then(res => {
          this.props.onChange(this.props.val)
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success', response));
      }

      handleSubmitPassword = (event) =>{
        event.preventDefault();
        const url = `api/register/change_password`;
        const data = { newpassword:this.state.newpassword, currentpassword:this.state.currentpassword };
        
        axios.post(url, { data })
          .then(res => {
            this.props.onChange(this.props.val)
          })
          .catch(error => this.setState({invalid:true}))
          .then(response => console.log('Success', response));
        }
        
      render(){
        return(
            <OuterContainer>
            <Container>
              <Upper>
                <Profilepicture src={this.state.Display} width="200px" height ="200px" onClick={this.handleClick} />
                <ProfileUploadImage trigger={this.state.Pop} setTrigger={this.handleClick} PFunc={this.onProfileImageChange} >
                </ProfileUploadImage>
                <Name style={{marginLeft:"5%"}}>{this.props.passUsername}</Name>
                <Admintag>
                  {  (this.state.User_Type === 'ADMIN') && <SecurityIcon style = {{ color:"#00FF00", height:"100%", width:"100%" }}/>    }
                  {  (this.state.User_Type === 'MODERATOR') && <SecurityIcon style = {{ color:"#FFFF00", height:"100%", width:"100%" }}/>    }
                  {  (this.state.User_Type === 'VERIFIED') && <VerifiedUserIcon style = {{ color:"#00FF00", height:"100%", width:"100%" }}/>    }
                  {  (this.state.User_Type === 'UNVERIFIED') && <VerifiedUserIcon style = {{ color:"#FFFF00", height:"100%", width:"100%" }}/>    }
                  <h4>{this.state.User_Type}</h4>
                  </Admintag>
              </Upper>

              <Lower>
                <Form onSubmit={this.handleSubmitData}>
                  <Descone>
                      {  (this.state.User_Type === 'ADMIN') && <Profession>Profession</Profession>    }
                      {  (this.state.User_Type === 'ADMIN') && <Input type="text" name="profession" value={this.state.profession} onChange={this.handleChange} />   }
                      {  (this.state.User_Type === 'ADMIN') && <Company>Company</Company> }
                      {  (this.state.User_Type === 'ADMIN') && <Input type="text" name="company" value={this.state.company} onChange={this.handleChange} /> }
                      {  (this.state.User_Type != 'ADMIN') && <Profession>Education</Profession>    }
                      {  (this.state.User_Type != 'ADMIN') && <Input type="text" name="education" value={this.state.education} onChange={this.handleChange} />   }
                      {  (this.state.User_Type != 'ADMIN') && <Company>Institution</Company> }
                      {  (this.state.User_Type != 'ADMIN') && <Input type="text" name="institution" value={this.state.institution} onChange={this.handleChange} /> }
                      <Location>Location</Location>
                      <Input type="text" name="location" value={this.state.location} onChange={this.handleChange} /><br/>
                      <Age>Age</Age>
                      <Input type="text" name="age" value={this.state.age} onChange={this.handleChange} /><br/>
                      <Biography>
                        <BioText>
                          Biography
                        </BioText>
                        <TellUsAboutYourself>
                          <TextArea rows="25" cols="50" name="biography" onChange={this.handleChange} >{this.state.biography}</TextArea>
                        </TellUsAboutYourself>
                      </Biography>
                      <Input type="submit" value="Save" style = {{height: "40px",width:"80px", fontFamily: "Manrope",fontStyle: "normal",fontWeight: "bold",fontSize: "25px",lineHeight: "34px",color: "#FFFFFF", background:"#03204C", position:"relative", borderRadius:"8%", marginTop:"145%"}}/>
                  </Descone>
                </Form>
                
                <ButtonsActivity>
                  <ChangePassword>
                      <form onSubmit={this.handleSubmitPassword}>
                        <TT>Change Password</TT>
                        <br/>
                        <T>Current Password</T><br/>
                        <Input type="text" required name="currentpassword"  minLength="8" maxLength="32" onChange={this.handleChange} style = {{width:'65%'}}/><br/>
                        <T>New Password</T>
                        <br/>
                        <Input type="text" required name="newpassword"  minLength="8" maxLength="32" onChange={this.handleChange} style = {{width:'65%'}}/> <br/>
                        <InputSave type="submit" value="Save" style = {{paddngBottom: "5px", position:"relative", borderRadius:"8%", marginLeft:"10%", marginTop:"5%",height: "30px",width:"80px", fontFamily: "Manrope",fontStyle: "normal",fontWeight: "bold",fontSize: "20px",lineHeight: "34px",color: "#FFFFFF", background:"green", borderRadius:"8%"}} />
                        { this.state.invalid && <ErrorText>Current password cannot be the same as new password.</ErrorText> }
                      </form>
                    </ChangePassword>
                    <Link to='/List' value="My List" style={{textDecoration:"none"}}>
                      <MyList>
                        <MyListBackground>
                          My List
                        </MyListBackground>
                      </MyList>
                    </Link>
                    <Link to='/reports' value="Reports" style={{textDecoration:"none"}}>
                      <Report>
                        <ReportBackground>
                          Report History
                        </ReportBackground>
                      </Report>
                    </Link>
                    {
                      ((this.state.User_Type === 'MODERATOR') || (this.state.User_Type === 'ADMIN')) &&
                        <Link to='/blacklist' value="Blacklist" style={{textDecoration:"none"}}>
                          <Settings>
                            <SettingsBackground>
                              Blacklist
                            </SettingsBackground>
                          </Settings>
                        </Link>
                    }
                    {
                      ((this.state.User_Type === 'VERIFIED') || (this.state.User_Type === 'UNVERIFIED')) &&
                        <Link to={{
                          pathname : '/modhist',
                          state : this.state.User_Type,
                      }}  value="Moderator Application History" style={{textDecoration:"none"}}>
                          <Settings>
                            <SettingsBackground>
                              Moderator Application History
                            </SettingsBackground>
                          </Settings>
                        </Link>
                    }
                    {
                      (this.state.User_Type === 'ADMIN') &&
                        <Link to='/remove_account/admin' value="Remove Account" style={{textDecoration:"none"}}>
                          <ModApp>
                            <ModAppBackground>
                              Account Removal Requests
                            </ModAppBackground>
                          </ModApp>
                        </Link>
                    }
                    {
                      ((this.state.User_Type === 'VERIFIED') || (this.state.User_Type === 'UNVERIFIED') || (this.state.User_Type === 'MODERATOR')) &&
                          <ModApp>
                            <ModAppBackground onClick={this.removeAccount}>
                              Remove Account
                            </ModAppBackground>
                          </ModApp>
                    }
                </ButtonsActivity>
              </Lower>

            </Container>
        </OuterContainer>
        )
      }
    }

export default ProfileManagement;

const OuterContainer = styled.div`
width: 90%;
height: auto;
margin-top:3%;
margin-left:3%;
margin-right:3%;
margin-bottom:4%;
background:white;
`
const Container = styled.div`
    width: 90%;
    height:auto;
    margin-top:3%;
    margin-left:3%;
    margin-right:3%;
    margin-bottom:4%;
    background: #DCF2F8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
`
const Upper = styled.div`
    display:flex;
    width: 100%;
    height: 186px;
    
    background: linear-gradient(90deg, #03204C 10.42%, rgba(70, 51, 138, 0.88) 97.92%);
`

const Profilepicture = styled.img`
    width: 20%;
    height: 115%;
    border-radius: 50px;
    margin-left:5%;
    margin-top:5%;
    cursor:pointer;
`

const Name = styled.h3`
    width:30%;
    height: 55px;
    margin-top:5%;
    margin-left:2%;
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 55px;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Admintag = styled.div`
    left: 25%;
    bottom: 7%;
    top: 10%;
    width: 82px;
    height: 82px;
    color:white;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    position: relative;
`

const ErrorText = styled.span`
    color: #FF0000;
    position: absolute;
`

const Lower = styled.div`
    margin-top:80px;
    margin-left:20px;
    display:flex;
    @media only screen and (max-width: 1000px){
      display:flex;
      flex-flow:row wrap;
      height:auto;
  }
`
const Form = styled.form`
@media only screen and (max-width: 900px){
  display:flex;
  flex-flow:row wrap;
  height:auto;
}
`
const Descone = styled.div`
margin-top: 50px;
margin-left: 60px;
`
const ButtonsActivity = styled.div`
    position:relative;
    width:100%;
    height:90%;
    left:40%;
`


const Profession = styled.h3`
    width: 131px;
    height: 34px;
    margin-bottom: 10px;
    margin-top: 30px;
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 34px;
    color: #13AAFF;
`

const Company = styled.h3`
margin-bottom: 10px;
    margin-top: 30px;
    width: 121px;
    height: 34px;
   
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 34px;
    color: #13AAFF;
`
const Location = styled.h3`
margin-bottom: 10px;
    margin-top: 30px;
    width: 107px;
    height: 34px;
    
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 34px;
    color: #13AAFF;
`

const Age = styled.h3`
margin-bottom: 10px;
    margin-top: 30px;
    width: 48px;
    height: 34px;
  
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 34px;
    color: #13AAFF;
`

const Biography = styled.div`
    position:relative;
    margin-top:-150%;
    margin-left:80%;
`

const BioText = styled.h3`
    width: 273px;
    height: 48px;
    position: absolute
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 41px;
    color: #13AAFF;
`

const TellUsAboutYourself = styled.div`
position:absolute;
height: 150px;
width:150px;
`

const Buttons = styled.div`
`

const MyList = styled.div`
`

const MyListBackground = styled.div`
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom:20px;
   
    width: 250px;
    height: 30px;
   
    background: #03204C;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
`

const MyListText = styled.h3`
width: 243px;
height: 24px;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
color: #FFFFFF;
`

const Report = styled.div`
`

const ReportBackground = styled.div`
color:white;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:20px;
width: 250px;
height: 30px;
background: #03204C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`

const ReportText = styled.h3`
    width: 81px;
    height: 24px;
   
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #FFFFFF;
`
const Settings = styled.div`
`
const SettingsBackground = styled.div`
color:white;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:20px;
width: 250px;
height: 30px;
background: #03204C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`
const SettingsText = styled.h3`
    width: 95px;
    height: 24px;
   
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
`
const ModApp = styled.div`
`
const ModAppBackground = styled.div`
color:white;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:40px;
width: 250px;
height: 30px;
background: #03204C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`

const ModAppText = styled.h3`
    width: 243px;
    height: 24px;
   
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
`

const PMBackground = styled.div`
color:black;
display:flex;
justify-content:center;
align-items:center;
    width: 250px;
    height: 86px;
    
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const PMText = styled.h3`
    width: 170px;
    height: 27px;
   
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
`

const Publications = styled.div`
`

const PrivateMessages = styled.div`
`

const ChangePassword = styled.div`
position:relative;
height:40%;
width:50%;
margin-top:-0.5%;
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 45px;
color: #13AAFF;
`
const T = styled.text`
font-size:25px;
width:550px;
position:relative;
margin-bottom:5%;
`

const TT = styled.text`
font-size:30px;
width:550px;
position:relative;
margin-bottom:5%;
`

const InputSave = styled.input`
    width:90px;
    position:relative;
    bottom:5px;
    left:35%;
`
const Input = styled.input`
width: 50%;
height: 40px;
background: #F9F7FC;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 8px;
border:2px solid #ccc;
:focus{
    outline:2px;   
}
`
const TextArea = styled.textarea`
background: #F9F7FC;
border: 2px solid #ccc;
border-radius:20px;
padding-left:6%;
padding-right:6%;
padding-top:4%;
padding-bottom:4%;
:focus{
  outline:2px;   
}
`