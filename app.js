const ListAPI = "http://localhost:3000/list";

function start() {
    getList(renderList);
    handleAddList();
}

start();

function getList(callback) {
    fetch(ListAPI)
    .then(function(response) {
        return response.json();
        })
        .then(callback);
}

function renderList(lists) { 
    // lists tra ve mang object
    var listBlock = document.querySelector('.section__list');
        var htmls = lists.map(function(item) {
            return `
            <li onclick="finishList(${item.id})" class="section__list--item list-item-${item.id}">
                <span class="desc-${item.id}">${item.description}</span>
                <button onclick="handleDeleteList(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </li><hr/>
            `;
        });
    listBlock.innerHTML = htmls.join("");

}

function createList(data, callback) {
    // console.log(callback);
    var options = {
        method: 'POST',
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch(ListAPI, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function handleAddList() {
    var addBtn = document.querySelector("#btn-add");
    // console.log(addBtn);
    addBtn.onclick = function() {
        var description = document.querySelector('input[name="description"]').value;
        var descriptionInput = document.querySelector('input[name="description"]');
        var listData = {
            description: description
        }

        createList(listData, function() {
            getList(renderList);
        });
        
        descriptionInput.value = '';
    }
}

function handleDeleteList(id) {
    var options = {
        method: 'DELETE',
        headers : {
            "Content-Type": "application/json"
        }
    };

    fetch(ListAPI + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var listItem = document.querySelector(".list-item-" + id);
            if(listItem) {
                listItem.remove();
            }
        });
}

function finishList(id) {
    var listItem = document.querySelector(".list-item-" + id);
    listItem.classList.add("underline");
}