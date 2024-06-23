const ArticleSchema = require("../models/ArticleModel")

class Article {

    static async create(article) {

        const t = await ArticleSchema.create(article)
        return t
    }
    

    static async find() {

        const t = await ArticleSchema.find().sort({ $natural: -1 }).exec()
        return t
    }

    static async findById(article_id) {

        const t = await ArticleSchema.findById(article_id).exec()
        return t
    }

    
    static async update(id, article) {

        const t = await ArticleSchema.updateOne({ _id: id }, { $set: article }).exec()
        return t
    }

    static async remove(article) {

        const t = await ArticleSchema.deleteOne({ _id: article }).exec()
        return t
    }

    static async findByRestaurant(restaurantId) {

        const t = await CommandeSchema.find({restaurant: restaurantId}).sort({ $natural: -1 }).exec()
        return t
    }
}

module.exports = Article