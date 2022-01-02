import https from "https";
import http2 from "http2";
import http from "http";
import fs from "fs";
import websocket from "websocket";


import os from "os";
import path from "path";

let verbose = process.argv.includes("--verbose") || process.argv.includes("-v");
export default function(expressApp){
    publishCPU();
    let http11Server = http.createServer();
    http11Server.listen(2000,e => {
        publishVIP(2000, ["HTTP/1.1","http://"])
    });
    http11Server.on('request',(req,res) => {
        if(verbose) console.log(`\u001b[32mHTTP/1.1\u001b[0m ${req.url}`)
        expressApp(req,res)
    }); 

    
    let https11Server = https.createServer({
        pfx: fs.readFileSync("ssl/certificate.p12"),
        passphrase: "123456"
    });
    https11Server.listen(2010,e => {
        publishVIP(2010, ["HTTPS/1.1","https://"])
        publishVIP(2010, ["WSS","wss://"])
    });
    https11Server.on('request',(req,res) => {
        if(verbose) console.log(`\u001b[32mHTTPS/1.1\u001b[0m ${req.url}`)
        expressApp(req,res)
    });
    let u = new websocket.server({  
        httpServer: https11Server,
        autoAcceptConnections: true
    });
    u.on('connect', (socket) => {
        console.log(`\u001b[36mSECURED WebSocket\u001b[0m STATUS\u001b[0m=\u001b[32mCLIENT CONNECTED`);
        socket.on('message', function({type,binaryData,utf8Data}){
        })
        socket.on('close', function(){
            console.log(`\u001b[36mSECURED WebSocket\u001b[0m STATUS\u001b[0m=\u001b[32mCLIENT DISCONNECTED`);
        })
    })

    let https2Server = http2.createSecureServer({
        pfx: fs.readFileSync("ssl/certificate.p12"),
        passphrase: "123456"
    });
    https2Server.listen(2020,e => {
        publishVIP(2020, ["HTTP/2.0","https://"])
    });
    https2Server.on("stream",(stream, headers) => {

        let Path = path.resolve("./build/")

        if(headers[":path"] == '/')
        {
            !stream.destroyed && !stream.closed && stream.respondWithFile(`${Path}/index.html`,{
                ':status': 200
            },{
                onError:e => e
            });
        }else{
            let _path = path.resolve(`${Path}/${headers[":path"]}`);
            fs.stat(_path,function(e){
                if(e)
                {
                    if(verbose) console.log(`\u001b[32mHTTP/2.0\u001b[0m ${headers[":path"]} 404 not found`)
                    stream.respond({ ':status': 404 });
                    stream.end('Dosya yok');
                    return;
                }
                if(verbose) console.log(`\u001b[32mHTTP/2.0\u001b[0m ${headers[":path"]} File Sended`);
                fs.createReadStream(_path).pipe(stream,{end:true});
            })
        }
    });
};


function publishVIP(port, protocol)
{
    if(!verbose)
    {
        return;
    }
    let interfaces = os.networkInterfaces();
    for(let interfaceName in interfaces)
    {
        let t = interfaces[interfaceName];
        for(let i = 0; i < t.length; i++)
        {
            let {mac, netmask, address,internal, family} = t[i];
            console.log(
                `\u001b[36m ${protocol[0]} BEGIN \u001b[0m${family}\u001b[36m DEVICE \u001b[0m${interfaceName}`+
                `\u001b[0m TO=\u001b[32m${protocol[1]}${family == "IPv4" ? address : '['+address+']'}:${port}`+
                `\u001b[0m MASKING=\u001b[32m${netmask}`+
                `\u001b[0m TYPE=\u001b[32m(${internal ? "\u001b[31minner-network\u001b[0":"\u001b[33moutdoor-ip\u001b[0"}\u001b[32m) `+
                `\u001b[0m MAC=\u001b[32m${mac}`
            );
        }
    }
}

function publishCPU()
{
    let arch = os.arch();
    let cpus = os.cpus();
    let hostname = os.hostname();
    let platform = os.platform();
    let release = os.release();
    let totalmem = (os.totalmem() / 1e6)|0;
    process.stdout.write(`\n\n\u001b[38;5;240m ${arch} ${cpus.length} core ${platform} based ${release} OS ${totalmem}MB memory ${hostname}\n\n`);

    if(verbose)
    {
        let e = false;
        for(let name in process.versions)
        {
            process.stdout.write((`\u001b[38;5;245m ${name} : ${process.versions[name]}`+' '.repeat(40)).slice(0,40));
            if(e)process.stdout.write('\n');
            e = !e;
        }
        process.stdout.write('\n');
    }
    process.stdout.write('\n');
}