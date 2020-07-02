const { Author, Book } = require('../models')
const { Op } = require('sequelize')
const formater = require('../helper/formater')

class CommandCenter {
  static home(req, res) {
    res.render('home')
  }

  static showAuthor(req, res) {
    Author.findAll({
      include: [
        {
          model: Book
        }
      ]
    })
      .then(data => res.render('authors', { data }))
      .catch(err => res.send(err))
  }

  static showBooks(req, res) {
    Book.findAll({
      where: {
        stock: {
          [Op.gt]: 0
        }
      }, include: [
        {
          model: Author
        }
      ], order: [
        ['id', 'ASC']
      ]
    })
      .then(data => res.render('books', { data, formater }))
      .catch(err => res.send(err))
  }

  static buyBooks(req, res) {
    let param = +req.params.id
    Book.findByPk(param)
      .then(data => {
        let newStock = data.stock - 1
        let updatedBook = {
          stock: newStock
        }
        return Book.update(updatedBook, {
          where: {
            id: param
          }
        })
      }).then(data => res.redirect('/books'))
      .catch(err => res.send(err))
  }

  static addForm(req, res) {
    Author.findAll()
      .then(data => {
        res.render('addForm', { data })
      }).catch(err => res.send(err))

  }

  static add(req, res) {
    const { title, isbn, price, stock, author_id } = req.body

    let newBook = {
      title,
      isbn,
      price,
      stock,
      author_id
    }

    Book.create(newBook)
      .then(data => res.redirect('/books'))
      .catch(err => res.send(err))
  }

  static emptyList(req, res) {
    Book.findAll({
      where: {
        stock: {
          [Op.eq]: 0
        }
      }, include: [
        {
          model: Author
        }
      ]
    }).then(data => {
      res.render('emptyList', { data })
    })
      .catch(err => res.send(err))
  }

  static restockForm(req, res) {
    let param = +req.params.id
    Book.findByPk(param)
      .then(data => res.render('restockForm', { data }))
      .catch(err => res.send(err))
  }

  static restock(req, res) {
    let param = +req.params.id
    const { addition } = req.body

    Book.findByPk(param)
      .then(data => {
        let newStock = data.stock + Number(addition)
        let updatedStock = {
          stock: newStock
        }
        return Book.update(updatedStock, {
          where: {
            id: param
          }
        })
      }).then(data => res.redirect('/books/emptyList'))
      .catch(err => res.send(err))
  }

  static delete(req, res) {
    let param = +req.params.id
    Book.destroy({
      where: {
        id: param
      }
    }).then(data => res.redirect('/books/emptyList'))
      .catch(err => res.send(err))
  }
}

module.exports = CommandCenter