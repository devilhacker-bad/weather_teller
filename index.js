const http = require('http')
const fs = require('fs')
const requests = require('requests')
const read_data= fs.readFileSync("weather.html", "utf8")
var value
const replace = (para1, para2)=>{
  var change = para1.replace("{%cityname%}" , para2.name)
  change = change.replace("{%country%}" , para2.sys.country)
  change = change.replace("{%temp%}" , (para2.main.temp-273.15).toFixed(2))
  change = change.replace("{%min_temp%}" , (para2.main.temp_min-273.15).toFixed(2))
  change = change.replace("{%max_temp%}" , (para2.main.temp_max-273.15).toFixed(2))
  return change
}


const port = http.createServer(function(req , res){
    requests('https://api.openweathermap.org/data/2.5/weather?q=lucknow&appid=12398e926a632721f6ed15fe3e12c71b')
    .on('data', function (chunk) {
    //   console.log(chunk)
    const object_data = JSON.parse(chunk)
    // console.log(object_data.name)
    value = replace(read_data, object_data) 
      res.end(value)
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
     
      console.log('end');
    });

    
})
port.listen(3000)



// (org.main.temp-273.15).toFixed(2)