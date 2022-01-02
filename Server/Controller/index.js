import {Login, Register, User} from "../Model/User.js";
import {resolve} from "node:path";
import moment from "moment";

function withSecureAPI(req,res,next)
{
    if(req.headers["x-powered"] == "axios")
    {
        next();
    }else{
        res.status(403).send({
            status:"Request Rejected",
            message:"API Not Authenticated",
            log:"Forbidden API Calling From Request",
            code: 403
        });
    }
}

/***
 * @param {import("express").Application} app
 */
export function route(app){


    app.get(/.*/, (_,res) => {
        let path = resolve("Build/index.html");
        res.sendFile(path)
    });

    app.post("/api/v2/auth/register", withSecureAPI, async (req,res) => {
        let {
            name,
            surname,
            email,
            phone,
            gender,
            dateofbirth,
            password
        } = req.body;

        await Register({
            firstname:name,
            lastname:surname,
            email,
            phone,
            gender,
            dateofbirth: moment(dateofbirth).format("YYYY-MM-DD"),
            password
        });
        res.send({
            status:"success",
            message:"Kayıt Başarılı, Giriş Yapabilirsiniz !",
            code: 200
        })
    })

    app.post("/api/v2/auth/login", withSecureAPI, async (req,res) => {
        let {
            email,
            password
        } = req.body;

        let login = await Login({
            email,
            password
        });
        if(login == null)
        {
            res.send({
                status:"failed",
                message:"Bu bilgiler ile kullanıcı bulunamadı !",
                code: 404
            })
        }else{
            res.send({
                status:"success",
                message:"Giriş Başarılı !",
                user: {
                    id: login.id.toString("hex"),
                    firstname: login.firstname,
                    lastname: login.lastname,
                    email: login.email,
                    phone: login.phone,
                    gender: login.gender
                }
            })
        }
    })


};