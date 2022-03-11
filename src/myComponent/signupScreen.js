import '../globalStyle.css'
import { useState } from 'react';
import { Component } from 'react/cjs/react.production.min';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import World from './world';




const openWorldMap = (data, navigate) =>{
  
    if (data.userType != 'Guest')
        data.money = 1000;
    else 
        data.money = -1
    // data.properties = [-1];
    // console.log("data:" ,data);
    
    navigate(`/world/${data.email}/${data.money}`);
    
    
}

export default function SignupScreen({ navigation }){
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
// const [repeatPassword, setRepeatPassword] = useState('');
const [type, setType] = useState();

let navigate = useNavigate();

const submitHandler = () =>{
    
    let data = {
        email: email,
        password: password,
        // repeatPassword: repeatPassword,
        userType: type,
        properties: [],
        
    }
    

    axios({
        url: '/add-user',
        method: 'POST',
        data: data
    })
    .then((res) => {
        console.log('user data sent successfully to server', res.data);
        openWorldMap(data, navigate);
    })
    .catch((e) => console.log('Error happenned', e));
}


    return(
<div className='all'>
        <h1>Sign Up</h1>    

        <label for="email"><b>Email</b></label>
        <input type="text" 
        placeholder="Enter Email" 
        name="email" 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        required />

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        required />

{/* repeat password ? */}
        {/* <label for="psw-repeat"><b>Repeat Password</b></label>
        <input type="password" placeholder="Repeat Password" 
        value={repeatPassword} 
        onChange={(e)=>setRepeatPassword(e.target.value)}
        name="psw-repeat" required /> */}

        <label for="type" ><b>Choose type</b></label>

        <input type="radio" id="Buyer"
        name="userType" value="Buyer" 
        onClick={()=>setType('Buyer')}
        />
        <label for="Buyer">Buyer</label>

        <input type="radio" id="Seller"
        name="userType" value="Seller" 
        onClick={()=>setType('Seller')}
        />
        <label for="Seller">Seller</label>

        <input type="radio" id="Guest"
        name="userType" value="Guest" 
        onClick={()=>setType('Guest')}
        />
        <label for="Guest">Guest</label>

        <button onClick={()=>submitHandler()}>Create user</button>
   
   
</div>
    )
}