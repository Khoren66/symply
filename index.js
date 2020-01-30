const fs = require('fs')
const moment = require('moment')

////example 1
const rs = fs.createReadStream(__dirname + "/time3.txt", 'utf-8')
const ws = fs.createWriteStream(__dirname + "/time3.txt", 'utf-8')

setInterval(() => {
    ws.write(moment(Date.now()).format("DD/MM/YYYY HH:mm:ss") + '\n')
}, 1000)
    rs.on('data', function (chunk) {
    rs.pipe(ws)
    })
///

///example 2
setInterval(()=>{
function copyData(write, read) {
    fs.readFile(read, 'utf8', function (err, data) {
            if (err) throw err;
            fs.writeFile (write, moment(Date.now()).format("DD/MM/YYYY HH:mm:ss"), function(err) {
                if (err) throw err;
            });
        });
}
copyData(__dirname+"/time.txt",__dirname+"/time.txt")
},1000)
///








