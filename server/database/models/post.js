'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    status: DataTypes.ENUM("draft", "published", "omitted", "trash", "removed")
  }, { timestamps: true });
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};