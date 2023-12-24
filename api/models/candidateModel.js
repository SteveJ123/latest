// candidateModel.js
const mongoose = require('mongoose');

// Candidate schema
const candidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobileNo: String,
  dob: String,
  workExperience: String,
  resumeTitle: String,
  currentLocation: String,
  postalAddress: String,
  currentEmployer: String,
  currentDesignation: String  
},{collection:'candidate'});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
