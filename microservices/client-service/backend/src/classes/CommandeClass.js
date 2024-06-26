const CommandeSchema = require("../models/CommandeModel")

class Commande {

    static async create(commande) {

        const t = await CommandeSchema.create(commande)
        return t
    }

    static async find() {

        const t = await CommandeSchema.find().populate('client').populate('delivery').populate('restaurant').sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(commande_id) {

        const t = await CommandeSchema.findById(commande_id).exec()
        return t
    }

    static async update(id, commande) {

        const t = await CommandeSchema.updateOne({ _id: id }, { $set: commande }).exec()
        return t
    }

    static async remove(commande) {

        const t = await CommandeSchema.deleteOne({ _id: commande }).exec()
        return t
    }

    static async findByClient(clientId) {

        const t = await CommandeSchema.find({client: clientId}).populate('delivery').populate('restaurant').sort({ $natural: -1 }).exec()
        return t
    }

    static async findByDelivery(deliveryId) {

        const t = await CommandeSchema.find({delivery: deliveryId}).sort({ $natural: -1 }).exec()
        return t
    }

    static async findByRestaurant(restaurantId) {

        const t = await CommandeSchema.find({restaurant: restaurantId}).sort({ $natural: -1 }).exec()
        return t
    }
}

module.exports = Commande