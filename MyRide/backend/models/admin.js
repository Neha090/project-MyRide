const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  id:{ type:String, required: true },
  name: { type: String, required: true },
  suv: { type: String, required: true },
  type: { type: String, required: true },
  seater: {type: String, required: true},
  url: {type:String, required: true},
  price: {type:String, required: true},
  petrol: {type:String, required: true},
  from: {type:String, required: true},
  to: {type:String, required: true}

});

module.exports = mongoose.model('Admin', AdminSchema);
