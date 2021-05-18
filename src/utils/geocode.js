const request = require('request')

const geocode = (adress, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoidmluaWNpdXNzeiIsImEiOiJja28xaDk3NDQwbHZ1MnZwOWRtajZmNWRpIn0.qeDWmivBaGnJx1AZXc-Aqg&limit=1'
    //esse encodeURIComponent transforma tudo em string, porque se tiver algum caracter especial ele buga se for so o adress
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services.',undefined)
        }else if(body.features.length===0){
            callback('city not found. Try another search.',undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode