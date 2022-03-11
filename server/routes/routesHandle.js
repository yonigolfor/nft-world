const express = require('express');
const router = express.Router();

// const fs = require('fs');
const User = require('../model');
const Square = require('../squareModel');


router.post('/init-world', async (req, res) => {
  
  console.log('in server = init world')
  let world = req.body;
  console.log('req:', world);

  for (let i = 0; i < world.length; i++) {
    const element = world[i];
    console.log(element);
    
    // const square = new Square({
    //   _id: data.squareId,
    //   color: data.color,
    //   price: data.price,
    //   owner: data.owner,
  
    // });
    
  }

 

  // square.save()
  // .then((result) =>{
  //   console.log("saved success" , result); 
  //   res.send(result);
  // })
  // .catch((err) => console.log(err));
});


router.post('/add-square', async (req, res) => {
  
  console.log('in server = add square')
  data = req.body;
  console.log('req:', data);


  const square = new Square({
    _id: data.squareId,
    color: data.color,
    price: data.price,
    owner: data.owner,

  });

  square.save()
  .then((result) =>{
    console.log("saved success" , result); 
    res.send(result);
  })
  .catch((err) => console.log(err));
})

// Creating one get_signup
router.post('/add-user', async (req, res) => {
  let money = null;
  console.log('in server = add user')
  data = req.body;
  console.log('req:', data);


  if (data.userType != 'Guest')
    money = 1000;
  data.money = money;

  const user = new User({
    _id: data.email,
    name: data.email,
    password: data.password,
    userType: data.userType,
    money: money,
    properties: data.properties,

  });

  user.save()
  .then((result) =>{
    console.log("saved success" , result); 
    res.send(result);
  })
  .catch((err) => console.log(err));
})

// Updating One
// router.patch('/:id', getSubscriber, async (req, res) => {
//   if (req.body.name != null) {
//     res.subscriber.name = req.body.name
//   }
//   if (req.body.subscribedToChannel != null) {
//     res.subscriber.subscribedToChannel = req.body.subscribedToChannel
//   }
//   try {
//     const updatedSubscriber = await res.subscriber.save()
//     res.json(updatedSubscriber)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })



router.post('/find-user-by-propety', async (req, res) => {
  console.log('in server = find user by property');
  const data = req.body;
  console.log('req:', data);
  let id = data.propertyId;

  // find that one in mongo (match in email => id)
  User.find(
    { properties: { $in: [id] } })
  .then((result) =>{
    console.log("user found by proprtyID" , result[0].name); 
    res.send(result[0].name);    
  })
  .catch((err) => res.send('Y&H.ltd'));

})


// find One
router.post('/find-user', async (req, res) => {
  console.log('in server = find user');
  const data = req.body;
  console.log('req:', data);
  let id = data.email;

  // find that one in mongo (match in email => id)
  User.findById(id)
  .then((result) =>{
    console.log("user found" , result); 
    res.send(result);
  })
  .catch((err) => console.log(err));


});

router.post('/find-user-checkPass', async (req, res) => {
  console.log('in server = find-user-checkPass');
  const data = req.body;
  console.log('req:', data);
  let id = data.email;

  // find that one in mongo (match in email => id)
  User.findById(id)
  .then((user) =>{
    console.log("user found" , user);
    console.log('user.password: ', user.password);
    console.log('data.password: ', data.password);
    
    if (user.password == data.password) 
      res.send(user);
    else
      res.send("Failed password");
    
  })
  .catch((err) => {console.log(err); res.send("user not found")});


})

router.post('/decrease-money-from-user', async (req, res) => {
  console.log('in server = take money');
  const data = req.body;

  // find that one in mongo (match in email => id)
  try {
    const user = await User.updateOne(
      { 
        _id: data.email
      },
      { 
        $push: { properties: data.propertyId },
        $inc: { money : -data.money },
      },

      {new: true}
    )
    console.log("data updated successfully");
  }

  catch (err) {
    console.log(err);
    console.log('error found by me');
  }


})


router.post('/add-money-to-owner', async (req, res) => {
  console.log('in server = add money');
  const data = req.body;

  // find that one in mongo (match in email => id)
  try {
    const user = await User.updateOne(
      { 
        _id: data.email
      },
      { 
        $pull: { properties: data.propertyId },
        $inc: { money : data.money },
      },

      {new: true}
    )
    console.log("data updated successfully");
  }

  catch (err) {
    console.log(err);
    console.log('error found by me');
  }


})

router.post('/update-square-owner', async (req, res) => {
  console.log('in server = update-square-owner');
  const data = req.body;

  // find that one in mongo (match in email => id)
  try {
    const square = await Square.updateOne(
      { 
        _id: data.propertyId
      },
      { 
        $set: { "owner" : data.email}
      },

      {new: true}
    )
    console.log("data updated successfully");
  }

  catch (err) {
    console.log(err);
    console.log('error found by me');
  }
});

//
router.post('/set-new-price-to-square', async (req, res) => {
  console.log('in server = set-new-price-to-square');
  const data = req.body;
  console.log("data in server", data);

  // find that one in mongo (match in email => id)
  try {
    const square = await Square.updateOne(
      { 
        _id: data.propertyId
      },
      { 
        $set: { "price" : data.newPrice}
      },

      {new: true}
    )
    console.log("data updated successfully");
  }

  catch (err) {
    console.log(err);
    console.log('error found by me');
  }
});



router.post('/fetch-world', async (req, res) => {
  console.log('in server = fetch-world');

  // find that one in mongo (match in email => id)
  let world;

  // find that one in mongo (match in email => id)
  Square.find()
  .then((result) =>{
    console.log("Square found" , result); 
    res.send(result);
  })
  .catch((err) => console.log(err));
});


router.post('/get-square-price', async (req, res) => {
  console.log('in server = get-square-price');

  // find that one in mongo (match in email => id)
  const data = req.body;

  // find that one in mongo (match in email => id)
  Square.findById(data.propertyId)
  .then((result) =>{
    console.log("square found" , result); 
    res.send(result);
  })
  .catch((err) => console.log(err));
});


// async function getSubscriber(req, res, next) {
//   let subscriber
//   try {
//     subscriber = await Subscriber.findById(req.params.id)
//     if (subscriber == null) {
//       return res.status(404).json({ message: 'Cannot find subscriber' })
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message })
//   }

//   res.subscriber = subscriber
//   next()
// }

module.exports = router