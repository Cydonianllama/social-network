const containerPost = document.getElementById('container-posts')
const textAreaPost = document.getElementById('text-post')
const btnCreatePost = document.getElementById('btn-create-post')

var postsData = []
var stateCreatedPost = 'none' //when fetching the data of the new post tha youre created
var statePost = 'none'        //if there are posts this will change 

function createPostData({idPost,text_}){

}

function updatePost({text_,idPost}){

}

function processCardPost({text_}){
    let card = `
        <div class = "posts__post">
            <p>${text_}</p>
            <div class = "posts__post__actions">
                <button class = "posts__post__actions__button">like</button>
                <button class = "posts__post__actions__button">comment</button>
            </div>
        </div>
    `
    return card
}

function renderCardPost(cardPost){
    containerPost.innerHTML = containerPost.innerHTML + cardPost
}

async function fetchposts(){
    let response = await fetch(`/post/getall`,{
        method : 'GET'
    })
    let dataResponse = await response.json()
    let posts = dataResponse.msg
    postsData = posts // this storage all data post receive from the database 
}

function renderPosts(){
    postsData.forEach(item => {
        renderCardPost(processCardPost(item))
    })
}

async function processPosts(){
    await fetchposts()
    renderPosts()
}

function renderPostInit(card){
    containerPost.innerHTML = containerPost.innerHTML + card
}

function processInsertACardPost(data){
    postsData.push(data)
    renderPostInit(processCardPost(data))
}

async function fetchPostCreated(data){
    let response = await fetch('/post/createone',{
        method : 'POST',
        credentials : "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
    let responseData = response.json()
    if (responseData.status === 'error') stateCreatedPost = 'error in creation' // change the state of this action
    else{
        stateCreatedPost = 'success in creation' // change the state of this action
        processInsertACardPost(data) // inserto into the interface
    } 
}

async function eventCreatePost(e){
    let data = {
        text_ : textAreaPost.value,
        idCategory1 : null,
        idCategory2 : null,
        idCategory3 : null
    }
    await fetchPostCreated(data)
    console.log(stateCreatedPost)
    e.preventDefault()
}

function listenersProfilePage(){
    btnCreatePost.addEventListener('click',eventCreatePost)
}

function app(){
    processPosts()
    listenersProfilePage()
}

app()