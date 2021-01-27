const router=require('express').Router();
const user=require('./userSchema.js');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
router.post('/register',async (req,res)=>{
    
    try{
         var emailExist=await user.findOne({email:req.body.email});
         if(emailExist)
         {
             return res.status(400).json("email already exists");
         }
         //password hashing
         var hash = await bcrypt.hash(req.body.password,10)
         const userSch=new user({
            name:req.body.name,
            email:req.body.email,
            password:hash
        })
        //save the registered value to the db

        var save = await userSch.save();
        res.json(save);
    }catch(err)
    {
        res.status(400).json(err)
    }
})

router.post('/login',async(req,res)=>{
    try{
        //checking whether the user exists or not

        var UserData=await user.findOne({email:req.body.email});
        if(!UserData)
        {
            return res.status(400).json("email not exists");
        }

        //check whether the password matches or not 

        var validPassword=await bcrypt.compare(req.body.password,UserData.password);

        if(!validPassword)
        {
            return res.status(400).json("password not correct");
        }

        //create or give a specific token to a valid user

        var UserToken=jwt.sign({email:UserData.email},'gokulprasanth');//param 1 is payload-info about the user,param 2 is unique key for the user

        res.header('auth',UserToken).json(UserToken);//user for putting the token in header


    }catch(err){
        res.status(400).json(err)
    }
})
//after login we need to go to some page so the persons only with token can to that page


const validUser=(req,res,next)=>{//used for getting the header token and save it in a variable.
    var token=req.header('auth');
    req.token=token;
    next();
}

router.get('/getAll',validUser,async(req,res)=>{
    jwt.verify(req.token,'gokulprasanth',async (err,data)=>{//verify method is used to verify the token and the key 
            if(err)
            {
                res.sendStatus(403);
            }
            else
            {
                const data= await user.find().select(['-password']);//select([field]) is used to show something and select([- field]) is used to hide some values
                res.json(data);
            }
    })
})
module.exports=router;