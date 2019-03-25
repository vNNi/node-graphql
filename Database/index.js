const mongoose = require('mongoose');
const password = 'wpTQz2knEBCVaUE';
const db_name = 'node-graphql';
function connection(){
    return new Promise((resolve,reject)=>{
        mongoose.connect(`mongodb+srv://vNNi:${password}@cluster0-12crc.mongodb.net/${db_name}?retryWrites=true`,{
            useNewUrlParser: true, useCreateIndex: true})
        .then((res,err)=>{
            if(err) return reject(err);
            resolve();
        }).catch((err)=>{
            console.log(err);
        })
    });
}
function close(){
    return mongoose.disconnect();
}

module.exports = {connection, close}