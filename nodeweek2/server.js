//medium and hard are combine together
var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var data = require('./mediumHard/databs.json');
const { restart } = require('nodemon');
app.use(bodyParser.json())
app.get('/workers', (req, res) => {
    if (!data) {
        res.status(404).send('Could not find information')
    }

    res.send(data)
})
//use this http method to get the data of workers "localhost:3030/workers"
app.get('/workers', (req, res) => {

    const findEmployee = data.workers.find(function (employee) {
        return parseInt(req.params.id) === employee.id;
    })
    if (!findEmployee) {
        res.status(404).send('Could not find information')
    }

    res.send(findEmployee)

})

//Hard part of the challenge
//use this http method to create a new workers "localhost:3030/workers"
app.post('/workers', (req, res) => {
    const findEmployee = {
        id: data.workers.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    }
    if (!findEmployee) {
        res.status(404).send('Could not find information')
    }
    data.workers.push(findEmployee)
    res.send(findEmployee)
    return
})
//use this http method to update a new workers "localhost:3030/workers/7"
app.put('/workers/:id', (req, res) => {
    const findworkers = data.workers.findIndex((employee)=> {
        return parseInt(req.params.id)=== employee.id
    })
    if(findworkers < 0){
        res.status(404).send('Could not find information')
    }
    data.workers[findworkers].name = req.body.name;
    data.workers[findworkers].salary = req.body.salary;
    data.workers[findworkers].department = req.body.department;
    res.send(data.workers[findworkers]);
})
//use this http method to delete a new workers "localhost:3030/workers/4"
app.delete('/workers/:id', (req, res) => {
    const findworkers = data.workers.findIndex((employee)=> {
        return parseInt(req.params.id)=== employee.id
    })
    if(findworkers < 0){
        res.status(404).send('Could not find information')
    }
    const index = data.workers.indexOf(findworkers)
    data.workers.splice(index, 1)
   res.json(data.workers)
})

app.listen(3030)