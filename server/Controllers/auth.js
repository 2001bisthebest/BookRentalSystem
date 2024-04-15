const bcrypt = require('bcryptjs')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const Store = require('../Models/Store')

exports.register = async (req, res) => {
    try {
        //1. check user
        const { username, password, name, email, address, telephone } = req.body
        var file
        if (req.file) {
            file = req.file.filename
        }
        var user = await User.findOne({ username })
        if (user) {
            return res.send('User Alredy Exists!!!').status(400)
        }
        //2. encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({
            username,
            password,
            name,
            email,
            address,
            telephone,
            file
        })
        console.log(user)
        user.password = await bcrypt.hash(password, salt)
        //3.save
        await user.save()
        const userInfo = await User.findOne({ _id: user._id }).select('_id').exec()
        res.send(userInfo)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.login = async (req, res) => {
    try {
        //1. Check user
        const { username, password } = req.body
        var user = await User.findOneAndUpdate({ username }, { new: true })
        const admin = await Store.findOne({ accId: user._id }).exec()
        console.log(admin)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send('Password is not Valid!!')
            }
            //2. Payload
            if (admin) {
                var payload = {
                    user: {
                        username: user.username,
                        id: user._id
                    },
                    admin: {
                        id: admin._id,
                        name: admin.name
                    }
                }
            } else {
                var payload = {
                    user: {
                        username: user.username,
                        id: user._id
                    }
                }
            }

            //3. Generate token
            jwt.sign(payload, 'jwtsecret', { expiresIn: '1h' }, (err, token) => {
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
exports.currentUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).select('-password').exec()
        res.send(user)
    } catch {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.currentAdmin = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ username: req.body.username }).exec()
        const admin = await Store.findOne({ accId: user._id }).exec()
        res.send(admin)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}