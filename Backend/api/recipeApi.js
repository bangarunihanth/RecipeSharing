const exp=require('express')
const recipeApp=exp.Router()

let usersCollection
let recipeCollection

recipeApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    recipeCollection=req.app.get('recipeCollection')
    next()
})

recipeApp.use(exp.json())

recipeApp.post('/new-recipe',async (req,res)=>{
    let recipeObj=req.body
    let resObj=await recipeCollection.findOne({id:recipeObj.id})
    if(resObj==null){
        resObj=await recipeCollection.insertOne(recipeObj)
        await usersCollection.updateOne({username:recipeObj.username},{$addToSet:{recipesAdded:recipeObj.id}})
        res.send({
            message:'Recipe posted'
        })
    }
    else{
        res.send({
            message:'Recipe already exists'
        })
    }
})

recipeApp.get('/recipe',async(req,res)=>{
    let resObj=await recipeCollection.find({}).toArray()
    if(resObj==null){
        res.send({
            message:'No recipes found'
        })
    }
    else{
        res.send({
            message:'Recipe array',
            payload:resObj
        })
    }
})

recipeApp.get('/recipe/cuisine/:cuisine',async(req,res)=>{
    let cuisine=req.params.cuisine
    let resObj=await recipeCollection.find({cuisine:cuisine}).toArray()
    if(resObj==null){
        res.send({
            message:'No recipes found'
        })
    }
    else{
        res.send({
            message:'Recipe array',
            payload:resObj
        })
    }
})

recipeApp.get('/recipe/id/:id',async(req,res)=>{
    let id=req.params.id
    let resObj=await recipeCollection.findOne({id:id})
    if(resObj==null){
        res.send({
            message:'No recipes found'
        })
    }
    else{
        res.send({
            message:'Recipe array',
            payload:resObj
        })
    }
})

recipeApp.post('/saved-recipes',async(req,res)=>{
    let id=req.body.id
    let resObj=await recipeCollection.find({id:{$in:id}}).toArray()
    if(resObj==null){
        res.send({
            message:'No recipes found'
        })
    }
    else{
        res.send({
            message:'Recipe array',
            payload:resObj
        })
    }
})

module.exports=recipeApp