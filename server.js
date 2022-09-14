const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/models')
const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//sequelize init
db.sequelize.sync({force: true})
    .then(()=> {
        console.log('Synced DB')
    })
    .catch((e)=> {
        console.error('Failed sync db :', +e.message)
    })

app.get('/', (req, res)=> {
    res.json({message: 'Welcome to theo app todo'})
})
require('./app/routes/tutorial.routes')(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))