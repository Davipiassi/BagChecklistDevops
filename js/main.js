// FUNÇÕES --------------------

// função que cria um item da lista da mala de viagem
// criada por Davi Piassi em 23/02/2023
function createElement(item){
    // criando <LI></LI> com a classe .item
    const newItem = document.createElement('li')
    newItem.classList.add("item")

    // criando <DIV></DIV> dentro do <LI></LI> criado e adicionando a classe .item__container
    const container = document.createElement('div')
    container.classList.add("item__container")
    newItem.appendChild(container)

    // criando o elemento com a quantidade do item e adicionando no card
    const newItemNumber = document.createElement('strong')
    newItemNumber.innerHTML = item.itemNumber
    newItemNumber.dataset.id = item.id
    container.appendChild(newItemNumber)

    // adicionando o nome do item no card
    container.innerHTML += item.itemName

    // adicionando um botão de remover item no card
    newItem.appendChild(deleteButton(item.id))

    // adicionando o card criado à lista de itens
    list.appendChild(newItem)
}

// função que cria o botão deletar e suas funcionalidades
// criada por Eduardo Nehme em 23/02/2023
function deleteButton(id){
    // criando o botão de deletar e adicionando a classe .item__delete-button
    const buttonElement = document.createElement("button")
    buttonElement.classList.add("item__delete-button")
    buttonElement.innerText = "X"

    // adicionando a funcionalidade de deletar item no botão
    buttonElement.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })

    return buttonElement
}

// função que remove um item da tela e da lista de itens
// criada por Eduardo Nehme em 23/02/2023
function deleteElement(tag, id){
    // remover o item da tela
    tag.remove()

    // remover o item da lista
    items.splice(items.findIndex(element => element.id === id), 1)

    // atualizar o localstorage com a lista após a remoção
    localStorage.setItem("items", JSON.stringify(items))
}

// CÓDIGO PRINCIPAL --------------------

// definindo tag HTML <form>; tag HTML <ul>; array com itens registrados
const form = document.getElementById("novoItem")
const list = document.getElementById("list")
const items = JSON.parse(localStorage.getItem("items")) || []

// renderizando os elementos com informações carregadas do localStorage
items.forEach((element) => {
    createElement(element)
})

// evento de envio do form
form.addEventListener("submit", (event) => {
    event.preventDefault()

    // capturando os valores do form
    const name = event.target.elements['nome']
    const number = event.target.elements['quantidade']
    
    // criando a estrutura do item
    itemName = name.value
    itemNumber = number.value
    const currentItem = {
        "itemName": itemName,
        "itemNumber": itemNumber
    }

    // adicionando novo item
    currentItem.id = items[items.length - 1] ? (items[items.length - 1]).id + 1 : 0;

    createElement(currentItem)
    items.push(currentItem)

    // atualizando o localstorage após a mudança na lista de itens
    localStorage.setItem("items", JSON.stringify(items))

    // limpando os inputs após a inserção
    name.value = ""
    number.value = ""
})

