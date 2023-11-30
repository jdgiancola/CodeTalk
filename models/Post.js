const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,  // Changed to TEXT to accommodate longer posts
      allowNull: false,
    },
    date_created: {  // Added to store the creation date of the post
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {  // Keeps the same structure for referencing the user
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,  // Optionally set to true if you want automatic timestamping
    freezeTableName: true,
    underscored: true,
    modelName: 'post',  // Ensure this is singular as Sequelize pluralizes the table names
  }
);

module.exports = Post;
