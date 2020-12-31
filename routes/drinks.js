const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Day = require('../models/Day');
const User = require('../models/User');

 
router.post('/user/:id/day/:date', (req, res) => {
  const { date, startTime, name, category, servingAmount, servingSize } = req.body;
  console.log('this is req.params.id', req.params)
  Day.findOne({$and: [{owner: req.params.id}, {date: req.params.date}]})
    .then (day => {
      console.log('this is the day', day)
      if(day !== null) {
        Day.findByIdAndUpdate(day._id,
          { $push: {"drinks": 
          {startTime, name, category, imgUrl: "", servingAmount, servingSize}}
          }, {new: true})
          .then(dbDay => {
            res.status(201).json(dbDay);
          })
          .catch(err => {res.json(err);
          })
      } else {
        Day.create({
          date: date,
          owner: req.params.id,
          drinks: [{
            startTime: startTime,
            name,
            imgUrl: "",
            category,
            servingAmount,
            servingSize}]
        })
        .then((dbDay) => {
          User.findByIdAndUpdate(req.params.id, {
            $push: { days: dbDay._id },
          }).then(dbUser => {
            res.status(201).json(dbUser);
          })
          .catch(err => {res.json(err);
          })
        })
      }
    })
})

// delete drink

router.put('/user/:userId/day/:date/:drinkId/delete', (req, res, next) => {
  console.log("delete params");
  console.log(req.params);
  Day.findOne({$and: [{owner: req.params.userId}, 
                      {date: req.params.date}]})
  .then(dbDay => {
    const newDrinks = dbDay.drinks.filter(drink => 
      drink.id !== req.params.drinkId);
    console.log(newDrinks);
    Day.findOneAndUpdate({$and: [{owner: req.params.userId}, 
                                 {date: req.params.date}]},
                        {drinks: newDrinks})
      .then(() => {
        res.status(200).json({ message: 'ok' })
      }).catch(err => res.json(err));
  }).catch(err => res.json(err))
})

module.exports = router;