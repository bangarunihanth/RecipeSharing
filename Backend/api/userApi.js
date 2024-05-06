const exp = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userApp = exp.Router()

module.exports = userApp

let usersCollection
let recipeCollection

userApp.use((req, res, next) => {
    usersCollection = req.app.get("usersCollection");
    recipeCollection = req.app.get("recipeCollection")
    next();
});

userApp.use(exp.json())

//user registration route
userApp.post("/new-user", async (req, res) => {
    const newUser = req.body;
    const dbuser = await usersCollection.findOne({ username: newUser.username });
    if (dbuser !== null) {
        res.send({ message: "Username already exists" });
    } else {
        const hashedPassword = await bcryptjs.hash(newUser.password, 6);
        console.log(hashedPassword)
        newUser.password = hashedPassword;
        await usersCollection.insertOne(newUser);
        res.send({ message: "User created" });
    }
});

//user login
userApp.post("/login", async (req, res) => {
    //get cred obj from client
    const userCred = req.body;
    //check for username
    const dbuser = await usersCollection.findOne({
        username: userCred.username,
    });
    if (dbuser === null) {
        res.send({ message: "Invalid username" });
    } else {
        //check for password
        const status = await bcryptjs.compare(userCred.password, dbuser.password);
        if (status === false) {
            res.send({ message: "Invalid password" });
        } else {
            //create jwt token and encode it
            const signedToken = jwt.sign(
                { username: dbuser.username },
                process.env.SECRET_KEY,
                { expiresIn: '1d' }
            );
            //send res
            res.send({
                message: "login success",
                token: signedToken,
                user: dbuser,
            });
        }
    }
});


//post comments for an arcicle by atricle id
userApp.post("/comment", async (req, res) => {
    let commentObj=req.body
    let resObj=await recipeCollection.findOne({id:commentObj.id})
    if(resObj==null){
        res.send({
            message:"Recepe does'nt exist"
        })
    }
    else{
        resObj=await usersCollection.findOne({username:commentObj.username})
        if(resObj==null){
            res.send({
                message:"Username does'nt exist"
            })
        }
        else{
            resObj=await recipeCollection.updateOne({id:commentObj.id},{$addToSet:{comments:commentObj}})
            if(resObj==null){
                res.send({
                    message:"Some error occured"
                })
            }
            else{
                res.send({
                    message:"Comment posted successfully"
                })
            }
        }
    }
});


//post rating for an arcicle by atricle id
userApp.post("/rating", async (req, res) => {
    let ratingObj=req.body
    let recipeObj=await recipeCollection.findOne({id:ratingObj.id})
    if(recipeObj==null){
        res.send({
            message:"Recepe does'nt exist"
        })
    }
    else{
        userObj=await usersCollection.findOne({username:ratingObj.username})
        if(userObj==null){
            res.send({
                message:"Username does'nt exist"
            })
        }
        else{
            let cuisine=userObj.cuisine.filter((c)=>{
                if(c.name==recipeObj.cuisine){
                    return c
                }
            })
            if(cuisine.length==0){
                userObj.cuisine=[...userObj.cuisine,{
                    name:recipeObj.cuisine,
                    avgOfRating:ratingObj.rating,
                    countOfRating:1,
                    countOfOpened:0
                }]
            }
            else{
                let index=userObj.cuisine.findIndex((obj)=>obj.name==recipeObj.cuisine)
                let cuisineObj=userObj.cuisine[index]
                cuisineObj.avgOfRating=(cuisineObj.avgOfRating*cuisineObj.countOfRating+ratingObj.rating)/(cuisineObj.countOfRating+1)
                cuisineObj.countOfRating+=1
                let resObj=await usersCollection.updateOne({username:ratingObj.username},{$set:{cuisine:cuisineObj}})
                if(resObj==null){
                    res.send({
                        message:"Error occurred"
                    })
                }
                else{
                    res.send({
                        message:"Update successful"
                    })
                }
            }
        }
    }
});

userApp.post("/save-recipe", async (req, res) => {
    let savingObj=req.body
    let recipeObj=await recipeCollection.findOne({id:savingObj.id})
    if(recipeObj==null){
        res.send({
            message:"Recepe does'nt exist"
        })
    }
    else{
        userObj=await usersCollection.findOne({username:savingObj.username})
        if(userObj==null){
            res.send({
                message:"Username does'nt exist"
            })
        }
        else{
            let index=userObj.recipesSaved.findIndex((obj)=>obj==savingObj.id)
            if(index==-1){
                userObj.recipesSaved.push(savingObj.id)
                let resObj=await usersCollection.updateOne({username:savingObj.username},{$set:{recipesSaved:userObj.recipesSaved}})
                if(resObj==null){
                    res.send({
                        message:"Error occurred"
                    })
                }
                else{
                    res.send({
                        message:"Saved successfully"
                    })
                }
            }
            else{
                res.send({
                    message:"Recipe already saved"
                })
            }
        }
    }
});

//export userApp
module.exports = userApp;