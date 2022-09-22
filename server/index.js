const express = require("express")
const mysql = require('mysql2')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

const port = 3000

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Feiyang999',
    database: 'mood_me'
})

app.listen(port, () => {
    console.log(`listenting on port ${port}`)
})

const created = new Date()
app.post('/api/create', (req, res) => {
    // console.log(req.body)
    const mood = req.body.mood
    const rating = req.body.rating
    result = db.query('INSERT INTO moods(mood, rating, created) VALUES(?,?,?);',
        [mood, rating, created])
        //result data dont have id of the new row
     console.log(result)
    // res.send('values inserted')
    res.send("values inserted")
})

// app.get("/api/getid", (req,res) =>{
//     db.query("SELECT id FROM moods ORDER BY id DESC LIMIT 1", (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             // this id is the id of the last row, but not working in the fornt end
//             res.send(result)
//             return result
//         }
//     })

// })

app.get("/api/moods", (req, res) => {
    db.query("SELECT * FROM moods", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })

})

app.post("/api/delete/:id", (req, res) => {
    // console.log(req.params)
    let id = +req.params.id
    db.query("DELETE FROM moods WHERE id = ?;", [id])
})

app.post("/api/edit/:id", (req, res) => {
    console.log(req.body)
    const id = req.params.id
    mood = req.body.mood
    rating = req.body.rating
    const newMood = req.body.newMood
    const newRating = req.body.newRating
    db.query("UPDATE moods SET mood =?, rating=?, created=? WHERE id = ?;",
        [newMood ? newMood : mood, newRating ? newRating : rating, created, id])
})
