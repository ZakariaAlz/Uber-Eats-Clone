const DeliverySchema = require("../models/DeliveryModel")


class Delivery {

    static async create(delivery) {

        delivery.password = await bcrypt.hash(delivery.password, 10)
        const t = await DeliverySchema.create(delivery)
        return t
    }
    

    static async find() {

        const t = await DeliverySchema.find().sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(delivery_id) {

        const t = await DeliverySchema.findById(delivery_id).exec()
        return t
    }

    
    static async update(id, delivery) {
        
        delivery.password = await bcrypt.hash(delivery.password, 10)
        const t = await DeliverySchema.updateOne({ _id: id }, { $set: delivery }).exec()
        return t
    }

    static async remove(delivery) {

        const t = await DeliverySchema.deleteOne({ _id: delivery }).exec()
        return t
    }

    static async findByEmail(email) {

        const t = await DeliverySchema.find({email: email}).exec()
        return t
    }
}

module.exports = Delivery