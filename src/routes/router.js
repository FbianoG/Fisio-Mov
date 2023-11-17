const router = require("express").Router()
const control = require("../controllers/controller")
const middle = require("../controllers/middleware")
const upload = require('../controllers/multer')


// Validação de login

router.post("/login", control.loginUser)




router.post("/createUser", upload.single("file"), control.createUser) // Criação de um novo "Usuário"

router.post("/atividades", upload.single("file"), control.createAct) //Criação de uma nova "Atividade"




// Atualizada atividades

router.post("/updateActivity", middle.verifyJWT, control.updateActivity)




// Busca dados

router.get("/getUser", middle.verifyJWT, control.getUser)

router.get("/getAllUsers", middle.verifyJWT, control.getAllUsers)

router.get("/getAllActivity", middle.verifyJWT, control.getAllActivity)



// Redirecionamento de página

router.get("/", control.index)

router.get('/register', control.register)

router.get("/user", middle.verifyJWT, control.user)

router.get("/activity", middle.verifyJWT, control.activity)

router.get("/provider", middle.verifyJWT, control.provider)







module.exports = router