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
    if (name.value.length < 3) {
        nameInfo.innerHTML = ""
        nameInfo.innerHTML = "name length must be order 3 "
        sumbitBtn.disabled = true
    } else {
        nameInfo.innerHTML = ""
        sumbitBtn.disabled = false
    }
})


reg_email.addEventListener("change", () => {
    if (reg_email.value.length < 5) {
        emailInfo.innerHTML = ""
        emailInfo.innerHTML = "e-mail length must be order 5 "
        sumbitBtn.disabled = true
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

const singerBtn = document.querySelector('.singer-item1'),
    categoryBtn = document.querySelector('.category-item1'),
    genreBtn = document.querySelector('.genre-item1'),
    singerList = document.querySelector('.singer-list'),
    categoryList = document.querySelector('.category-list'),
    genreList = document.querySelector('.genre-list'),
    addSingerBtn = document.querySelector('.category-add-singer'),
    addCategoryBtn = document.querySelector('.category-add-category'),
    addGenreBtn = document.querySelector('.category-add-genre'),
    singersList = document.querySelector('.artists-list'),
    categoriesList = document.querySelector('.categorys-list'),
    genresList = document.querySelector('.genres-list'),
    addMusicImg = document.getElementById('add_music_img'),
    photoMusic = document.querySelector('.photo-music'),
    mp3Img = document.querySelector('.mp3_img')
console.log(addMusicImg.value)
const controller = new AbortController()
const signal = controller.signal
let type = 'ss'
let onceClickedSingerBtn = false,
    onceClickedCategoryBtn = false,
    onceClickedGenreBtn = false,
    onceClickedAlbumBtn = false;
console.log(onceClickedSingerBtn)

photoMusic.addEventListener('click', ()=>{
    mp3Img.source = addMusicImg.value
})


singerBtn.addEventListener('click', () => {
    singerList.style.display = 'block'
    categoryList.style.display = 'none'
    genreList.style.display = 'none'
    if (singersList.innerHTML === '') {
        getList('artist')

    }
})

addSingerBtn.addEventListener('click', () => {
    addMusicCategory.style.display = 'block'
    onceClickedSingerBtn = true
    onceClickedCategoryBtn = false
    onceClickedGenreBtn = false
    onceClickedAlbumBtn = false
    input1.placeholder = `Enter artist name`
    imgArtist.style.display = 'block'
})


categoryBtn.addEventListener('click', () => {
    singerList.style.display = 'none'
    categoryList.style.display = 'block'
    genreList.style.display = 'none'
    if (categoriesList.innerHTML === '') {
        getList('category')
    }
})

addCategoryBtn.addEventListener('click', () => {
    addMusicCategory.style.display = 'block'
    onceClickedCategoryBtn = true
    onceClickedGenreBtn = false
    onceClickedSingerBtn = false
    onceClickedAlbumBtn = false
    input1.placeholder = `Enter category name`
    imgArtist.style.display = 'none'
})

genreBtn.addEventListener('click', () => {
    singerList.style.display = 'none'
    categoryList.style.display = 'none'
    genreList.style.display = 'block'
    if (genresList.innerHTML === '') {
        getList('genre')
    }
})

addGenreBtn.addEventListener('click', () => {
    addMusicCategory.style.display = 'block'
    input1.placeholder = `Enter genre name`
    imgArtist.style.display = 'none'
    onceClickedGenreBtn = true
    onceClickedSingerBtn = false
    onceClickedCategoryBtn = false
    onceClickedAlbumBtn = false

})

const input1 = document.getElementById('input'),
    imgArtist = document.getElementById('img-artist'),
    addBtn = document.getElementById('add_btn'),
    inputArtist = document.getElementById('input-artist'),
    inputCategory = document.getElementById('input-category'),
    inputGenre = document.getElementById('input-genre'),
    inputAlbum = document.getElementById('input-album');
console.log(inputArtist)
addBtn.addEventListener('click', () => {
    console.log(onceClickedCategoryBtn)
    if (onceClickedCategoryBtn) {
        createType('category')

        onceClickedCategoryBtn = false
    } else if (onceClickedSingerBtn) {
        createType('artist')

        onceClickedSingerBtn = false
    } else if (onceClickedGenreBtn) {
        createType('genre')

        onceClickedGenreBtn = false
    } else if (onceClickedAlbumBtn) {
        createType('album')
        onceClickedAlbumBtn = false
    }
})

function createType(type) {
    onceClickedCategoryBtn = true
    addMusicCategory.style.display = 'none'
    fetch(`/create_type`, {
        method: 'POST',
        body: JSON.stringify(
            {
                'name': input1.value,
                'img': imgArtist.value,
                'type': type
            }),
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => res.json())
        .then(function (jsonResponse) {
            console.log(type)
            const para = document.createElement("p");
            para.innerHTML = `${jsonResponse[`${type}_name`]}`;
            para.classList.add('category')
            document.querySelector(`.${type}s-list`).appendChild(para)
            input1.value = ''
        })
}

const input2 = document.getElementById('input_album')

function createAlbum(singer_id) {
    onceClickedCategoryBtn = true
    addAlbumCategory.style.display = 'none'
    if (input2.value) {
        fetch(`/create_album`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    'name': input2.value,
                    'singer_id': singer_id
                }),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(function (jsonResponse) {
                const para1 = document.createElement("p");
                if (input2.value) {
                    para1.innerHTML = input2.value;
                    para1.classList.add('category')
                    document.querySelector(`.albums-list`).appendChild(para1)
                }
                input2.value = ''
            })
    }
}

function getAlbumList(singer_id) {
    console.log(singer_id)
    fetch(`/album-list/` + singer_id, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(function (jsonResponse) {
            jsonResponse['album_list'].forEach((element, index) => {
                albumsList.innerHTML += `<p class="category album-item"><span class="get-singer-id" style="display:none">${element['singer_id']}</span>${element['album_name']}</p>`
            })
            let albumItems = document.querySelectorAll('.album-item')
            let removeStyle = function () {
                    albumItems.forEach(item => {
                        item.classList.remove('category_active');
                    })
                }
                albumItems.forEach(item => {
                    item.addEventListener('click', () => {
                        console.log('clicked')
                        removeStyle()
                        item.classList.add('category_active')
                        inputAlbum.value = item.innerText
                    })
                })
        })
}


let albumsList = document.querySelector('.albums-list'),
    singer_id = 0,
    addAlbumCategory = document.querySelector('.add_album_category');


function getList(type) {
    fetch(`/${type}-list`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(function (jsonResponse) {
            if (type === 'artist') {
                jsonResponse['singers'].forEach((element, index) => {
                    singersList.innerHTML += `<p class="category artist-item"><span class="get-singer-id" style="display:none">${element['singer_id']}</span>${element['singer_name']}</p>`
                })
                let artistItems = document.querySelectorAll('.artist-item'),
                    getSingerId = document.querySelectorAll('.get-singer-id'),
                    addAlbum = document.querySelector('.category-add-album'),
                    indexItem = '';
                let removeStyle = function () {
                    artistItems.forEach(item => {
                        item.classList.remove('category_active');
                    })
                }
                artistItems.forEach((item, index) => {

                    item.addEventListener('click', () => {

                        if (indexItem !== index) {
                            albumsList.innerHTML = ''
                            indexItem = index
                            console.log(inputArtist.value)
                            console.log('clicked')
                            removeStyle()
                            item.classList.add('category_active')
                            inputArtist.value = item.innerText
                            console.log(getSingerId[index].innerText)
                            console.log(index)
                            singer_id = getSingerId[index].innerText
                            albumsList.style.display = 'block'
                            addAlbum.style.display = 'block'
                            indexItem = ''
                            if (albumsList.innerHTML === '') {
                                getAlbumList(singer_id)
                            }
                        }
                    })
                })
            } else if (type === 'category') {
                jsonResponse['category_list'].forEach((element, index) => {
                    categoriesList.innerHTML += `<p class="category category-item">${element['category_name']}</p>`
                })

                let categoryItems = document.querySelectorAll('.category-item')
                let removeStyleC = function () {
                    categoryItems.forEach(item => {

                        item.classList.remove('category_active');
                    })
                }
                categoryItems.forEach(item => {
                    item.addEventListener('click', () => {
                        console.log('clicked')
                        removeStyleC()
                        item.classList.add('category_active')
                        inputCategory.value = item.innerHTML
                    })
                })
            } else {
                jsonResponse['genre_list'].forEach((element, index) => {
                    genresList.innerHTML += `<p class="category genre-item">${element['genre_name']}</p>`
                })
                let genreItems = document.querySelectorAll('.genre-item')
                let removeStyleG = function () {
                    genreItems.forEach(item => {
                        item.classList.remove('category_active');
                    })
                }
                genreItems.forEach(item => {
                    item.addEventListener('click', () => {
                        removeStyleG()
                        item.classList.add('category_active')
                        inputGenre.value = item.innerHTML
                    })
                })
            }
        })
}

let addAlbum = document.querySelector('.category-add-album');
addAlbum.addEventListener('click', () => {
    addAlbumCategory.style.display = 'block'
    input2.placeholder = `Enter album name`
    imgArtist.style.display = 'none'

    const addAlbumBtn = document.getElementById('add_album_btn')
    addAlbumBtn.addEventListener('click', () => {
        createAlbum(singer_id)
    })
    // onceClickedGenreBtn = false
    // onceClickedSingerBtn = false
    // onceClickedCategoryBtn=false
    // onceClickedAlbumBtn = true
})

const addSingerInfo = document.querySelector('.add-singer-info'),
    addCategoryInfo = document.querySelector('.add-category-info'),
    addGenreInfo = document.querySelector('.add-genre-info'),
    addMusicCategory = document.querySelector('.add_music_category'),
    formPost = document.querySelector('.border_box')


const closeSection = document.querySelector(('.close-section'))
closeSection.addEventListener('click', () => {
    addMusicCategory.style.display = 'none'
    onceClickedCategoryBtn = true
})

