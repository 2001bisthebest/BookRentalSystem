const bcrypt = require('bcryptjs')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const Store = require('../Models/Store')

exports.register = async (req, res) => {
    try {
        //1. check user
        // const { username, password, name, email, address, telephone, typeofbook, file } = req.body

        var data = req.body
        console.log('body ', req.body)
        console.log('file', req.file)
        const username = data.username
        const password = data.password
        const name = data.name
        const email = data.email
        const address = data.address
        const telephone = data.telephone
        const typeofbook = data.typeofbook
        var file
        // console.log('eiei', req.file)

        if (req.file) {
            data.file = req.file.filename
        }
        console.log(data)
        // var data = req.body
        // if (req.file) {
        //     data.file = req.file.filename
        // }
        // console.log(data)
        var user = await User.findOne({ username })
        // console.log(req.body)
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
            typeofbook,
            file
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