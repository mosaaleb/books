//--------------------------CLASS CODE-----------------------//
class Book {
    constructor(title, author, pagesNumber, isRead = false) {
      this.title = title;
      this.author = author;
      this.pagesNumber = pagesNumber;
      this.isRead = isRead; 
    }
    toggleRead() {
      this.isRead = !this.isRead;
    }
    info() {
    const info = `${this.title} by ${this.author}, ${this.pagesNumber} pages, `;
    return (info + (this.isRead ? "read" : "not read yet"));
    }
  }
  
  class Library {
    constructor(books) {
      // `books` is an Array
      this.books = books;
    }
    addBook(book) {
      this.books.push(book)
    }
    removeBook(index) {
      this.books.splice(index,1)
    }
  }
  
  //---------------------------DOM CODE-----------------------//

  function renderBooks(books) {
    const table = document.getElementById("books");
    while (table.childElementCount > 1 ) {
      table.removeChild(table.lastChild);
    }
    let rowBook;
    books.forEach((book, index) => this.renderBook(book, index));
  }
  function renderBook(book, index) {
    const table = document.getElementById("books");
    let rowBook = document.createElement("tr");
      
    rowBook.innerHTML += `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pagesNumber}</td>
        <td> <button class = "btn btn-danger book_delete_button" data-index="${index}">Delete</button> </td>
        <td> <button class = "btn btn-info book_read_button" data-index="${index}">${book.isRead ? "unread" : "read"}</button> </td>
    `;
    
    table.appendChild(rowBook);

    // ADD EVENT LISTENERS
    const bookDeleteButtons = document.querySelectorAll(".book_delete_button");
    const bookReadButtons = document.querySelectorAll(".book_read_button");
    bookDeleteButtons.forEach((button)=>{
      button.addEventListener("click", deleteBook);
    })
  
    bookReadButtons.forEach((button) => {
      button.addEventListener("click", readToggle);
    })
  }
  function AddBookToggle() {
    const addBookForm = document.getElementById("newBook");
    const displayStatus  = addBookForm.style.display
    if (displayStatus == "none") {
        addBookForm.style.display = "block";
    } else {
        addBookForm.style.display = "none";
    }
  }

  
  //---------------------LOCALSTORAGE CODE--------------------//
  
  // SERIALIZE to localStorage
  function serialize(books) {
    localStorage.books = JSON.stringify(books);
  }
  // DESERIALIZE from localStorage
  function deserialize() {
    if ( localStorage.books == undefined ) {
      const books = [];
      localStorage.books = JSON.stringify(books);
    } else {
      const raw = JSON.parse(localStorage.books);
      const books = raw.map(book => new Book(book.title, book.author,book.pagesNumber, book.isRead));
      const library = new Library(books);
      return library;
    }
  }
  
  //-----------------------CONTROLLER CODE--------------------//
  function main() {
    AddBookToggle();
    const addBook = document.getElementById("add_new_book_button")
    addBook.addEventListener("click", AddBookToggle);
  
    const library = deserialize();
    renderBooks(library.books);  
  }
  function deleteBook() {
    const index = event.target.dataset.index;
    // HANDLE LOCALSTORAGE
    const library = deserialize();
    library.removeBook(index);
    serialize(library.books);
  
    // HANDLE UI
    renderBooks(library.books);
  }
  function readToggle() {
    const index = event.target.dataset.index;
    // HANDLE LOCALSTORAGE
    const library = deserialize();
    library.books[index].toggleRead();
    serialize(library.books);
  
    // HANDLE UI
    renderBooks(library.books);
  }
  function addBookToLibrary() {
    event.preventDefault();
  
    // Get values from form
    const title = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
  
    // check for validation
    if (title == "" || author == "" || pages == "" ) {
      showMessage("You need to fill all the fields", "error");
    } else {
      // HANDLE LOCALSTORAGE
      const book = new Book(title, author, pages);
      const library = deserialize();
      library.addBook(book);
      serialize(library.books);
  
      // HANDLE UI
      renderBook(book, library.books.length - 1);
      AddBookToggle();
    }
  
    // Reset form fields
    document.getElementById("name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
  }
  function showMessage(message, className) {
    const messageContainer = document.createElement('div');
    messageContainer.className = "alert " + className;
    messageContainer.innerHTML = message;
    document.querySelector(".header").appendChild(messageContainer);
  }
  
  
  main();