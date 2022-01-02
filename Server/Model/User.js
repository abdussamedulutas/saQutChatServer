import db, { GenerateID } from "./Connection.js";
import {createHash} from "node:crypto";
export const User = () => db.table("users");

export const sha256 = (text) => {
    return createHash("sha256").update(text).digest('hex');
};

if(process.argv.includes("--migrate"))
{
    migrate();
}
if(process.argv.includes("--force-migrate"))
{
    dropMigrate().then(migrate)
}

export async function migrate()
{
    if(!await db.schema.hasTable("users"))
    {
        await db.schema.createTable("users", function(table){
            table.binary("id",16).primary();
            table.string("firstname",255).nullable();
            table.string("lastname",255).nullable();
            table.string("email",255).nullable();
            table.string("phone",20).nullable();
            table.date("dateofbirth").nullable();
            table.string("password").nullable();
            table.enum("gender",["erkek","kadın","other"]).nullable();
            table.integer("wrongpasswcount").nullable().defaultTo(0);
            table.dateTime("lastlogin").nullable();
            table.dateTime("modifydate").nullable();
            table.dateTime("createdate").nullable();
            table.dateTime("deletedate").nullable();
        });
        process.stdout.write(`\u001b[38;5;10mDB::Migrate User Schema Created\n`);
    }else{
        process.stdout.write(`\u001b[38;5;10mDB::Migrate User Schema Already Exists\n`);
    }
}

export async function dropMigrate()
{    
    if(await db.schema.hasTable("users"))
    {
        await db.schema.dropTable("users")
        process.stdout.write(`\u001b[38;5;9mDB::Migrate User Schema Dropped\n`);
    }
}

export async function Register({
    firstname,
    lastname,
    email,
    phone,
    dateofbirth,
    gender,
    password
})
{
    let id = GenerateID();
    return await User().insert({
        id,
        firstname,
        lastname,
        email,
        phone,
        dateofbirth,
        gender,
        password: sha256(password),
        wrongpasswcount: 0,
        lastlogin: null,
        modifydate: null,
        createdate: db.fn.now(),
        deletedate: null
    });
};

export async function Login({
    email,
    password
})
{
    let user = await User().select("*").where({
        email,
        password: sha256(password)
    }).first();
    if(user)
    {
        await User().update({
            lastlogin: db.fn.now()
        }).where({
           id:user.id
        }).limit(1);
    }
    return user;
};