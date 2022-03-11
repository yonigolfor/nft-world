import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../globalStyle.css'
import axios from 'axios';
import LoadingScreen from './loadingScreen';

import { useState, useEffect } from 'react';


const updateSquareOwner = (userId, squareId) => {
    let data = { 
        email: userId, 
        propertyId: squareId 
        };


    axios({
    url: '/update-square-owner',
    method: 'POST',
    data: data
    })
    .then((res) => {

    console.log('data updated finished');

    })
    .catch((e) => console.log('Error happenned', e));
}

const buySquare = (price, id, userId, money, navigate)=>{
    console.log("money:", money, " price: ",price);

    // check user has enough money
    if(parseInt(money) >= parseInt(price)){
    console.log("have money");

    // find owner
    // findOwnerId(id, setOwnerId).then((result) =>{
    //     console.log("result back", result);
    // })
    console.log("in findOwnerId");

    let data = { propertyId: id };
    axios({
        url: '/find-user-by-propety',
        method: 'POST',
        data: data
    })
    .then((res) => {
        
        console.log("in func res", res);
        console.log("in func data", res.data);
        
   
    if(res.data){ // if owner exist so its another user
        
        // add to owner + take of the ownership
        addMoneyToOwner(res.data, price, id);
    }
    else {
        addMoneyToOwner('Y&H.ltd', price, id);
    }

    // decrease from user
        decreaseMoneyFromBuyer(userId, price, id);
    
        updateSquareOwner(userId, id);

        setTimeout(function(){
            navigate(`/world/${userId}/${money-price}`);
        },600)
        
    })
    .catch((e) => console.log('Error happenned', e));

    }

    else {
        console.log("not enough money...");
    }


}

// const findOwnerId = async (squareId, setOwnerId) => {
//     console.log("in findOwnerId");

//     let data = { propertyId: squareId };
//     await axios({
//         url: '/find-user-by-propety',
//         method: 'POST',
//         data: data
//     })
//     .then((res) => {
        
//         console.log("in func res", res);
//         console.log("in func data", res.data);
//         setOwnerId(res.data);
//         resolve(res.data);
            
        
//     })
//     .catch((e) => console.log('Error happenned', e));
// }

const addMoneyToOwner = (ownerId, price, propertyId) =>{
    console.log("theOwner: ", ownerId);
    let data = { 
                email: ownerId, 
                money: price, 
                propertyId: propertyId 
                };
    

    axios({
        url: '/add-money-to-owner',
        method: 'POST',
        data: data
    })
    .then((res) => {
        
       console.log('data updated finished');
        
    })
    .catch((e) => console.log('Error happenned', e));
}

const decreaseMoneyFromBuyer = (userId, price, propertyId) =>{
    
    let data = { 
                email: userId, 
                money: price, 
                propertyId: propertyId 
                };
    

    axios({
        url: '/decrease-money-from-user',
        method: 'POST',
        data: data
    })
    .then((res) => {
       console.log('data updated finished');
        
    })
    .catch((e) => console.log('Error happenned', e));
}

const cancel =(navigate, email, money)=>{
    navigate(`/world/${email}/${money}`);
    console.log('cancel');
}

const getOwnerId = async (squareId, setOwnerId, setIsLoading) => {
    
    console.log("in findOwnerId");
    let ownerId = null;
    let data = { propertyId: squareId };
    await axios({
        url: '/find-user-by-propety',
        method: 'POST',
        data: data
    })
    .then((res) => {
        console.log("id got: ", res.data);
        if(res.data)
            setOwnerId(res.data);
        else
            setOwnerId('Y&H.ltd');
        setIsLoading(false);
        
    })
    .catch((e) => console.log('Error happenned', e));
}

const handleNewPrice = (squareId, newPrice) => {
    console.log(squareId, newPrice);

    let data = { 
        newPrice: newPrice, 
        propertyId: squareId 
    };


    axios({
    url: '/set-new-price-to-square',
    method: 'POST',
    data: data
    })
    .then((res) => {

    console.log('data updated finished');

    })
    .catch((e) => console.log('Error happenned', e));
}

const getPrice = (squareId, setPrice, setIsForSale) => {
    let data = { 
        propertyId: squareId 
    };


    axios({
    url: '/get-square-price',
    method: 'POST',
    data: data
    })
    .then((res) => {
    console.log("price Back from server: ", res.data.price);
    setPrice(res.data.price);
    setIsForSale(res.data.price > 0);
    })
    .catch((e) => console.log('Error happenned', e));
}

const updateSquareForSale = (squareId, isForSale, newPrice, setIsForSale) =>{
    
    setIsForSale(!isForSale);
    
   
    
    
    if(isForSale){  // not for sale
        console.log('not for sale');

        let data = { 
            propertyId: squareId,
            newPrice: -1
        };

    //  update price of square to -1 => not for sale
    axios({
    url: '/set-new-price-to-square',
    method: 'POST',
    data: data
    })
    .then((res) => {
    console.log("Update succeed");
    })
    .catch((e) => console.log('Error happenned', e));


    }
    else {
        console.log('For sale');
        // wait for update in the other input
        
    }
}


export default function BuyScreen({ navigation }){
    let navigate = useNavigate();  

    let {id, userId, money } = useParams();

    const [ownerId, setOwnerId] = useState();
    const [price, setPrice] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const [newPrice, setNewPrice] = useState();
    const [isForSale, setIsForSale] = useState();
    const forSaleString = "Publish for sale";
    const NotForSaleString = "Take out of sale";
    // const [disableInput, setDisableInput] = useState(true);
    
    
    useEffect(() =>{
        getOwnerId(id, setOwnerId, setIsLoading);
        // get property price
        getPrice(id, setPrice, setIsForSale); // if price == -1 => is not for sale
        
        

        }, [])

    let userBalance = money;

    if (isLoading){
        return <LoadingScreen />
    }


   if (ownerId == userId) {

       // case owner enters his property
        return (
            <div className='buy_container'>
            <h1 className='buy_title'>My property :)</h1>
            <h2 style={{marginTop: 20}}>Balance: {userBalance}</h2>
            <h2>Propery id: {id}</h2>
            {price > 0 ?
            <div>
            <h2>My price: {price}</h2> 
            </div>
            : 
            <h2>*Not for sale</h2>}
            
            <div>
                <form>
                <label>Enter new price :
                    <input type="number" 
                    value={newPrice}
                    onChange={(e)=>setNewPrice(e.target.value)}
                    disabled={!isForSale}
                    />
                </label>

                <button disabled={!isForSale} onClick={()=>handleNewPrice(id, newPrice)}>Change price</button>
                </form>
            </div>
            <h2></h2>
            <button className='buy_btn' onClick={()=>updateSquareForSale(id, isForSale, newPrice, setIsForSale)}>
                {isForSale? NotForSaleString: forSaleString}
            </button>
            <h2></h2>

            <button onClick={()=>{cancel(navigate, userId, money)}}>Back to NFT</button>

        </div>
        )
   }
   else{
    return(
        <div className='buy_container'>
            <h1 className='buy_title'>Buy Property</h1>
            <h2>Balance: {userBalance}</h2>
            <h2>Propery id: {id}</h2>
            {price > 0 ?
            <div>
                <h2>price: {price}</h2> 
                <button className='buy_btn' onClick={()=>buySquare(price, id, userId, money, navigate)}>Buy</button>
            </div>
            : 
            <h2>*Not for sale</h2>}
            
            
            
            <button onClick={()=>cancel(navigate, userId, money)}>Back to world</button>

        </div>
    )
   }
    
}