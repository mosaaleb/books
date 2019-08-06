"use strict";

let myLibrary = [];
const addNewBookButton = document.getElementById("add_new_book_button");
const addBookForm = document.getElementById("newBook");

addBookForm.style.display = "none";

function Book(title, pagesNumber, author) {
    this.title = title;
    this.pagesNumber = pagesNumber
    this.author = author;
    this.isRead = false;
}

function addBookToLibrary() {
    const title = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;

    // check for validation
    if (title == "" || author == "" || pages == "" ) {
        showMessage("You need to fill all the fields", "error");
        event.preventDefault();
    } else {
        const book = new Book(title, pages, author);
        myLibrary.push(book);
        addBook(book);
        // showMessage("You need to fill all the fields", "error");

    }


}

function displayBooks() {
    const books = getBooks();

    const table = document.getElementById("books");

    let rowBook;

    books.forEach(function(book,index) {
        rowBook = document.createElement("tr");
        
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

const bookDeleteButtons = document.querySelectorAll(".book_delete_button");
const bookReadButtons = document.querySelectorAll(".book_read_button");

addNewBookButton.addEventListener( "click", renderAddBookForm );

function renderAddBookForm() {
    
    const displayStatus  = addBookForm.style.display

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
    const books = getBooks();
    const index = event.target.dataset.index;
    books.splice(index, 1);
    // console.log(myLibrary);
    localStorage.books = JSON.stringify(books);
    document.location.reload();
}

function readBookToggle() {
    const books = getBooks();
    const index = event.target.dataset.index;
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
    const books = getBooks();
    books.push(book);
    localStorage.books = JSON.stringify(books);
}

// messages 
function showMessage(message, className) {
    const messageContainer = document.createElement('div');
    messageContainer.className = "alert " + className;
    messageContainer.innerHTML = message;
    document.querySelector(".header").appendChild(messageContainer);
}
