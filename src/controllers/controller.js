const { PacientModel, ActivityModel } = require("../models/model")
const jwt = require("jsonwebtoken")
const secret = "teodoro"




async function loginUser(req, res) {

	let { email, password } = req.body
	email.toLowerCase()
	try {
		let user = await PacientModel.findOne({ email })
		if (!user && user.password != password) {
			return res.status(404).json({ message: "Login ou senha inválidos!" })
		}
		const token = jwt.sign({ id: user }, secret, { expiresIn: "1h" })
		if (user.isPacient == true) {
			return res.redirect(`/html/user.html?id=${token}`)
		} else {
			return res.redirect(`/html/provider.html?id=${token}`)
		}

	} catch (error) {
		console.error(error)
		return res.status(400).json({ message: "Ocorreu algum erro!", error })
	}

}

async function user(req, res) {
	res.json({ auth: true, user: req.userId })
}

async function getPacients(req, res) {

	try {
		let allPacients = await PacientModel.find({ isPacient: true }, "-password")
		if (allPacients.length > 0) {
			return res.status(200).json({ auth: true, allPacients })
		}
		res.status(204).json({ auth: true, message: "Nenhum paciente encontrado!" })
	} catch (error) {
		return res.status(500).json({ message: "Algum erro foi encontrado!", error })
	}

}

async function createUser(req, res) {
	let { name, email, password, nasc, tel } = req.body
	const file = req.file
	console.log(file)
	if (name && email && password && nasc) {
		try {
			name = name.toLowerCase()
			email = email.toLowerCase()
			let newClient = await PacientModel.create({ name, email, password, nasc, tel, menssage: "", isPacient: true, higher: undefined, lower: undefined, src: file.filename })
			console.log({ message: "Usuário cadastrado com sucesso: ", newClient })
			res.status(201).json({ message: "Usuário cadastrado" })
		} catch (error) {
			console.log({ message: "Erro ao criar cadastro", error })
			res.status(500).json({ error: error })
		}
	} else {
		console.log("Preencha todos os campos!")
		res.status(400).json({ message: "Preencha todos os campos!" })
	}

}

async function updateActivity(req, res) {
	let { _id, menssage, ...rest } = req.body
	try {
		if (!_id) {
			return res.status(400).json({ message: "Falta informações na requisição!" })
		}

		let pacient = await PacientModel.findOneAndUpdate({ _id }, { menssage, activity: rest }, { new: true })
		if (!pacient) {
			return res.status(404).json({ message: "Nenhum paciente encontrado!" })
		}
		res.status(200).json({ status: 200, message: "Tarefa atualizada!", pacient })
	} catch (error) {
		return res.status(500).json({ message: "Algum erro foi encontrado!", error })
	}
}

async function createAct(req, res) {

	let { name, web, category } = req.body
	if (!name || !web || !category) {
		return res.status(401).json({ message: "Preencha todos os campos!" })
	}
	try {
		name = name.toLowerCase()
		let newAct = await ActivityModel.create({ name, web, category })
		res.status(201).json({ message: "Atividade criada com sucesso!", newAct })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Algum erro foi encontrado!" })
	}

}

async function getAct(req, res) {
	let allAct = await ActivityModel.find({})
	res.json({ allAct })
}


module.exports = {
	createUser,
	loginUser,
	user,
	getPacients,
	updateActivity,
	createAct,
	getAct,

}