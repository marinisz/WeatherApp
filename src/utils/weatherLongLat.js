const request = require("request");

const weatherLongLat = (long,lat, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=8be29e00ac4ba7864ae347a4c3663918&query='+lat+','+long
    
    request({ url: url, json:true}, (error,{body})=>{
        if(error){
            console.log('Unable to connect to weather service!',undefined)
        }
        else if(body.error){
            console.log('Unable to find location',undefined)
        }
        else{
            callback(undefined,'Temperature: '+body.current.temperature+'. Feels like: '+body.current.temperature+'. Weather descriptions: '+body.current.weather_descriptions+'. Chance of raining: '+ body.current.precip)
        }
    })
}

module.exports = weatherLongLat