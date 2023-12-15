const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
    {
        subid:String,
        postid: String,
        reportedby: String,
        reportedon: String,
        concern: String,
        posttext:String,
        Ignore:{ type: Boolean, default: false},
        created : { type: Date, default: Date.now }
    }
);

module.exports = Rpt = mongoose.model("Rpts", ReportSchema);