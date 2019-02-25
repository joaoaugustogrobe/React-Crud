require('dotenv-safe').load()
const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const cors = require('cors')


var app = express()

app.use(bodyparser.json())
app.use(cors())
//iniciando DB
const mysqlConnection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    multipleStatements: true
  });
  mysqlConnection.connect(err =>{
  if(!err){
    console.log('DB Connection succeded')
  }else{
    console.log('DB Connection failed\nError:' + JSON.stringify(err, undefined, 2))
  }
})

app.get("/"), (req,res)=>{
  res.send("Connected!");
}
//list of all persons
app.get("/persons", (req,res)=>{
  console.log('alguem logou!')
     mysqlConnection.query('SELECT * FROM User;', (err, rows, fields)=>{
       if(!err)
         res.send(rows)
       else
         console.log(err)
     })
})

//person of this id
app.get("/persons/:id", (req,res)=>{
  console.log('alguem logou!')
     mysqlConnection.query('SELECT * FROM User WHERE ID_User = ?;',[req.params.id], (err, rows, fields)=>{
       if(!err)
         res.send(rows)
       else
         console.log(err)
     })
})

//delete an person
app.delete("/persons/:id", (req,res)=>{
  console.log('ID removido!')
     mysqlConnection.query('DELETE FROM User WHERE ID_User = ?;',[req.params.id], (err, rows, fields)=>{

       if(!err)
         res.send(`${rows.affectedRows} row(s) has been deleted.`)
       else
         console.log(err)
     })
})


//post an person
app.post("/persons", (req,res)=>{
console.log(req.body)
  let rBody = req.body;
  if(rBody.Name === '' || rBody.Description === ''){
  		res.status = 510
  		res.statusText = "Name and Description cannot be NULL"
  		return;
  }
  let sql = "SET @ID_User = ?;SET @Name = ?;SET @Description = ?;\
    CALL PersonAddOrEdit(@ID_User,@Name,@Description);";
     mysqlConnection.query(sql,[0, rBody.Name, rBody.Description], (err, rows, fields)=>{
       if(!err)
         rows.forEach(element=>{
           if(element.constructor == Array)
           	res.send({
           		ID_User: element[0].ID_User,
           		Name: rBody.Name,
           		Description: rBody.Description
           	})
            //res.send(`Inserted User at id: ${element[0].ID_User}`)
         })
       else
         console.log(err)
     })
})

//update an person
app.put("/persons", (req,res)=>{
  console.log("put")
  let rBody = req.body;
  if(rBody.Name === '' || rBody.Description === ''){
  		res.status = 510
  		res.statusText = "Name and Description cannot be NULL"
  		return;
  }
  let sql = "SET @ID_User = ?;SET @Name = ?;SET @Description = ?;\
    CALL PersonAddOrEdit(@ID_User,@Name,@Description);";
     mysqlConnection.query(sql,[rBody.ID_User, rBody.Name, rBody.Description], (err, rows, fields)=>{
       if(!err)
         rows.forEach(element=>{
           if(element.constructor == Array)
            res.send({
           		ID_User: element[0].ID_User,
           		Name: rBody.Name,
           		Description: rBody.Description
           	})
         })
       else
         console.log(err)
     })
})


app.listen(3001, () => {console.log('server on!')})
