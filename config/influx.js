const  {InfluxDB} =  require ('@influxdata/influxdb-client')
const influxDB = new InfluxDB({url: process.env.INFLUX_URL, token:process.env.INFLUX_TOKEN})


module.exports = influxDB