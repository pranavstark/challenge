"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordsSchema = new Schema({
    key: String,
    value: String,
    createdAt: Date,
    counts: [Number]
});

mongoose.model('records', recordsSchema);