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

function addBookToLibrary() {
    let title = document.getElementById("name").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;

    // check for validation
    if (title == "" || author == "" || pages == "" ) {
        showMessage("You need to fill all the fields", "error");
        event.preventDefault();
    }


    let book = new Book(title, author, pages);
    myLibrary.push(book);
    addBook(book);
    showMessage("You need to fill all the fields", "error");
}

function displayBooks() {
    let books = getBooks();

    const table = document.getElementById("books");

    books.forEach(function(book,index) {
        let rowBook = document.createElement("tr");
        
        rowBook.innerHTML += `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pagesNumber}</td>
            <td> <button class = "btn btn-danger book_delete_button" data-index="${index}">Delete</button> </td>
            <td> <button class = "btn btn-info book_read_button" data-index="${index}">${book.isRead ? "unread" : "read"}</button> </td>
        `;
        table.appendChild(rowBook);
    });

}

displayBooks();

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
    let books = getBooks();
    let index = event.target.dataset.index;
    books.splice(index, 1);
    // console.log(myLibrary);
    localStorage.books = JSON.stringify(books);
    document.location.reload();
}

function readBookToggle() {
    let books = getBooks();
    let index = event.target.dataset.index;
    books[index].isRead = !books[index].isRead;
    localStorage.books = JSON.stringify(books);
    document.location.reload();
    console.log(myLibrary);
}


// Local storage 

function getBooks() {
    let books = [];

    if (localStorage.getItem("books") === null) {
        localStorage.books = JSON.stringify(books);
    } else {
        books = JSON.parse(localStorage.books);
    }

    return books;
}


function addBook(book) {
    let books = getBooks();
    books.push(book);
    localStorage.books = JSON.stringify(books);
}

// messages 
function showMessage(message, className) {
    let messageContainer = document.createElement('div');
    messageContainer.className = "alert " + className;
    messageContainer.innerHTML = message;
    document.querySelector(".header").appendChild(messageContainer);
}
