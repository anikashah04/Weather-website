const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebar engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server /app.com 
app.use(express.static(publicDirectoryPath))//runs html file

//route for homepage
app.get('',(req,res)=>{
    res.render('viewindex',{
        title:'Weather',
        name:'Anika Shah'
    })
})

//route for /about
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Anika Shah'
    })
})

//route for /help
app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'This is some helpful text.',
        title:'Help',
        name:'Anika Shah'
    })
})

//route for /weather
app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,foreCastData)=>{
            if(error){
                return res.send({error})
            } 
            res.send({
                forecast:foreCastData,
                location,
                address:req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        res.send({
            error:'You must provide a search term'
        })
    }
    //instead of else you can use return in the above so it will return out of the function
    else{
    console.log(req.query.search)
    res.send({
        products:[]
    })}
})

//route for anything after help url
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Anika Shah',
        errorMessage:'Help article not found'
    })
})

//route if url is wrong 404
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Anika Shah',
        errorMessage:'Page not found'
    })
})

//Starts the server
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})