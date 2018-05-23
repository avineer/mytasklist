var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://avineer:avineer@ds127490.mlab.com:27490/mytasklist_avi', ['tasks']);

// Get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if (err) {
            res.send(err);
            return;
        }
        res.json(tasks);
    });
});

// Get a single task
router.get('/tasks/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if (err) {
            res.send(err);
            return;
        }
        res.json(task);
    });
});

// Save a task
router.post('/tasks', function(req, res, next){
    var task = req.body;
    if (!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad data"
        });

    } else {
        db.tasks.save(task, function(err, task) {
            if (err){
                res.send(err);
                return;                
            }
            res.json(task);
            
        });
    }
});

// Delete a task
router.delete('/tasks/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if (err) {
            res.send(err);
            return;
        }
        res.json(task);
    });
});

// / Update a task
router.put('/tasks/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

    if (task.isDone){
        updTask.isDone = task.isDone;
    }
    if (task.title){
        updTask.title = task.title;
    }

    if (!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
            if (err) {
                res.send(err);
                return;
            }
            res.json(task);
        });
    }
});

module.exports = router;