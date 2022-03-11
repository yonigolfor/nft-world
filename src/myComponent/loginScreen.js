import '../globalStyle.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const openWorldMap = (userData, navigate) =>{
    
    // console.log("userData:" ,userData);

    // must send user id + money also
    navigate(`/world/${userData.name}/${userData.money}`);
   
    
}

export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    

    let navigate = useNavigate();


    const submitHandler = () => {
        // console.log('logging in...');
        let data = {
            email: email,
            password: password,       
        }
        
    
        axios({
            url: '/find-user-checkPass',
            method: 'POST',
            data: data
        })
        .then((res) => {
            if (res.data == 'user not found'){
                setErrorPassword('user not found');
                return;
            }
            // console.log("res:", res);
            // console.log('the data:', res.data);
            if (res.data){
                if(res.data !='Failed password')
                    openWorldMap(res.data, navigate);
                else{
                    console.log(res.data);
                    setErrorPassword('Wrong password');
                }
            }
               
            else {
                //print error
                console.log('didnt find user');
            }
        })
        .catch((e) => console.log('Error happenned', e));


    }
    return(
        <div className='all'>
           <h1>Login</h1>
    
            <label for="email"><b>Email</b></label>
            <input type="text" 
            placeholder="Enter Email" 
            name="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            required 
            />

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            required />
            <p style={{color:"red", fontStyle:"initial", fontWeight:"bold"}}>{errorPassword}</p>
            
            <button onClick={()=>submitHandler()}>Login</button>

      

        </div>
    )
}