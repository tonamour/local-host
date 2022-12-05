const API = "http://localhost:8001/users"

let name = document.querySelector('#name')
let surname = document.querySelector('#surname')
let number = document.querySelector('#number')
let image = document.querySelector('#image')
let btnAdd = document.querySelector('#btn-add')

let list = document.querySelector('#users-list')

let editName = document.querySelector('#edit-name')
let editSurname = document.querySelector('#edit-surname')
let editNumber = document.querySelector('#edit-number')
let editImage = document.querySelector('#edit-image')
let editSaveBtn = document.querySelector('#btn-save-edit')
let exampleModal = document.querySelector('#exampleModal')





// console.log(name,surname,number);

btnAdd.addEventListener('click', async function(){
    let obj = {
        name:name.value,
        surname:surname.value,
        number:number.value,
        image:image.value
    };
    if(!obj.name.trim() || !obj.surname.trim() || !obj.number.trim() || !obj.image.trim() ){
        alert('Заполните поля')
        return
    }

  await fetch(API, {
    method:'POST',
    headers: {
        'Content-Type' : 'application/json; charset=utf-8'
    },
    body: JSON.stringify(obj),
  });
  render()

  name.value = ''
  surname.value = ''
  number.value = ''
  image.value = ''

});

render()
async function render() {
    let users = await fetch(API)
    .then((res)=> res.json()).catch((err) => console.log(err));
list.innerHTML = '';
users.forEach((elem)=> {
    let newElem = document.createElement('div')
    newElem.id = elem.id
    
    newElem.innerHTML = `
    <div class="card m-5" style="width: 18rem;">
      <img src=${elem.image} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${elem.name}</h5>
        <p class="card-text">${elem.surname}</p>
        <p class="card-text">${elem.number}</p>
    
    
        <a href="#" class="btn-delete btn  btn-danger btn-delete" id=${elem.id}>DELETE</a>
        <a href="#" class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal " id=${elem.id}>EDIT</a>
      </div>
    </div>
        `;
    
    
    
        list.append(newElem)





});


}


document.addEventListener('click' , function(e){
    if(e.target.classList.contains('btn-edit')){
        let id = e.target.id
        fetch(`${API}/${id}`).then((res)=> res.json()).then((data)=> {
            editName.value = data.name,
            editSurname.value = data.surname,
            editNumber.value = data.number,
            editImage.value = data.image



            editSaveBtn.setAttribute('id',data.id)
        })
    }
})

editSaveBtn.addEventListener('click' , function(){

    let id = this.id

    let name = editName.value
    let surname = editSurname.value
    let number = editNumber.value
    let image = editImage.value

    if(!name || !surname || !number || !image) return;
    

    let editedUsers = {
        name:name,
        surname:surname,
        number:number,
        image:image
    };
    saveEdit(editedUsers , id)
})


function saveEdit(editedUsers,id){
    fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json ; charset=utf-8'
        },
        body: JSON.stringify(editedUsers)
    }).then(()=> render())

    let modal = bootstrap.Modal.getInstance(exampleModal)
    modal.hide
}


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
      let id = e.target.id;
      fetch(`${API}/${id}`, {
        method: "DELETE",
      }).then(() => {
        contentList.innerHTML = "";
        displayInfo();
      });
    }
  });




