const express = require("express");
const multer = require('multer');
const xlsx = require('xlsx');
var cors = require('cors')
const async = require('async');
const Candidate = require('../models/candidateModel');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const routerController = express.Router();

const processCandidate = async (candidate) => {    
      try {
          const existingCandidate = await Candidate.findOne({ email: candidate.Email });
          console.log(existingCandidate)
          if (existingCandidate) {
              // Skip processing this candidate as a duplicate email exists
  
              return { success: false, message: `Duplicate email: ${candidate.Email}` };
          }
  
          // Process the candidate if email is unique
          // ...
          let obj = {
            "name":candidate['Name of the Candidate'],
            "email":candidate['Email'],
            "mobileNo": candidate['Mobile No.'],
            "dob": candidate['Date of Birth'],
            "workExperience": candidate['Work Experience'],
            "resumeTitle": candidate['Resume Title'],
            "currentLocation": candidate['Current Location'],
            "postalAddress": candidate['Postal Address'],
            "currentEmployer": candidate['Current Employer'],
            "currentDesignation": candidate['Current Designation']
          };
          await Candidate.insertMany(obj).then((res)=>{
            //return { success: true, message: `Processed candidate: ${candidate.Email}` };
          }).catch((err)=>{
            return { success: false, message: `Insertion Error: ${candidate.Email}` };
          });
  
     
      } catch (error) {
          return { success: false, message: `Error processing candidate: ${error.message}` };
      }
  };


routerController.post('/upload', upload.single('file'), async (req, res) => {    
    try {
        const fileBuffer = req.file.buffer;
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        async.eachSeries(
            sheetData,
            async (row, callback) => {
                const result = await processCandidate(row);              
            },
            (err) => {
                if (err) {
                    res.status(500).json({ error: 'Error processing candidates' });
                } else {
                    res.status(200).json({ message: 'All candidates processed successfully' });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = routerController;