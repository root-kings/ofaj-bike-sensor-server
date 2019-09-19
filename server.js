const express = require('express')

const app = express()

app.get('*',(req,res)=>{
    console.log(req.query)
    res.send(true)
})

app.listen(process.env.PORT,err=>{
    if (err) console.error(err)
    console.log(`listening on port ${process.env.PORT}`)
})