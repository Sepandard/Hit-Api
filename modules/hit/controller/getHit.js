const influxDB = require('../../../config/influx');
const HitType = require('../../../contract/hitType');




exports.getHitByType = (app) => {
    app.get('/api/hit/type', async (req, res, next) => {

        const { page } = req.query
        

        try {
            const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG);
            const fluxQuery = `
                from(bucket: "hitBucket")
                |> range(start: -30d, stop: -1m)
                |> filter(fn: (r) => r["_measurement"] == "hit_click")
                |> filter(fn: (r) => r["_field"] == "model")
                |> filter(fn: (r) => r.page_url == "/home")
            `;
            
            const data = await fetchData(queryApi, fluxQuery);
            const formattedData =  formatGetDataByType(data);
            res.status(200).json(formattedData);
        } catch (error) {
            next(error); 
        }
    });
};

exports.getHitRangeNumber = (app) => {
    app.get('/api/hit/range', async (req, res, next) => {

        try {
            const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG);
            const fluxQuery = `
            from(bucket: "hitBucket")
                |> range(start: -100d, stop: -1m)
                |> filter(fn: (r) => r._measurement == "hit_click" and r._field == "model")
                |> filter(fn: (r) => r.page_url == "/home")
                |> map(fn: (r) => ({ r with modelData: string(v: r._value) }))
                |> aggregateWindow(every: 15m, fn: count, createEmpty: false)
                |> yield(name: "count")
            `;
            
            const data = await fetchData(queryApi, fluxQuery);
            // const formattedData =  formatGetDataByType(data);
            res.status(200).json(data);
        } catch (error) {
            next(error); 
        }
    });
};

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
            const formattedData = formatGetAllData(data);
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

function formatGetAllData(data) {
    return data.map(hit => ({
        start: hit.start,
        stop: hit.stop,
        time: hit.time,
        field: hit.field,
        measurement: hit.measurement,
        value: hit.value,
    }));
}


 function formatGetDataByType (data) {
    return data.reduce((acc, hit) => {
        const mappedItem = {
            start: hit.start,
            stop: hit.stop,
            time: hit.time,
            field: hit.field,
            measurement: hit.measurement,
            value: hit.value,
        };

        if (hit.value.value === HitType.CLICK) {
            acc.click.push(mappedItem);
        } else if (hit.value.value === HitType.MOVEMENT) {
            acc.movement.push(mappedItem);
        }

        return acc;
    }, { click: [], movement: [] });
}




