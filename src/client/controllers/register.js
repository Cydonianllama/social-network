const btnRegister = document.getElementById('btn-register')
const inputFullname = document.getElementById('input-fullname')
const inputUsername = document.getElementById('input-username')
const inputPassword = document.getElementById('input-password')
const textAreaDescription = document.getElementById('text-area-description')
const inputBirthdate = document.getElementById('input-birthdate')

async function fetchRegisterData(){
    let data = JSON.stringify({
        fullname: inputFullname.value,
        username: inputUsername.value,
        password: inputPassword.value,
        description: textAreaDescription.value,
        birthdate: inputBirthdate.value
    })
    let response = await fetch('/api/user/register',{
        method : 'POST',
        body : data,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    let responseData = await response.json()
    console.log(responseData)
}

const ActionRegisterData = (e) => {
    fetchRegisterData()
    e.preventDefault()
}

function listeners(){
    btnRegister.addEventListener('click', ActionRegisterData)
}

function app(){
    listeners()
}

app()