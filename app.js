const addBook = document.getElementById('addBook');
const bookSVG = document.getElementById('addBookSVG');

const bookShelf = document.getElementById('shelf');

const popupForm = document.getElementById('popupContainer');
const submitButton = document.getElementById('submit');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
let bookTitle, bookAuthor, bookPages;

// eventListeners on add book icon
const mouseOverColor1 = 'tomato';
const mouseOverColor2 = 'white';
addBook.addEventListener('mouseover', () => {
    bookSVG.style.color = mouseOverColor1;
    addBook.style.backgroundColor = mouseOverColor2;
});
addBook.addEventListener('mouseleave', () => {
    bookSVG.style.color = '';
    addBook.style.backgroundColor = '';
});
addBook.addEventListener('click', () => {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    popupForm.style.display = 'flex';
});

// Escape key to close popup
document.addEventListener('keydown', function(e) {
    if(e.keyCode == 27) {
        popupForm.style.display = 'none';
    }
});

// submit action on popup
submitButton.addEventListener('click', submitClick, false);

function submitClick(event) {
    event.preventDefault();
    bookTitle = titleInput.value;
    bookAuthor = authorInput.value;
    bookPages = pagesInput.value;
    console.log(bookTitle, bookAuthor, bookPages);
    let bookAdded = new Book(bookTitle, bookAuthor, bookPages);
    addBookToLibrary(bookAdded);
    renderLibrary();
    popupForm.style.display = 'none';
}

// Book object constuctor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = function() {
        if (read) {
            return 'yes'
        } else {
            return 'no'
        }
    }
}

// myLibrary array
// note: need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
let myLibrary = [];
const exampleBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'true');
myLibrary.push(exampleBook);
function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

// for loop on myLibrary array to generate books in library DOM elements
function renderLibrary() {
    purgeLibrary();
    for (const book of myLibrary) {
        createBook(book);
    }
}

// purge library dom elements before render - only a work-around until i figure out how to only loop thru books in myLibrary and add only the ones not already rendered on page
const shelf = document.getElementById('shelf');
function purgeLibrary() {
    while (shelf.firstChild) shelf.removeChild(shelf.firstChild);
}

// create & style book html parts
let createBook = (Book) => {
    const bookContainer = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const buttonContainer = document.createElement('div');
    const readButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    bookContainer.classList.add('book');
    buttonContainer.classList.add('buttonContainer');
    readButton.classList.add('btn');
    deleteButton.classList.add('btn');
    // onclick needed for read toggle read/unread
    // onclick needed for delete book from library array

    title.textContent = `${Book.title}`;
    author.textContent = `By: ${Book.author}`;
    pages.textContent = `${Book.pages} pages`;
    //add logic for read button or unread button
    deleteButton.textContent = 'Delete';

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(deleteButton);
    bookContainer.appendChild(buttonContainer);
    bookShelf.appendChild(bookContainer);
}

// initial render to show exampleBook
window.onload(renderLibrary());

// Notes:
// popup contains inputs for (title, author, pages, toggle button for read T/F, OK and cancel)
// Cancel and/or Escape key deletes popup
// new Book object is stored in library array
// HTML element id="shelf" for loop of array, creating a book for each item