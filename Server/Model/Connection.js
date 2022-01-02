import knex from "knex";
import {randomBytes} from "node:crypto";

export function GenerateID()
{
    return randomBytes(16);
};

let building = knex({
    dialect:"mysql",
    connection:{
        user: "saqut",
        password: "123456Kc",
        host: "127.0.0.1",
        charset: "utf8",
        database: "saqutchat",
        port: 3306
    }
})

building.on('query',({sql}) => {
    console.log("Knex:",sql)
})

export default building;