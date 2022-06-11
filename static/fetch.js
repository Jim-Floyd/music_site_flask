const name = document.querySelector('#reg_name'),
    blockOne = document.querySelector(".block_1"),
    reg_email = document.querySelector('#reg_email'),
    reg_password = document.querySelector('#reg_password'),
    reg_confirm_password = document.querySelector('#reg_confirm_password'),
    nameInfo = document.querySelector('.name-info'),
    emailInfo = document.querySelector('.email-info'),
    sumbitBtn = document.querySelector("#submit");


const elem = document.querySelector('.msg')


name.addEventListener("change", () => {
    if (name.value.length < 2) {
        nameInfo.innerHTML = ""
        nameInfo.innerHTML = "password length must be order 2 "
        sumbitBtn.disabled = true
        console.log('password length must be order 2')
    } else {
        nameInfo.innerHTML = ""
        sumbitBtn.disabled = false
    }
})


reg_email.addEventListener("change", () => {
    if (reg_email.value.length < 5) {
        emailInfo.innerHTML = ""
        emailInfo.innerHTML = "password length must be order 5 "
        sumbitBtn.disabled = true
        console.log('password length must be order 5')
    } else {
        emailInfo.innerHTML = ""
        sumbitBtn.disabled = false
    }
})


reg_password.addEventListener("input", () => {
    if (reg_password.value.length < 8) {
        elem.innerHTML = ""
        elem.innerHTML = "password length must be order 8 "
        sumbitBtn.disabled = true
        console.log('password length must be order 8')
    } else {
        elem.innerHTML = ""
        sumbitBtn.disabled = false
        if (reg_password.value.length >= 8) {
            elem.innerHTML = ""
            sumbitBtn.disabled = true
        }
        if (reg_confirm_password.value) {
            if (reg_password.value !== reg_confirm_password.value) {
                elem.innerHTML = ""
                elem1.innerHTML = "Confirm password do not match"
                sumbitBtn.disabled = true
                console.log('password length must be order 8')
            }
        }
    }
})

const elem1 = document.querySelector('.msg1')

reg_confirm_password.addEventListener("input", () => {
    if (reg_password.value !== reg_confirm_password.value) {
        elem1.innerHTML = ""
        elem1.innerHTML = "Confirm password do not match"
        sumbitBtn.disabled = true
    } else {
        elem1.innerHTML = ""
        sumbitBtn.disabled = false
    }
})

sumbitBtn.addEventListener("click", sendRequest)

function sendRequest() {
    fetch('/register', {
        method: 'POST',
        body: JSON.stringify(
            {
                'name': name.value,
                'email': reg_email.value,
                'password': reg_password.value,
                'reg_confirm_password': reg_confirm_password
            }),
        headers: {'Content-Type': 'application/json'}

    })
        .then(res => res.json())
        .then(res => console.log(res))
}


const ps_value = document.querySelector('.fa-eye');
const ps_input = document.querySelector('.reg_ps');

ps_value.addEventListener('click', () => {
    ps_value.classList.toggle('fa-eye');
    ps_value.classList.toggle('fa-eye-slash');
    if (ps_input.type === "password") {
        ps_input.type = "text"
    } else {
        ps_input.type = "password"
    }
})

const singerBtn = document.querySelector('.singer-item'),
    categoryBtn = document.querySelector('.category-item'),
    genreBtn = document.querySelector('.genre-item'),
    singerList = document.querySelector('.singer-list'),
    categoryList = document.querySelector('.category-list'),
    genreList = document.querySelector('.genre-list'),
    addSingerBtn = document.querySelector('.category-add-singer'),
    addCategoryBtn = document.querySelector('.category-add-category'),
    addGenreBtn = document.querySelector('.category-add-genre');

singerBtn.addEventListener('click', ()=>{
    singerList.style.display = 'block'
    categoryList.style.display = 'none'
    genreList.style.display = 'none'
    fetch('/singer-list', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(function (jsonResponse) {
        if (jsonResponse['found'] !== "None") {
            if (jsonResponse['found']) {
                msgTrue.style.cssText = 'display:block; color:red'
                msgFalse.style.cssText = 'display:none;'
            } else if (!jsonResponse['found']) {
                msgTrue.style.display = 'none'
                msgFalse.style.cssText = 'display:block; color:green'
            }
        } else {
            msgTrue.style.display = 'none'
            msgFalse.style.display = 'none'
        }
    })
})
categoryBtn.addEventListener('click', ()=>{
    singerList.style.display = 'none'
    categoryList.style.display = 'block'
    genreList.style.display = 'none'
})
genreBtn.addEventListener('click', ()=>{
    singerList.style.display = 'none'
    categoryList.style.display = 'none'
    genreList.style.display = 'block'
})


const addSingerInfo = document.querySelector('.add-singer-info'),
    addCategoryInfo = document.querySelector('.add-category-info'),
    addGenreInfo = document.querySelector('.add-genre-info')

addSingerBtn.addEventListener('click', ()=>{
        addSingerInfo.style.display = 'block'
        addCategoryInfo.style.display = 'none'
        addGenreInfo.style.display = 'none'
    })

// addSingerBtn.addEventListener('click', ()=>{
//     fetch('/add-singer', {
//         method:'GET',
//         body: JSON.stringify(
//             {
//                 'name': name.value,
//                 'img': reg_email.value,
//             }),
//         headers: {'Content-Type': 'application/json'}
//     })
//     .then(res => res.json())
//     .then(function (jsonResponse) {
//         addSingerInfo.style.display = 'block'
//         addCategoryInfo.style.display = 'none'
//         addGenreInfo.style.display = 'none'
//     })
// })