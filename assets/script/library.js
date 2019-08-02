"use strict";

let myLibrary = [];

function Book(title, pagesNumber, author) {
    this.title = title;
    this.pagesNumber = pagesNumber
    this.author = author;
}

Book.prototype = { 
    isRead: false
}

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
    
    console.log(book1.title);

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
    </tr>
    `
    
    myLibrary.forEach(function(book) {
        div.innerHTML += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pagesNumber}</td>
            </tr>
        `;
    });

    document.body.appendChild(div);
}

render();