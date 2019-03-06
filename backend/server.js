require('dotenv-safe').load()
const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const md5 = require('md5')


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


/*
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'joaoaugustogrobe@hotmail.com',
  from: 'sempreverde@support.com',
  subject: 'Password recovery',
  text: 'Reset your pass here',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
*/



app.get("/", (req,res)=>{
  console.log('GET!')
  res.json({
    message:"Logged in"
  })
})



app.post("/register", (req,res)=>{
  console.log("Registrando " + req.body.username )
  const user = {...req.body} //requires username, password and email
  user.password = md5(user.password) //encrypt user pass using MD5

  let rBody = req.body;
  let sql = "SET @ID_Login = ?;SET @username = ?;SET @password = ?;SET @email = ?;\
    CALL LoginAddOrEdit(@ID_Login,@username,@password, @email);"; //set SQL command to call stored procedure
     mysqlConnection.query(sql,[0, rBody.username,md5(rBody.password), rBody.email], (err, rows, fields)=>{
      //0 as id -> add new Login
       if(!err)
         rows.forEach(element=>{ //used to return the added login
            if(element.constructor == Array){
              let loggedUser = {
                ID_login: element[0].ID_login,
                username: rBody.username,
                email: rBody.email,
                level: 0
              }
              jwt.sign({loggedUser}, process.env.JWT_SECRET, (err, token) => {
              res.json({
                message: 'Successful Registred!',
                token: token,
                loggedUser
              })
            })
           	// res.send({
           	// 	ID_User: element[0].ID_login,
           	// 	Name: rBody.username,
           	// 	Description: rBody.email
           	// })
          }})
       else
         //console.log(err)
        if(err.code === 'ER_DUP_ENTRY'){
          console.log("Usuario já existe")
          res.status(409).json({
            message: "User already exists",
            token: null
          })
        }
        else{
            res.status(500).json({
              message: "cannot register",
              token: null
            })
        }
     })
})

app.post("/login", (req,res)=>{
  const user = {...req.body} //user.username and user.password stored into user. req.body must have it
  //select this user from DB
  mysqlConnection.query('SELECT * FROM Login WHERE username = ?;',[req.body.username], (err, rows, fields)=>{
    //if error or not found username, return token null
    if(err || rows.length === 0)
      res.status(401).json({
        message: 'Username or password invalid',
        token: null
      })
    else{ //user has been found
      //encript body password and compare with db password
      if(md5(user.password) === rows[0].password_hash){
        //generate a token
        const loggedUser = rows[0]
        delete loggedUser.password_hash //we dont want send password as payload
        delete loggedUser.CreatedAt //CreatedAt is irrelevant as payload
        jwt.sign({loggedUser}, process.env.JWT_SECRET, (err, token) => {
          res.json({
            message: 'Valid username and password. Connected!',
            token: token,
            loggedUser
          })
        })
      }else{//user has been found, but send a wrong pass
        res.status(401).json({
          message: 'Username or password invalid',
          token: null
        })
      }
    }
  })
})



app.post("/auth",verifyToken, (req,res)=>{//Verify if token is valid
  console.log(req.headers)
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if(err){
      res.status(401).json({message:err})
      return
    }
    console.log('Verify')
    res.status(200).json({
      message: 'Logged-in',
      authData
    })
  })
  // console.log('Verify')
  // res.json({
  //   message:"Logged in"
  // })
})

function verifyToken(req, res, next){
    //FORMAT OF TOKEN:
      //authorization: bearer <acess_token>

    //get auth header value
    const bearerHeader = req.headers['authorization']
    //check if not undefined
    if(typeof bearerHeader === 'undefined'){
        res.status(401).json({message:"Token not provided."})
        return
    }
    //split
    const [,bearer] = bearerHeader.split(' ');
    console.log(bearer)
    req.token=bearer

    jwt.verify(bearer, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'})
      }else{
        req.decoded = decoded
      }
    })
    next()
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


app.listen(3001, () => {console.log('Server started on port 3001')})
