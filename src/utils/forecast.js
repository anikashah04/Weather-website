
const request=require('request')

const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=45bc8b9d9c5e9493b963be0ef0af4188&query='+ lat +','+ long +'&units=m'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Weather Service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+".It is currently "+body.current.temperature+" degrees out.It feels like "+body.current.feelslike+" degrees out.The humidity is "+body.current.humidity+"%.The UV index is "+body.current.uv_index+".")
        }

    })
    
}

module.exports=forecast 
