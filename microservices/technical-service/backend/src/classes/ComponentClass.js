const ComponentModel = require("../models/ComponentModel")

class Component {

    static async create(component) {

        const t = await ComponentModel.create(component)
        return t
    }
    

    static async find() {

        const t = await ComponentModel.find().sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(component_id) {

        const t = await ComponentModel.findById(component_id).exec()
        return t
    }

    
    static async update(id, component) {

        const t = await ComponentModel.updateOne({ _id: id }, { $set: component }).exec()
        return t
    }

    static async remove(component) {

        const t = await ComponentModel.deleteOne({ _id: component }).exec()
        return t
    }
}

module.exports = Component