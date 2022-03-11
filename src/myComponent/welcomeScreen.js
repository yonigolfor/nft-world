import '../globalStyle.css'
import { useState } from 'react';
import LoginScreen from './loginScreen';
import SignupScreen from './signupScreen';



export default function WelcomeScreen(){
    

    return(
        <div>
        <h1 className='buy_title' style={{textAlign: 'center', fontStyle:"italic", marginTop:100,}}>
            Welcome to our NFT world
            </h1>
        <div className='container'>
            
            <LoginScreen />
            <SignupScreen />
           
        </div>
        </div>
    )
}