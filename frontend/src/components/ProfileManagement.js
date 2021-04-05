import React, { Component } from "react";
import styled from 'styled-components';
import axios from 'axios';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';

//User profile type icon needs to be added.

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class ProfileManagement extends Component{
    constructor(props){
        super(props)
        this.ID = "/List" + this.props.passID
        this.handleSubmitData = this.handleSubmitData.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
        this.state = {'User_Type':this.props.passDetails['User_Type'], 'biography':this.props.passDetails['biography'], 'education':this.props.passDetails['education'], 'institution':this.props.passDetails['institution'], 'profession':this.props.passDetails['profession'], 'company':this.props.passDetails['company'], 'location':this.props.passDetails['location'], 'age':this.props.passDetails['age'], 'newpassword':'', 'currentpassword':'', 'ProfileImage':this.props.passDetails['ProfileImage'] };
    }

    handleChange = (event) =>{
        this.setState({ [event.target.name]:event.target.value });
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
      //formData.append("ProfileImage", this.state.ProfileImage);
      axios.put(url, formData, {
        headers: {
          'content-type': 'multipart/form-data'
          }
      } )
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success', response));
      }

      handleSubmitPassword = (event) =>{
        event.preventDefault();
        const url = `api/register/change_password`;
        const data = { newpassword:this.state.newpassword, currentpassword:this.state.currentpassword };
        
        axios.post(url, { data })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success', response));
        }
        
      render(){
        return(
          <Container>

            <Upper>
              <Profilepicture src={this.state.ProfileImage} width="200px" height = "200px" />
              <Name>{this.props.passUsername}</Name>
              <Admintag>{this.state.User_Type}</Admintag>
            </Upper>

            <Lower>
              <form onSubmit={this.handleSubmitData}>
                <Descone>
                    {  (this.state.User_Type === 'ADMIN') && <Profession>Profession</Profession>    }
                    {  (this.state.User_Type === 'ADMIN') && <input type="text" name="profession" value={this.state.profession} onChange={this.handleChange} />   }
                    {  (this.state.User_Type === 'ADMIN') && <Company>Company</Company> }
                    {  (this.state.User_Type === 'ADMIN') && <input type="text" name="company" value={this.state.company} onChange={this.handleChange} /> }
                    {  (this.state.User_Type != 'ADMIN') && <Profession>Education</Profession>    }
                    {  (this.state.User_Type != 'ADMIN') && <input type="text" name="education" value={this.state.education} onChange={this.handleChange} />   }
                    {  (this.state.User_Type != 'ADMIN') && <Company>Institution</Company> }
                    {  (this.state.User_Type != 'ADMIN') && <input type="text" name="institution" value={this.state.institution} onChange={this.handleChange} /> }
                    <Location>Location</Location>
                    <input type="text" name="location" value={this.state.location} onChange={this.handleChange} /><br/>
                    <Age>Age</Age>
                    <input type="text" name="age" value={this.state.age} onChange={this.handleChange} /><br/>
                    <Biography>
                      <BioText>
                        Biography
                      </BioText>
                      <TellUsAboutYourself>
                        <textarea rows="25" cols="50" name="biography" onChange={this.handleChange} >{this.state.biography}</textarea>
                      </TellUsAboutYourself>
                    </Biography>
                    <input type="submit" value="Save" />
                </Descone>
              </form>
              
              <ButtonsActivity>
                <Buttons>
                  <Link to='/List' value="My List">
                    <MyList>
                      <MyListBackground>
                        My List
                      </MyListBackground>
                    </MyList>
                  </Link>
                  <Link to='/reports' value="Reports">
                    <Report>
                      <ReportBackground>
                        Report
                      </ReportBackground>
                    </Report>
                  </Link>
                  {
                    ((this.state.User_Type === 'MODERATOR') || (this.state.User_Type === 'ADMIN')) &&
                      <Link to='/' value="Blacklist">
                        <Settings>
                          <SettingsBackground>
                            Blacklist
                          </SettingsBackground>
                        </Settings>
                      </Link>
                  }
                  {
                    ((this.state.User_Type === 'VERIFIED') || (this.state.User_Type === 'UNVERIFIED')) &&
                      <Link to='/' value="Moderator Application History">
                        <Settings>
                          <SettingsBackground>
                            Moderator Application History
                          </SettingsBackground>
                        </Settings>
                      </Link>
                  }
                  {
                    (this.state.User_Type === 'ADMIN') &&
                      <Link to='/' value="Remove Account">
                        <ModApp>
                          <ModAppBackground>
                            Remove Account
                          </ModAppBackground>
                        </ModApp>
                      </Link>
                  }
                  {
                    ((this.state.User_Type === 'VERIFIED') || (this.state.User_Type === 'UNVERIFIED') || (this.state.User_Type === 'MODERATOR')) &&
                      <Link to='/' value="Remove Account">
                        <ModApp>
                          <ModAppBackground>
                            Remove Account
                          </ModAppBackground>
                        </ModApp>
                      </Link>
                  }
                </Buttons>
              </ButtonsActivity>

                <form onSubmit={this.handleSubmitPassword}>
                  <h3>Change Password</h3>
                  <h2>Current Password</h2>
                  <input type="text" name="currentpassword" onChange={this.handleChange} /><br/>
                  <h2>New Password</h2>
                  <input type="text" name="newpassword" onChange={this.handleChange} /> <br/>
                  <input type="submit" value="Save" />
                </form>
            </Lower>

          </Container>
        )
      }
    }

export default ProfileManagement;

const Container = styled.div`
    width: 1200px;
    height: 930px;
    margin-top:50px;
    margin-left:100px;
    margin-right:100px;
    margin-bottom:50px;

    background: #DCF2F8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
`
const Upper = styled.div`
    display:flex;
    width: 1200px;
    height: 186px;
    
    background: linear-gradient(90deg, #03204C 10.42%, rgba(70, 51, 138, 0.88) 97.92%);
`

const Profilepicture = styled.img`
    width: 213px;
    height: 237px;
    border-radius: 50px;
    margin-left:60px;
    margin-top:60px;
`

const Name = styled.h3`

    width: 511px;
    height: 55px;
    margin-top:60px;
    margin-left:0px;

    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 55px;

    color: #FFFFFF;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Admintag = styled.div`
    margin-left: 250px;
    margin-top:100px;
    width: 82px;
    height: 82px;
    color:white;
    border:none;

    box-sizing: border-box;
`

const Lower = styled.div`
    margin-top:80px;
    margin-left:20px;
    display:flex;

`

const Descone = styled.div`
margin-top: 50px;
margin-left: 60px;


`
const ButtonsActivity = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:180px;
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

    margin-left:20px;

`

const BioText = styled.h3`
    width: 273px;
    height: 48px;
   

    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 41px;

    color: #13AAFF;
`

const TellUsAboutYourself = styled.div`

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
   
    width: 359px;
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

width: 359px;
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

width: 359px;
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

width: 359px;
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
    width: 360px;
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