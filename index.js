require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require('./db');

app.use(require('./middleware/headers'));

const controllers = require('./controllers');

app.use(Express.json());

app.use('/createlogin', controllers.createLogin);
app.use('/login', controllers.userLogin);
//app.use('/public', controllers.publicView);

//app.use('/add', controllers.addPlant);
//app.use('/change', controllers.changePlant);
//app.use('/my', controllers.privateView);
//app.use('/remove', controllers.removePlant);

dbConnection.authenticate()
    .then(()=> dbConnection.sync())
    .then(()=>{
        app.listen(process.env.PORT, ()=> {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });        
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });