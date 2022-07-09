
console.log(process.env.STRIPE_SECRET_KEY)
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion,ObjectId, Transaction } = require('mongodb');
const uri = "mongodb+srv://tax-project:MwrbBSWPR6REXwy3@cluster0.icntp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); 


async function run(){
    try{
        await client.connect();
        console.log('db connected')
        const formCollection = client.db('tax-project').collection("form-details");
 
      //get all products
      app.post('/form-details',async(req,res)=>{
        const formDetails = req.body;
        const result = await formCollection.insertOne(formDetails)
        res.send(result)
    })

    app.get('/outcomeDetails/:email',async(req,res)=>{
        const email = req.params.email;
        console.log(email);
            const query = {email:`${email}`};
            console.log(query);
            const cursor = formCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
    })

    }
    finally{

    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
  res.send('hello tax-project')
})
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


