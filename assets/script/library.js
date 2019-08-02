"use strict";

let myLibrary = [];
let addNewBookButton = document.getElementById("add_new_book_button");
let addBookForm = document.getElementById("newBook");

addBookForm.style.display = "none";

function Book(title, pagesNumber, author) {
    this.title = title;
    this.pagesNumber = pagesNumber
    this.author = author;
    this.isRead = false;
}

// Book.prototype = { 
//     isRead: false
// }

function addBookToLibrary() {
    let title = document.getElementById("name").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;

    let book = new Book(title, author, pages);
    myLibrary.push(book);
}

function render() {
    let book1 = new Book('title1', 'author1', 200);
    let book2 = new Book('title2', 'author2', 200);
    let book3 = new Book('title3', 'author3', 200);
    

    myLibrary.push(book1);
    myLibrary.push(book2);
    myLibrary.push(book3);

    const div = document.createElement('table');
    div.className = 'books';
    
    div.innerHTML = `
    <tr>
        <th>Book name</th>
        <th>Book author</th>
        <th>Book pages numbers</th>
        <th>Delete button</th>
        <th>Read status</th>
    </tr>
    `
    
    myLibrary.forEach(function(book,index) {
        div.innerHTML += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pagesNumber}</td>
                <td> <button class = "book_delete_button" data-index="${index}">Delete</button> </td>
                <td> <button class = "book_read_button" data-index="${index}">${book.isRead ? "unread" : "read"}</button> </td>
            </tr>
        `;
    });

    document.body.appendChild(div);
}

render();

let bookDeleteButtons = document.querySelectorAll(".book_delete_button");
let bookReadButtons = document.querySelectorAll(".book_read_button");

addNewBookButton.addEventListener( "click", renderAddBookForm );

function renderAddBookForm() {
    
    let displayStatus  = addBookForm.style.display

    if (displayStatus == "none") {
        addBookForm.style.display = "block";
    } else {
        addBookForm.style.display = "none";
    }
}

bookDeleteButtons.forEach((button)=>{
    button.addEventListener("click", deleteBook);
})

bookReadButtons.forEach((button) => {
    button.addEventListener("click", readBookToggle);
})

function deleteBook() {
    let index = event.target.dataset.index;
    myLibrary.splice(index, 1);
    console.log(myLibrary);
}

function readBookToggle() {
    let index = event.target.dataset.index;
    myLibrary[index].isRead = !myLibrary[index].isRead;
    console.log(myLibrary);
}