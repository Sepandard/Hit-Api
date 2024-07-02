


const  { Point } =  require ('@influxdata/influxdb-client')
const influxDB =  require ('../../../config/influx')

exports.insertHit = (app) => {
    app.ws('/api/hit', function (ws, req) {
        ws.on('message', function (msg) {
            const influxWrite = influxDB.getWriteApi(process.env.INFLUX_ORG, process.env.INFLUX_BUCKET);


            const model = JSON.parse(msg);
            const { x, y, value, isDesktop, path } = model.message;
            const point = new Point('hit_click')


                .tag('page_url', '/home')
                .floatField('x', x)
                .floatField('y', y)
                .stringField('model', JSON.stringify(model.message))
                .intField('value', value)

                ;



            influxWrite.writePoints([point]);
            influxWrite.close().then(() => {
                console.log('write successfully finished in point ', { x, y, value ,isDesktop});
            });
        });
        console.log('WebSocket connection established');
    });
}



