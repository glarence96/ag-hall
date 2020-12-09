const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
}); 

/*router.route('/add').post((req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const date = req.body.date;  
    const newUser = new User({name, phone, date});
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});*/

router.route('/add-range').post((req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const dates = req.body.dates;
    const amtToPay = req.body.amtToPay;
    const newUser = new User({name, phone, dates, amtToPay});  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports=router;