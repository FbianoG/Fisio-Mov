const mongoose = require("mongoose")

const url = "mongodb+srv://fabiano123:fabiano123@cluster0.p2xagpb.mongodb.net/?retryWrites=true&w=majority"

async function connectDataBase() {
	try {
		await mongoose.connect(url)
		console.log("Conectado ao DataBase")
	} catch (error) {
		console.log("Erro ao conectar o DataBase")
	}
}

module.exports = {
	connectDataBase,
}