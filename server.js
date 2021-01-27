const express=require('express')
const mongoose=require('mongoose');
const app=express();
const dotenv=require('dotenv');
const router=require('./userRouter.js');
const morgan=require('morgan');
const cors=require('cors');
dotenv.config();

app.use(express.json())
app.use(morgan());
app.use(cors());
app.use("/app",router);

app.get('/',(req,res)=>{
    res.send("hai");
})

app.listen(3002,()=>
{
    console.log("localhost connected");
})

mongoose.set("useNewUrlParser",true);
mongoose.set("useUnifiedTopology",true);
mongoose.connect(process.env.DATABASE,(err)=>{
    if(err)
    {
        console.log(""+err)
    }
    else
    {
        console.log("db connected");
    }
})