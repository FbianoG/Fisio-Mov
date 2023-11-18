const { PacientModel, ActivityModel } = require("../models/model")
const path = require('path')
const jwt = require("jsonwebtoken")
const secret = "teodoro"





async function createUser(req, res) { // Cria um novo usuário
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

async function createAct(req, res) { // Cria uma nova atividade
	let { name, web, category } = req.body
	console.log(req.file)
	const src = req.file
	if (!name || !web || !category || !src) {
		return res.status(401).json({ message: "Preencha todos os campos!" })
	}
	try {
		name = name.toLowerCase()
		let newAct = await ActivityModel.create({ name, web, category, src: src.filename })
		res.status(201).json({ message: "Atividade criada com sucesso!", newAct })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Algum erro foi encontrado!" })
	}

}

async function loginUser(req, res) { // Validação de login
	let { email, password } = req.body
	try {
		if (!email || !password) {
			return res.status(400).json({ menssage: "Preencha todos os campos!" })
		}
		email.toLowerCase()
		let user = await PacientModel.findOne({ email })
		if (!user || password != user.password) {
			return res.status(401).redirect('/?auth=loginInvalido')
		}
		const token = jwt.sign({ id: user }, secret, { expiresIn: "1h" })
		if (user.isPacient == true) {
			return res.redirect(`/user?id=${token}`)
		} else {
			return res.redirect(`/provider?id=${token}`)
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ status: 500, message: "Ocorreu algum erro!", error })
	}
}

async function getUser(req, res) {
	res.status(200).json({ status: 200, auth: true, user: req.userId }) //  req.userId vem do token codificado 
}

async function getAllUsers(req, res) { // Busca todos os "Usuários" no "DataBase"
	try {
		let allPacients = await PacientModel.find({ isPacient: true, }, "-password")
		if (allPacients.length === 0) {
			return res.status(204).end()
		}
		return res.status(200).json({ status: 200, auth: true, allPacients })
	} catch (error) {
		return res.status(500).json({ status: 500, message: "Ocorreu algum erro!", error })
	}
}

async function getAllActivity(req, res) { // Busca todas as "Atividades" no "DataBase"
	try {
		let allAct = await ActivityModel.find({})
		if (allAct.length == 0) {
			console.log({ status: 204, menssage: "Não possui atividades cadastradas no DataBase!" })
			return res.status(204).end()
		}
		res.status(200).json({ status: 200, allAct })
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 500, menssage: "Ocorreu algum erro!", error })
	}
}

async function updateActivity(req, res) { // Atualiza e envia ao usuário as atividades
	let { _id, menssage, hg, rpth, serh, lw, rptl, serl, by } = req.body
	const token = req.query.id
	try {
		if (!_id) {
			return res.status(400).json({ message: "Falta informações na requisição!" })
		}
		if (!hg) {
			hg = rpth = serh = []
		}
		if (!lw) {
			lw = rptl = serl = []
		}
		let pacient = await PacientModel.findOneAndUpdate({ _id }, { menssage, hg, rpth, serh, lw, rptl, serl, by }, { new: true })
		if (!pacient) {
			return res.status(404).json({ message: "Nenhum paciente encontrado!" })
		}
		res.status(200).redirect(`/provider?id=${token}`)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ status: 500, message: "Algum erro foi encontrado!", error })
	}
}

// SendFiles

async function index(req, res) {
	res.status(200).sendFile(path.join(__dirname, "../public/html/index.html"))
}

async function register(req, res) {
	res.status(200).sendFile(path.join(__dirname, "../public/html/registro.html"))
}

async function user(req, res) {
	res.status(200).sendFile(path.join(__dirname, "../public/html/user.html"))
}

async function activity(req, res) {
	res.status(200).sendFile(path.join(__dirname, "../public/html/atividade.html"))
}

async function provider(req, res) {
	res.status(200).sendFile(path.join(__dirname, "../public/html/provider.html"))
}

async function access(req, res) {
	res.status(200).sendFile(path.join(__dirname, "../public/html/acessibilidade.html"))
}




module.exports = {
	loginUser,
	createUser,
	createAct,
	updateActivity,
	getUser,
	getAllUsers,
	getAllActivity,
	index,
	user,
	register,
	activity,
	provider,
	access,
}