const mongoose = require('mongoose');

const UserCarSchema = mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  dfrom: { type:String , required: true},
  dto: { type: String , required: true}
  
});

module.exports = mongoose.model('UserCar', UserCarSchema);