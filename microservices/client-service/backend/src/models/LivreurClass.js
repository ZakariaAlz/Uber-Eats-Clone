const LivreurSchema = require("../models/LivreurModel")


class Livreur {

    static async create(livreur) {

        const t = await LivreurSchema.create(livreur)
        return t
    }
    

    static async find() {

        const t = await LivreurSchema.find().populate('client').sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(livreur_id) {

        const t = await LivreurSchema.findById(livreur_id).exec()
        return t
    }

    
    static async update(id, livreur) {

        const t = await LivreurSchema.updateOne({ _id: id }, { $set: livreur }).exec()
        return t
    }

    static async remove(livreur) {

        const t = await LivreurSchema.deleteOne({ _id: livreur }).exec()
        return t
    }

    // static async findByClient(clientId) {

    //     const t = await LivreurSchema.find({client: clientId}).sort({ $natural: -1 }).exec()
    //     return t
    // }
}

module.exports = Livreur