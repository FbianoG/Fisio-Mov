/* eslint-disable no-undef */
let userData

let activityList = document.querySelectorAll(".listActivity")





async function getUser() {
	const urlParams = new URLSearchParams(window.location.search)
	let token = urlParams.get("id")
	localStorage.setItem("token", token)
	const user = await fetch(`/usuario?id=${token}`)
	const data = await user.json()
	loadingData(data.user)
}

async function loadingData(e) {

	let getAct = await fetch("/buscarAct")
	let data = await getAct.json()
	let allActivity = data.allAct
	document.querySelectorAll('.content h1')[0].textContent = `Bem vindo, ${e.name.split(" ").slice(0, 2).join(" ")}`
	document.querySelectorAll('.perfilHeader img')[0].src = `../uploads/${e.src}`
	console.log(e)
	createActivity(allActivity, e)
}

function createActivity(atividadeApi, userData) {
	activityList[0].innerHTML = ""
	let listHg = document.querySelectorAll(".higher")[0]
	let listLw = document.querySelectorAll(".lower")[0]

	console.log(userData)
	for (let i = 0; i < userData.hg.length; i++) {
		atividadeApi.forEach(element => {
			if (userData.hg[i] === element._id) {
				let newActivity = document.createElement("li")
				newActivity.classList = "cardActivity"
				newActivity.innerHTML = createActivityHtml(element, userData.rpth[i], userData.serh[i], userData)
				listHg.appendChild(newActivity)
			}
		});


	}
	for (let i = 0; i < userData.lw.length; i++) {
		atividadeApi.forEach(element => {
			if (userData.lw[i] === element._id) {
				let newActivity = document.createElement("li")
				newActivity.classList = "cardActivity"
				newActivity.innerHTML = createActivityHtml(element, userData.rptl[i], userData.serl[i], userData)
				listLw.appendChild(newActivity)
			}
		});

	}





	// atividadeApi.forEach(element => {

	// 	let newActivity = document.createElement("li")
	// 	newActivity.classList = "cardActivity"
	// 	newActivity.innerHTML = createActivityHtml(element)
	// 	if (element.category == "hg" && userData.activity.hg.includes(element._id)) {
	// 		listHg.appendChild(newActivity)
	// 	} else if (element.category == "lw" && userData.activity.lw.includes(element._id)) {
	// 		listLw.appendChild(newActivity)

	// 	} else if (element.category) {
	// 		console.log("não existe lw")
	// 	}

	// })

}


function createActivityHtml(e, rpt, ser, userData) {
	const html = `
        <div class="cardData">
            <span style="display:none;">${e._id}</span>
			<img src="../uploads/${e.src}" alt="foto da atividade" class="actImg">
			<div>
            <h4>${e.name}</h4>
            <label>${rpt} - repetições</label>
			<br>
            <label>${ser} - séries</label>
			<br>
            <label style="font-size: 11px;">Enviado por: ${userData.by}</label>
			
			</div>
        </div>
        <div class="statusActivity">
		<a href="${e.web}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" id="acessActivityBtn"></i></a>
            <p>Acessar Atividade</p>
        </div>
    `
	return html
}













getUser() 