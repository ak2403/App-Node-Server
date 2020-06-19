const express = require('express');
const superagent = require('superagent');
const User = require('../models/user');
const { response } = require('express');

const router = express.Router();

const checkExistingUser = async email => {
    let existingUser = await User.findOne({
        email
    })
    return existingUser
}

router.post("/signup", async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password)
        return res.status(400).send({
            message: 'The email or password is not provided.'
        });

    let isExistingUser = await checkExistingUser(email);

    if (!isExistingUser) {
        superagent.post(process.env.ACCESS_REQ_URL)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Basic ${process.env.BITHUB_CLIENT_TOKEN}`)
            .send({
                grant_type: "password",
                username: email,
                password: password
            })
            .end(function (err, response) {
                if (err)
                    return res.status(400).send({
                        message: 'The email or password is '
                    });

                let responseObject = response.body
                let createUser = new User({
                    email,
                    token: responseObject.access_token,
                    refresh_token: responseObject.refresh_token
                })

                createUser.save().then(response => {
                    return res.status(200).send(response);
                })
                    .catch(error => {
                        return res.status(400).send({
                            message: 'Error in creating the user.',
                            additional_information: error.message
                        });
                    });
            })
    } else {
        return res.status(400).send({
            message: 'User is already registered'
        })
    }

})

router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password)
        return res.status(400).send({
            message: 'The email or password is not provided.'
        });

    let isExistingUser = await checkExistingUser(email);

    if(isExistingUser){
        
    }

})

module.exports = router;

// key: fhqpsWEkFq79uRxebk
// secret: 5dtgSNU8rJ2cdXwNbQY4qSD9pF8UtpTC