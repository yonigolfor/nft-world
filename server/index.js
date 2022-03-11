const express = require ('express');
const app = express();
// const fs = require('fs');
const mongoose = require('mongoose')

const cors = require('cors');


const url = 'mongodb+srv://Cristiano:webdev@cluster0.apmkq.mongodb.net/nft?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => console.log('connected to db'))
.catch((err) => console.log(err));

const PORT = 4000; //different than react port = 3000


app.listen(PORT, () => console.log('listening server ', PORT))

app.use(express.json());

app.use(cors())

const nftRouter = require('./routes/routesHandle')
app.use('/', nftRouter);
