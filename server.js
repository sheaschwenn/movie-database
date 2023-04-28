const express = require('express');
const mysql = require('mysql2')

const app = express();
const PORT = 3001
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'MySQL23real',
        database : 'movies_db'
    },
    console.log("Connected to the movies_db database")
)

app.post('/api/add-movie',(req,res)=>{
    db.query(`INSERT INTO movies(movie_name) VALUES (?)`, [req.body.movie_name], (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log("Movie has been added")
        db.query(`SELECT * FROM movies`,(err2,result2)=>{
            if(err2){
                console.log(err2);
            }
            res.json(result2)
        })
    })
   
})

app.get('/api/movies',(req,res)=>{
    db.query(`SELECT * FROM movies`, (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result)
        res.json(result)
    })
   
})

app.delete('/api/movie/:id',(req,res)=> {
    const movieId = req.params.id
    db.query(`DELETE FROM movies WHERE id=?`,[movieId],(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log("Movie has been deleted")
        db.query(`SELECT * FROM movies`,(err2,result2)=>{
            if(err2){
                console.log(err2);
            }
            res.json(result2)
        })
        
        
    })
});

app.get('/api/movie-reviews',(req,res)=>{
    db.query(`SELECT movies.movie_name, reviews.review FROM reviews INNER JOIN movies ON reviews.movie_id = movies.id`, (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result)
        res.json(result)
    })
})

app.put('/api/review/:id', (req,res)=>{
    db.query(`UPDATE reviews SET review = "new review" WHERE id =?`,[req.params.id],(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log("Review has been updated")
        db.query(`SELECT * FROM reviews`,(err2,result2)=>{
            if(err2){
                console.log(err2);
            }
            res.json(result2)
        })
    }) 
});


app.listen(PORT, ()=>{
    console.log(`connected to ${PORT}`)
});