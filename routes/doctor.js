const router=require("express").Router();
const data=require("../data/doctor");

router.get('/', function(req, res) {
    res.status(200).send(data.getAllDoctors());
});

router.post('/', function(req, res) {
    try{
        let body= req.body
        res.status(200).send({id: data.createDoctor(body)});
    }catch(e){
        console.log(e)
        res.status(400).json({error: e});
    }
});

router.get('/appointment/:id', function(req, res) {
    try{
        let response= data.getAppointments(req.params.id)
        console.log("response:"+response)
        res.status(200).send(response);
    }catch(e){
        console.log(e)
        res.status(400).json({error: e});
    }
});

router.delete('/appointment/:id', function(req, res) {
    try{
        data.deleteAppointment(req.params.id)
        res.status(200).send(`delete ${req.params.id} success`);
    }catch(e){
        console.log(e)
        res.status(400).json({error: e});
    }
});

router.post('/appointment/:id', function(req, res) {
    try{
        let body= req.body
        data.createAppointment(req.params.id, body)
        res.status(200).send(`createAppointment success`);
    }catch(e){
        console.log(e)
        res.status(400).json({error: e});
    }
});

module.exports=router;
