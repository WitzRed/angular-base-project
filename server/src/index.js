// Node server
const http = require('http');
const url = require('url');
const fspromises = require('fs/promises');
const fs = require('fs');
const multiparty = require('multiparty');


const PORT = process.env.PORT || 5000;


async function createEntry(path,data) {
    let result;
    try{
        const saved = fspromises.writeFile(path + `contact_${data.id}.json`, JSON.stringify(data) );
        await saved;
        result = Object.assign({},{saved:true, error:null});
    }catch(err){
        result = Object.assign({},{saved:false, error:err});
    }

    return new Promise((resolve,reject)=>{
        if(result.saved){
            resolve(result.saved)
        }else{
            reject(result.error)
        }
        
    })
}


async function readEntry(path,id) {
    let result;
    let data;
    try{
        const fread = await fspromises.readFile(path + `contact_${id}.json`,'utf8');
        result = Object.assign({},{fread:true, error:null});
        data = fread;
    }catch(err){
        result = Object.assign({},{fread:false, error:err});
    }

    return new Promise((resolve,reject)=>{
        if(result.fread){
            resolve(data)
        }else{
            reject(result.error)
        }
        
    })
}

async function createFile(path,data) {

    let result= new Object({});

    try{
        fs.readFile(data.path,(err,data)=>{
            fs.writeFile(path, data, (err)=>{
                if(err) {
                    console.log('Failed attempting to write file: ' + err);
                }
            });
            if(err) {
                console.log('Failed attempting to read file: ' + err);
            }      
            console.log('saved @: ' + path);

        }); 
        result = Object.assign({},{saved:true, path: path , error:null});

    }catch(err){
        result = Object.assign({},{saved:false, path: null , error:err});
    }
   
    return new Promise((resolve,reject)=>{
        if(result.saved){
            resolve(result)
        }else{
            reject(result.error)
        }
        
    });

}


async function getFile(path,fname) {
    let result;
    let data;
    try{
        const fread = await fspromises.readFile(path + fname);
        result = Object.assign({},{fread:true, error:null});
        data = fread;
    }catch(err){
        result = Object.assign({},{fread:false, error:err});
    }

    return new Promise((resolve,reject)=>{
        if(result.fread){
            resolve(data)
        }else{
            reject(result.error)
        }
        
    })
}

const server = http.createServer(async (req, res) => {
    //response headers

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': true
        /** add other headers as per requirement */
    };
    if (req.url.includes("/api")) {

        if (req.method === 'OPTIONS') {
            res.writeHead(204, headers);
            res.end();
            return;
        }
    
        if (['GET'].indexOf(req.method) > -1) {
            let path = './uploads/';
            const queryObject = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
            console.log(queryObject.id);
            res.writeHead(200, headers);
            const readresult = await readEntry(path,queryObject.id);
            try {
                console.log(readresult);
                res.write(JSON.stringify({ read: true, content: JSON.parse(readresult) }));
            } catch (err) {
                res.write(JSON.stringify({ read: false, content: `Failed: ${err}` }));
            }
            res.end();
            return;
        }

        if (['POST'].indexOf(req.method) > -1) {
            res.writeHead(200, headers);
            
            let path = './uploads/';
            const queryObject = req.body;
            const saveresult = await createEntry(path +`contact_${queryObject.id}.json`,queryObject);
            try {
                console.log(saveresult);
                res.write(JSON.stringify({ content: saveresult }));
            } catch (err) {
                res.write(JSON.stringify({ content: `Failed: ${err}` }));
            }
            res.end();
            return;
        }

        res.writeHead(405, headers);
        res.end(`${req.method} is not allowed for the request.`);
        return;
    }

    if (req.url.includes("/uploads")) {

        if (req.method === 'OPTIONS') {
            res.writeHead(204, headers);
            res.end();
            return;
        }
    
        if (['GET'].indexOf(req.method) > -1) {
            let path = './uploads/';
            const queryObject = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
            console.log(queryObject.id);
            res.writeHead(200, headers);
            const readresult = await readFile(path,queryObject.id);
            try {
                console.log(readresult);
                res.write(JSON.stringify({ read: true, content: JSON.parse(readresult) }));
            } catch (err) {
                res.write(JSON.stringify({ read: false, content: `Failed: ${err}` }));
            }
            res.end();
            return;
        }

        if (['POST'].indexOf(req.method) > -1) {
            res.writeHead(200, headers);

            let form = new multiparty.Form();
            let path = './uploads/';
            try{
                form.parse(req, async (err, fields, files) => {
                    let fileArray = files.file;
                    for (let i = 0; i < fileArray.length; i++) {
                            let filePath = `${path}` + fileArray[i].originalFilename;
                            await createFile(filePath, fileArray[i]);
                    }
                    if (err) {
                        console.log(err);
                    }
                }); 
                
                res.write(JSON.stringify({ content:'success'}));

            }catch(error){
                res.write(JSON.stringify({ content: error}));
            }

            res.end();
            return;
        }
    }

    if (req.url.includes("/downloadExcel")) {

        if (req.method === 'OPTIONS') {
            res.writeHead(204, headers);
            res.end();
            return;
        }
    
        if (['GET'].indexOf(req.method) > -1) {
            let path = './uploads/';
            const queryObject = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
            console.log(queryObject.name);

            let locheaders = Object.assign({}, headers);
            locheaders['Content-Type'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            // locheaders['Content-Length'] = '15mb';
            locheaders['Content-Disposition']= "attachment; filename=" + queryObject.name
            res.writeHead(200, locheaders);

            const readresult = await getFile(path,queryObject.name);
            try {
                res.write(readresult);
            } catch (err) {
                res.write(JSON.stringify({ read: false, content: `Failed: ${err}` }));
            }
            res.end();
            return;
        }

    }

    if (req.url.includes("/downloadPDF")) {

        if (req.method === 'OPTIONS') {
            headers['Content-Type'] = 'application/pdf';
            res.writeHead(204, headers);
            res.end();
            return;
        }
    
        if (['GET'].indexOf(req.method) > -1) {
            let path = './uploads/';
            const queryObject = JSON.parse(JSON.stringify(url.parse(req.url, true).query));
            console.log(queryObject.name);

            let locheaders = Object.assign({}, headers);
            locheaders['Content-Type'] = 'application/excel';
            locheaders['Content-Disposition']= "attachment; filename=" + queryObject.name
            res.writeHead(200, locheaders);

            res.writeHead(200, headers);
            const readresult = await getFile(path,queryObject.name);
            try {
                console.log(readresult);
                res.write(readresult);
            } catch (err) {
                res.write(JSON.stringify({ read: false, content: `Failed: ${err}` }));
            }
            res.end();
            return;
        }

    }
    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json", headers });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

