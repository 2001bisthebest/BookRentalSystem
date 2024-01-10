exports.read = async(req, res) => {
    res.send('Hello controller read')
}
exports.list = async(req, res) => {
    try{
        res.send('Hello list')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}