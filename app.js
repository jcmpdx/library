const addBook = document.getElementById('addBook');
const bookSVG = document.getElementById('addBookSVG');

const bookShelf = document.getElementById('shelf');

const popupForm = document.getElementById('popupContainer');
const submitButton = document.getElementById('submit');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
let bookTitle, bookAuthor, bookPages;

// mouseover effect on add book icon
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
    createBook(bookAdded);
    popupForm.style.display = 'none';
}
// escape key logic to exit out of popup form goes here? if popupForm.style.display === 'flex', escape key will set popupForm.style.display = 'none'

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

// Notes:

// popup contains inputs for (title, author, pages, toggle button for read T/F, OK and cancel)
// Cancel and/or Escape key deletes popup
// OK creates new Obj passing those input values to Book object
// new Book object is stored in library array
// HTML element id="shelf" for loop of array, creating a book for each item
// need to build out the input form in JS when user clicks on addbook button. toggles display=none and display=block