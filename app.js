const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 5000;


// Built in middleware
const staticPath = path.join(__dirname + '/public');

const template_path = path.join(__dirname + '/templates/views');
const template_path1 = path.join(__dirname + '/templates/partials');
// console.log(staticPath);
// view engine use kya hbs wala
app.set('view engine','hbs');

// default path views hota hai hum ne waha templates rakha tu update code nechy kya k ye path follow kro
app.set('views',template_path)

// or partials ko register kya k partials folder me jo b files hoge osay call kry gy different pages me.
hbs.registerPartials(template_path1);

app.use(express.static(staticPath))



app.get('/',(req,res)=>{
    // res.send("Home Page");
    res.render('index');
})

app.get('/about',(req,res)=>{
    // res.send("About Page");
    res.render('about');
})

// app.get('/data',(req,res)=>{
//     // res.send("Weather Page");
//      axios.get("https://jsonplaceholder.typicode.com/posts").then((result)=>{
//         // console.log(result);
//         res.render('data',{information:result.data});
//     }).catch((error)=>{
//         console.log(error);
//     })
    
// })


// using async
app.get('/data',async (req,res)=>{
    // res.send("Weather Page");
     await axios.get("https://jsonplaceholder.typicode.com/posts").then((result)=>{
        // console.log(result);
        res.render('data',{information:result.data});
        // res.send(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    
})

// details page
app.get('/details',async (req,res)=>{
    //  const view_id = req.query.id;
     await axios.get("https://jsonplaceholder.typicode.com/posts",{params:{id:3}}).then((result)=>{
        // console.log(result);
        res.render('data',{information:result.data});
        // res.send(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    
})

app.get('*',(req,res)=>{
    // res.send("404 Page");
    res.render('404',{
        errormsg: "Opps! Page Not Found"
    });
})


app.listen(PORT,()=>{
    console.log("Server Running");
})