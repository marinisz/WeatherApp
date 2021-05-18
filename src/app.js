const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherLongLat = require('./utils/weatherLongLat')

//define paths for express comnfig
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views
app.set('view engine','hbs') //fazer o hbs - handle bars funcionar
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'marinisz'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name: 'Vinicius Marini'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Vinicius Marini',
        help: 'Here some help!!'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
            error: 'You must provide an adress'
        })
    }

    geocode(req.query.adress, (error, {latitude,longitude,location}={}/* cria um desctruction caso nao tenha latitude continua funcionando */) => {
        if(error){
            return res.send({
                error
            })
        }
        weatherLongLat(longitude,latitude, (error, weatherData) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast:weatherData,
                location,
                adress:req.query.adress
            })
        })
    })
})


app.get('/help/*',(req,res)=>{
    res.render('pagenotfound',{
        title:'Help article not Found',
        name:'Vinícius Marini'
    })
})

app.get('*',(req,res)=>{
    res.render('pagenotfound',{
        title:'Page not Found',
        name:'Vinícius Marini'
    })
})



app.listen(3000,()=>{
    console.log('Server on - Port 3000')
})