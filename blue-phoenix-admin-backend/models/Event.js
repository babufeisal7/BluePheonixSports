const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  registration: String,
  format: String,
  organizer: String,
  organizerPhone: String,
  awards: String,
  catering: String,
  venue: String,
  venueLocation: String,
  venuePhone: String,
  venuePhoneTwo: String,
  image: String,
});

module.exports = mongoose.model('Event', eventSchema);
