const router=require("./doctor");

const constructorMethod=(app)=>{
    app.use("/doctor",router);

    app.use("*",(req,res)=>{
        res.sendStatus(404);
    })
}

module.exports=constructorMethod;
