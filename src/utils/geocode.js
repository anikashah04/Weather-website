const request=require('request')
//body is a property of response
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYW5pa2FzaGFoMDQiLCJhIjoiY2x5dmo4a2d0MWExbDJrcjR3OTRnMDFkOSJ9.LEsM-eGOo1zynRmfDfiuSQ&limit=1'
    request({url:url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Location Service',undefined)
        }else if(body.features.length===0){
            callback('Unable to find Location',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode
