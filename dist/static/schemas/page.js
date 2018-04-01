var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var pageSchema = new Schema({
  title: String,
  author: {
    type: ObjectId,
    ref: 'User'
  },
  bannerUrl: String,
  summary: String,
  content: String,
  pv: {
    type: Number,
    default: 0
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

//为模式添加方法
pageSchema.pre('save', function(next){
  if(this.isNew){
    this.meta.createAt = this.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  next();
});

pageSchema.statics = { //给模式添加静态方法
  fetch: function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb){
    return this
      .findOne({_id: id})
      .exec(cb)
  },
};

module.exports = pageSchema;
