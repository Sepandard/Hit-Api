const influxDB = require('../../../config/influx');

exports.getAllHit = (app) => {
    app.get('/api/hit', async (req, res, next) => {

        const { page } = req.query
        

        try {
            const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG);
            const fluxQuery = `
                from(bucket: "hitBucket")
                |> range(start: -30d, stop: -1m)
                |> filter(fn: (r) => r["_measurement"] == "hit_click")
                |> filter(fn: (r) => r["_field"] == "model")
                |> filter(fn: (r) => r.page_url == "${page}")
            `;
            
            const data = await fetchData(queryApi, fluxQuery);
            const formattedData = formatData(data);
            res.status(200).json(formattedData);
        } catch (error) {
            next(error); 
        }
    });
};

async function fetchData(queryApi, fluxQuery) {
    const data = [];
    for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
        const hit = tableMeta.toObject(values);
        data.push({
            start: hit['_start'],
            stop: hit['_stop'],
            time: hit['_time'],
            field: hit['_field'],
            measurement: hit['_measurement'],
            value: JSON.parse(hit['_value']),
        });
    }
    return data;
}

function formatData(data) {
    return data.map(hit => ({
        start: hit.start,
        stop: hit.stop,
        time: hit.time,
        field: hit.field,
        measurement: hit.measurement,
        value: hit.value,
    }));
}
