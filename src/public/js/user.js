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

	atividadeApi.forEach(element => {
		
		let newActivity = document.createElement("li")
		newActivity.classList = "cardActivity"
		newActivity.innerHTML = createActivityHtml(element)
		if (element.category == "hg" && userData.activity.hg.includes(element._id)) {
			listHg.appendChild(newActivity)
		} else if (element.category == "lw" && userData.activity.lw.includes(element._id)) {
			listLw.appendChild(newActivity)
            
		}

	})

}


function createActivityHtml(e) {
	const html = `
        <div class="cardData">
            <span style="display:none;">${e._id}</span>
            <h4>${e.name}</h4>
            <label>Barbara Días</label>
        </div>
        <div class="statusActivity">
            <p>Completo</p>
            <i class="fa-regular fa-circle-check"></i>
            <a href="${e.web}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" id="acessActivityBtn"></i></a>
        </div>
    `
	return html
}













getUser() 