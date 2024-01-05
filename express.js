const express = require('express');
const app = express();

const port = 3000;

app.use(express.json()); //middlewire to convert body into json

app.get("/", (req, res) => {
    const {name, age} = req.query; //localhost:3000/?name=anish&age=22
    res.send(`${name},${age}`);
})

app.post("/contact", (req, res) => {
    const {name,phone,email} = req.body;
    
    if (!name) {
        res.status(422).json({message:"name missing"}); //422 client invalid data
    }
    res.status(200).json({message:`contact details received for ${name} are ${phone} and ${email}`});
})

app.listen(port, () => {
    console.log(`Listening to Port ${port}...`);
})