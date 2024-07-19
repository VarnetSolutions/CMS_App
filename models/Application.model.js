// models/Application.model.js
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    appName: { type: String, required: true }
});

const applicationURLSchema = new mongoose.Schema({
    tenantCode: { type: String, required: true },
    urls: [urlSchema]
},{
    timestamps:true
});

const ApplicationURL = mongoose.model('ApplicationURL', applicationURLSchema);

export default ApplicationURL;
