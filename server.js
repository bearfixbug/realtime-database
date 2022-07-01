import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import express  from 'express'
import bodyParser  from "body-parser";

var app2 = express()
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({extended: true}))
var server = app2.listen(3001, console.log('server is running on port 3001'))

const firebaseConfig = {
    databaseURL: "https://nosql2-8ca50-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

//create
app2.post('/api/create', (req,res) => {
    var fullname = req.body.fullname;

    try {
        console.log('>>>> fullname', fullname)
        console.log('path', 'users/' + fullname)
        set(ref(db, 'users/' + fullname), {
            name: fullname,
            balance: 100,
            mil: new Date().getTime(),
            date: new Date() + ''
        })
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'good'
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})


//get
app2.get('/api/get', (req, res) => {
    try {
        get(ref(db, 'users'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if( snapshot.exists() ) {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            }
            else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch((err2) => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//get by user
app2.post('/api/getbyuser', (req, res) => {
    var fullname = req.body.fullname

    try {
        get(ref(db, 'users/' + fullname))
        .then((snapshot) => {
            console.log(snapshot.val())
            if( snapshot.exists() ) {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            }
            else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch((err2) => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//update
app2.put('/api/update', (req, res) => {
    var fullname = req.body.fullname
    var balance = req.body.balance

    try {
        var updates = {};
        updates[`users/${fullname}/balance`] = balance;
        updates[`users/${fullname}/date`] = new Date() + '';
        updates[`users/${fullname}/mil`] = new Date().getTime();

        update(ref(db), updates)
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good'
            })
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'bad ' + err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//delete
app2.delete('/api/delete', (req, res) => {
    var fullname = req.body.fullname

    try {
        remove(ref(db, "users/"+fullname))
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good'
            })
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'bad ' + err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})