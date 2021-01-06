const btnLogin = document.getElementById('btn-login')
const usernameInput = document.getElementById('input-username')
const passwordInput = document.getElementById('input-password')

function getInputUser(){
    return {
        username: usernameInput.value,
        password: passwordInput.value
    }
}

async function fetchUserValidation(){
    let data = getInputUser()
    let string = JSON.stringify(data)
    let response = await fetch('/api/user/login', {
        method: 'POST',
        body: string,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    let responseData = await response.json()
    if (responseData.response === 'a code for you') window.location.href = '/home'
}

const ActionLoginUser = (e) => {
    fetchUserValidation()
    e.preventDefault()
}

function listenersPage(){
    btnLogin.addEventListener('click',ActionLoginUser)
}

function app(){
    listenersPage()
}

app()