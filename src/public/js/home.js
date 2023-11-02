/* eslint-disable no-undef */
let accessForm = document.querySelectorAll(".accessForm")[0]
let btnAccessBar = document.querySelectorAll("button")[0]
let btnRegisterBar = document.querySelectorAll("button")[1]
let btnHiddenForm = accessForm.querySelectorAll(".btnHidden")[0]


btnAccessBar.addEventListener("click", showAcessForm)
btnHiddenForm.addEventListener("click", hiddenAcessForm)
btnRegisterBar.addEventListener("click", () => window.location.href = "registro.html")
// ac.addEventListener('click', aces)

// async function aces(e) {
//     e.preventDefault()
//     let get = await fetch('/usuario')
//     let token = await get.json()
//     if (token) {
//         localStorage.setItem("token", token)
//     }

//     console.log(token);
// }


function showAcessForm() {

	accessForm.style.top = "70px"
}

function hiddenAcessForm() {
	accessForm.style.top = "-320px"
	accessForm.style.transition = "350ms"
}
