

let token
let userData
let allPacients
let allAct
let getPacientsBtn = document.querySelectorAll('button')[0]
let pacientList = document.querySelectorAll('.pacientList')[0]

getPacientsBtn.addEventListener('click', getPacients)


async function getUser() { // Get dados do usuário
    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get('id');
    localStorage.setItem('token', token)
    const user = await fetch(`/usuario?id=${token}`)
    const data = await user.json()
    userData = data
    console.log(userData);
}

async function getPacients() { // Get todos os pacientes cadastrados
    const token = localStorage.getItem('token')
    const user = await fetch(`/pacientes?id=${token}`)
    const data = await user.json()
    allPacients = data.allPacients
    createCards(allPacients)
}


function createCards(e) {
    pacientList.innerHTML = ''
    e.forEach(element => {
        let newPacient = document.createElement('div')
        newPacient.classList = 'pacientCard'
        newPacient.innerHTML = pacientCardHtml(element)
        pacientList.appendChild(newPacient)
    });
    createActivity()
}

async function createActivity() {
    let getAct = await fetch("/buscarAct")
    let data = await getAct.json()
    console.log(data.allAct);
    let ulHg = document.querySelectorAll('.higher')
    let ulLw = document.querySelectorAll('.lower')

    ulHg.forEach(e => {
        data.allAct.forEach(element => {
            if (element.category == 'lw') {
                return
            }
            let newAct = document.createElement('li')
            newAct.innerHTML = `
        <input type="checkbox" value="${element._id}" name="${element.category}[]">${element.name}`
            // document.querySelectorAll('.higher')[0].appendChild(newAct)
            e.appendChild(newAct)
        });
    });

    ulLw.forEach(e => {
        data.allAct.forEach(element => {
            if (element.category == 'hg') {
                return
            }
            let newAct = document.createElement('li')
            newAct.innerHTML = `
        <input type="checkbox" value="${element._id}" name="${element.category}[]">${element.name}`
            // document.querySelectorAll('.higher')[0].appendChild(newAct)
            e.appendChild(newAct)
        });
    });
}

createActivity()

function pacientCardHtml(e) {
    const html = `
    <form action="/updateAtividade?id=${token}" method="post" class="pacientCardForm">
        <div class="pacientData">
            <input name="_id" style="display: none;" value="${e._id}"></input>
            <h4>${e.name}</h4>
            <span>64 anos</span>
            <span>${e.email}</span>
            <span>(21) 97989-8990</span>
            <span>Entorce do ternozelo esquerdo e fratura do dedo.</span>
        </div>
        <div class="pacientActivity">
            <div class="activityMember">
                <h4>Membros Superiores</h4>
                <ul class="activityList higher">
                    
                </ul>
            </div>
            <div class="activityMember">
                <h4>Membros Inferiores</h4>
                <ul class="activityList lower">

                </ul>
            </div>
            <div class="pacienteHistoric">
                <textarea name="menssage" placeholder="Enviar mensagem..."></textarea>
                <input type="submit" class="btnSubmit" value="Enviar Atividades">
            </div>
        </div>
    </form>
    `
    return html
}





















getUser() 