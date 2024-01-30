if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
console.log(process.env.SECRET);

const mongoose = require("mongoose");
const initData = require("./data2.js");
const Listing = require("./models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    })

async function main(){
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    // await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "65b69d09b14bb3dba1269655",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
