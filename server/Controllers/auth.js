const bcrypt = require('bcryptjs')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        //1. check user
        const { name, password } = req.body

        var user = await User.findOne({ name })

        if (user) {
            return res.send('User Alredy Exists!!!').status(400)
        }
        //2. encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({
            name,
            password
        })
        console.log(user)
        user.password = await bcrypt.hash(password, salt)
        //3.save
        await user.save()
        res.send('Register success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.login = async (req, res) => {
    try {
        //1. Check user
        const { name, password } = req.body
        var user = await User.findOneAndUpdate({ name }, { new: true })
        console.log(user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send('Password is not Valid!!')
            }
            //2. Payload
            var payload = {
                user: {
                    name: user.name
                }
            }
            //3. Generate token
            jwt.sign(payload, 'jwtsecret', { expiresIn: '1d' }, (err, token) => {
                if (err) throw err;
                res.json({ token, payload })
            })
        } else {
            return res.status(400).send('User not found')
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}