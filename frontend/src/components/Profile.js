import React from 'react';
import styled from 'styled-components';
import {useEffect, useState} from "react";
import axios from 'axios';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'


//User profile photo needs to be added.
//User profile type icon needs to be added.

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Profile() {
    const [Details, setDetails] = useState( {'User_Type':'', 'biography':'', 'education':'', 'institution':'', 'profession':'', 'company':'', 'location':'', 'age':'', 'user':{} } )
    const [User, setUser] = useState('')
    function getData(){
        axios.get(`api/accounts/profile`).then((res) => {
            setDetails(res.data)
            setUser(res.data['user']['username'])
        })
        .catch(error => console.log('Error:', error))
    }
    useEffect(() => {
        getData()
    }, [])

    let ID_List = "/List/" + User['id']

    return (
        <div>
            <span>{User}</span><br/>
            <span>{Details['User_Type']}</span><br/>
            <h4>Biography</h4>
            <span>{Details['biography']}</span><br/>
            {   (Details['User_Type'] === 'ADMIN') && <h4>Profession</h4> }
            {   (Details['User_Type'] === 'ADMIN') && <span>{Details['profession']}</span> }
            {   (Details['User_Type'] === 'ADMIN') && <h4>Company</h4> }
            {   (Details['User_Type'] === 'ADMIN') && <span>{Details['company']}</span>  }
            {   (Details['User_Type'] === 'MODERATOR') && <h4>Education</h4>  }
            {   (Details['User_Type'] === 'MODERATOR') && <span>{Details['education']}</span>  }
            {   (Details['User_Type'] === 'MODERATOR') && <h4>Institution</h4> }
            {   (Details['User_Type'] === 'MODERATOR') && <span>{Details['institution']}</span> }
            <h4>Location</h4>
            <span>{Details['location']}</span><br/>
            <h4>Age</h4>
            <span>{Details['age']}</span><br/>
            
            <br/>
            
            <Link to={ID_List} value="My List">
                My List
            </Link><br/>
            
            <Link to='/reports' value="Reports">
                Reports
            </Link><br/>
            
            <Link to='/' value="Settings">
                Settings
            </Link><br/>
            
            { ((Details['User_Type'] === 'MODERATOR') || (Details['User_Type'] === 'ADMIN')) && <Link to='/modapps' value="Moderator Applications">Moderator Applications</Link> }
            { ((Details['User_Type'] === 'VERIFIED') || (Details['User_Type'] === 'UNVERIFIED')) && <Link to='/' value="Moderator Application Form">Moderator Application Form</Link> }
            
            <br/>
            <br/>
            
            <h4>Activity</h4><br/>
            
            <Link to='/' value="My Activity">
                My Activity
            </Link><br/>
            
            <Link to='/' value="Publications">
                Publications
            </Link><br/>
            
            <Link to='/' value="Private Messages">
                Private Messages
            </Link><br/>
            
        </div>
    )
}

export default Profile;