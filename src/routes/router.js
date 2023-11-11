const router = require("express").Router()
const control = require("../controllers/controller")
const middle = require("../controllers/middleware")
const upload = require('../controllers/multer')


router.get("/", (req, res) => {
	res.redirect("/html/index.html")
})


// Post



router.post("/registrar", upload.single("file"), control.createUser)

router.post("/atividades", control.createAct)



//authentication
router.post("/login", control.loginUser) // Faz login 



router.get("/usuario", middle.verifyJWT, control.user)

router.get("/pacientes", middle.verifyJWT, control.getPacients)

router.post("/updateAtividade", middle.verifyJWT, control.updateActivity)

router.get("/buscarAct", control.getAct)









module.exports = router