'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Author, { foreignKey: 'author_id' })
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    isbn: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        check(value) {
          if (value < 0) throw new Error('Price must be greater than zero')
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        check(value) {
          if (value < 0) throw new Error('Value must be greater than zero')
        }
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        if (/\w+_\w+/.test(instance.isbn) == false) {
          instance.isbn = instance.title.toLowerCase().split(' ').join('_') + instance.isbn
        }
      }
    },
    modelName: 'Book',
  });
  return Book;
};