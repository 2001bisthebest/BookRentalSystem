const Order = require("../Models/Order")
const QueueReserving = require("../Models/QueueReserving")

exports.addOrder = async (req, res) => {
    try {
        const { queueId, shippingFromStoreDate, shippingFromCustomerDate, trackNumberFromStore, shippingNameFromStore, shippingNameFromCustomer } = req.body
        const queue = await QueueReserving.findOne({ _id: queueId }).exec()
        const order = await new Order({
            AccId: queue.AccId,
            CopyId: queue.CopyId,
            StoreId: queue.StoreId,
            shippingFromStoreDate: shippingFromStoreDate,
            shippingFromCustomerDate: shippingFromCustomerDate,
            trackNumberFromStore: trackNumberFromStore,
            shippingNameFromStore: shippingNameFromStore,
            shippingNameFromCustomer: shippingNameFromCustomer,
        }).save()
        res.send(order)
    } catch (err) {
        console.log(err)
        res.staus(500).send('Server Error')
    }
}