const express = require('express');
const PORT = 6207;
const app = express();

let users = [
    {
        id: 1,
        name: "DP"
    }
]

app.use(express.json());

app.use((req,res, next)=>{
    console.log(req.path,'======req.path====== ', req.method,'=======req.method=======');
    next();
})

app.get('/',(req,res)=>{
    res.statusCode = 200;
    res.json({
        message: "Hello...",
    })
    return;
});
app.get('/users',(req,res)=>{
    res.statusCode = 200;
    res.json({
        message: "Success",
        data: users
    })
    return;
});
app.get('/users/:id',(req,res,next)=>{
    try{
        const userId = (req.params.id && Number.isInteger(req.params.id) ) ? Number(req.params.id) : 0;
    
        if(userId){
            const userIndex = users.findIndex((item)=>Number(item?.id) === userId);
            res.statusCode = 200;
            res.json({
                message: "Success",
                data: users[userIndex]
            })
        }
        return;
    }catch(e){
        next(e);
    }
});
app.post('/users',(req,res,next)=>{
    try{
        const newUser = {
            ...req.body,
            id: users.length ? users[users.length-1].id + 1 : 1
        }
        users.push(newUser);
        res.statusCode = 201;
        res.json({
            message: "Success",
            data: newUser
        })
    }catch(e){
        next(e);
    }
    
    return;
});
app.patch('/users/:id',(req,res,next)=>{
    try{
        const userId = (req.params.id && Number.isInteger(req.params.id) ) ? Number(req.params.id) : 0;
    
        if(userId){
            const userIndex = users.findIndex((item)=>Number(item?.id) === userId);
            users[userIndex] = {
                ...users[userIndex],
                id: userId
            }
            if(req.body.name){
                users[userIndex]['name'] = req.body.name;
            }
            res.json({
                message: "Success",
                data: users[userIndex]
            })
            return;
        }else{
            
            res.statusCode = 400;
            res.json({
                message: "Invalid id",
                data: null
            })
            return;
        }
        
    }catch(e){
        next(e);
    }
});
app.delete('/users/:id',(req,res,next)=>{
    try{
        const userId = (req.params.id && Number.isInteger(req.params.id) ) ? Number(req.params.id) : 0;
    
        if(userId){
            users = users.filter((item)=>Number(item?.id) !== userId)
            res.json({
                message: "Success",
                data: null
            })
            return;
        }else{
            
            res.statusCode = 400;
            res.json({
                message: "Invalid id",
                data: null
            })
            return;
        }
    }catch(e){
        next(e);
    }
});


app.use((err,req,res, next)=>{
    console.log(err,'======err====== ');
    res.statusCode = err.statusCode || 500;
    res.json({
        message: err.message,
    });
    return;
})

app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT );
});