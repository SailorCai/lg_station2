var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var categorySchema = new Schema({
  name: String,
  pages: [{type: ObjectId, ref: 'Page'}],
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
categorySchema.pre('save', function(next){  //每次保存数据前都会调用这个方法
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.new();
  }else{
    this.meta.updateAt = Date.now();
  };

  next();
});

//给模式添加静态方法
categorySchema.statics = {
  fetch: function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb){
    return this
      findOne({_id: id})
      .exec(cb)
  }
};

module.exports = categorySchema;
