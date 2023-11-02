const mongoose = require("mongoose")


const Pacient = new mongoose.Schema({
	name: String,
	email: { type: String, required: true, unique: true },
	password: { type: String, required: false, },
	nasc: { type: Date, },
	isPacient: Boolean,
	menssage: String,
	activity: Object,
})

const Activity = new mongoose.Schema({
	name: { type: String, unique: true },
	category: String,
	web: String,
})




const PacientModel = mongoose.model("Pacient", Pacient)

const ActivityModel = mongoose.model("Activity", Activity)




module.exports = {
	PacientModel,
	ActivityModel,
}