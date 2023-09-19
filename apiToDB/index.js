import fetch from "node-fetch";

import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/CryptoData");

const schema = new mongoose.Schema({
    name:{ 
        type : String,
        required : true
    },
    last:{
        type : Number,
        required : true
    },
    buy:{
        type : Number,
        required : true
    },
    sell:{
        type : Number,
        required : true
    },
    volume:{
        type : Number,
        required : true
    },
    base_unit:{
        type : String,
        required : true
    }
});
 
const Get = mongoose.model("Get", schema);

async function getData()
{
    const data = await fetch("https://api.wazirx.com/api/v2/tickers");

    const response = await data.json();

    const arr = Object.keys(response);

    arr.sort((a, b) => response[b].last - response[a].last);

    const topData = arr.slice(0, 10);

    console.log(topData);

    for (const pair of topData) 
    {
        const ticker = response[pair];
        const get = new Get(
            {
                name: pair,
                last: parseFloat(ticker.last),
                buy: parseFloat(ticker.buy),
                sell: parseFloat(ticker.sell),
                volume: parseFloat(ticker.volume),
                base_unit: ticker.base_unit
            });
  
        await get.save();
      }
}

getData();