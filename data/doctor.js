const uuidv4 = require('uuid/v4');

//TODO db module
//In Memory
const doctors = new Map()

class Doctor {
    constructor(firstname, lastname) {
      this.id=uuidv4()
      this.firstname= firstname
      this.lastname= lastname
      this.appointments= new Map()
      this.availablity= new Map()
    }

    addAppointment(appointment) {
        if(appointment){
                let timeString= this.parseTimestamp(appointment.timestamp)
                //avaiablity check and update
                console.log(timeString)
                if(this.availablity.get(timeString)){
                    if(this.availablity.get(timeString)>=3){
                        throw "This time has 3 appointments already"
                    } else {
                        this.availablity.set(timeString, this.availablity.get(timeString)+1)
                        console.log("set:"+this.availablity.get(timeString))
                    }
                } else {
                    this.availablity.set(timeString, 1)
                    console.log("set 1")
                }
                
                let apot= new Appointment(this.id, appointment.firstname, appointment.lastname, timeString,appointment.kind)
                console.log("new apt:"+apot)
                this.appointments.set(apot.id,apot)
        } else {
            throw "Incorrect Format"
        }
    }

    deleteAppointment(appointmentId){
        if(this.appointments.has(appointmentId)){
            this.appointments.delete(appointmentId)
        } else {
            throw "appointment not found"
        }
    }

    getAppointments(){
        let appointmentArray= [...this.appointments]

        let result=JSON.stringify(appointmentArray)
        console.log("getAppointments"+result)
        return result
    }

    parseTimestamp(timestamp){
        var datetime = new Date();
        datetime.setTime(timestamp);
        var minute = datetime.getMinutes();
        console.log(datetime.toString())
        if(Number(minute)%15!=0){
            throw "minute should be 00,15,30,45"
        }
        //format string, ignore seconds and millis
        datetime.setSeconds(0)
        datetime.setMilliseconds(0)
        return datetime.toString()
    }
    getId(){
        return this.id
    }
}

class Appointment {
    constructor(doctorId, firstname, lastname, time, kind) {
        this.id=uuidv4()
        this.doctorId= doctorId
        this.firstname=firstname
        this.lastname=lastname
        this.time=time
        this.kind= kind
    }
}

function createDoctorInternal(firstname, lastname){
    var doctor = new Doctor(firstname, lastname)
    doctors.set(doctor.getId(), doctor) //db simulate
    return doctor.getId()
}

function createAppointment(doctorId,appointment){
    if(!doctors.has(doctorId)){
        throw "doctor not found"
    }

    let doctor= doctors.get(doctorId)
    doctor.addAppointment(appointment)
}

function deleteAppointment(appointmentId){
    if(!appointmentId) throw "No id provided.";
    const theDoctors = getAllDoctors();

    for(let i=0;i<theDoctors.length;i++){
        const theAppoinments = getAppoinmentsByDoctorId(theDoctors[i].id);
        if (!theAppoinments) throw "No appoinments found.";
        for(let j=0;j<theAppoinments.length;j++){
            if(theAppoinments[j].id==appointmentId){              
                doctor.values().delete(appointmentId);          
            }                        
        }         
    }
    //return "{delete appointment:true}";
}

// Returns a list of all appointments for the specified doctor
function getAppoinmentsByDoctorId(doctorId) {
    let theDoctor= doctors.get(doctorId)
    let theAppoinments=theDoctor.getAppointments();   
    return theAppoinments;
}

function getAppointments(doctorId){
    if(!doctors.has(doctorId)){
        throw "doctor not found"
    }

    let doctor= doctors.get(doctorId)
    return doctor.getAppointments()
}


function createDoctor(doctor){
    //Add doctors
    try {
        return createDoctorInternal(doctor.firstname,doctor.lastname)
    }
    catch(e){
        throw "create Doctor failed"
    }
    
}

function getAllDoctors() {
    return JSON.stringify([...doctors]) 
}


module.exports={createDoctor,getAllDoctors,createAppointment,deleteAppointment,getAppointments};