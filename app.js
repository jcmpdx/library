const addBook = document.getElementById('addBook');
const bookSVG = document.getElementById('addBookSVG');

const bookReadCounter = document.getElementById('bookReadCount');
const bookUnreadCounter = document.getElementById('bookUnreadCount');
const bookTotal = document.getElementById('bookTotal');

const bookShelf = document.getElementById('shelf');

const popupForm = document.getElementById('popupContainer');
const submitButton = document.getElementById('submit');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readCheckbox = document.getElementById('readcheckbox');
let bookTitle, bookAuthor, bookPages, bookRead;

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
    if (e.keyCode == 27) {
        popupForm.style.display = 'none';
    }
});

// validate required fields are not blank before submit
function requiredInputs() {
    if (titleInput.value == '' || authorInput.value == '' || pagesInput.value <= 0) {
        return false
    } else {
        return true
    }
}

// submit action on popup
submitButton.addEventListener('click', submitClick, false);
function submitClick(event) {
    event.preventDefault();
    bookTitle = titleInput.value;
    bookAuthor = authorInput.value;
    bookPages = pagesInput.value;
    if (readCheckbox.checked == true) {
        bookRead = 'read';
    } else {
        bookRead = 'unread';
    }
    if (requiredInputs()) {
        console.log(bookTitle, bookAuthor, bookPages, bookRead);
        let bookAdded = new Book(bookTitle, bookAuthor, bookPages, bookRead);
        addBookToLibrary(bookAdded);
        renderLibrary();
        popupForm.style.display = 'none';
    } else {
        // nice to have is to instead highlight blank input with red border and block submit button until all fields have values
        alert('Need to fill out title, author, and pages.')
    }
}

// myLibrary array to store books
let myLibrary = [];
const exampleBook1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'read');
const exampleBook2 = new Book('The Bible', 'St. James', 3391, 'not read');
myLibrary.push(exampleBook1, exampleBook2);
function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function renderLibrary() {
    purgeLibrary();
    for (const book of myLibrary) {
        createBook(book);
    }
    updateCounter();
}

function purgeLibrary() {
    while (bookShelf.firstChild) bookShelf.removeChild(bookShelf.firstChild);
}

// Book object constuctor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = function() {
        if (read === 'read') {
            return true
        } else {
            return false
        }
    }
}

// create, style and functions for book DOM
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

    title.textContent = `${Book.title}`;
    author.textContent = `By: ${Book.author}`;
    pages.textContent = `${Book.pages} pages`;
    deleteButton.textContent = 'Delete';

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(deleteButton);
    bookContainer.appendChild(buttonContainer);
    bookShelf.appendChild(bookContainer);

    // onclick needed for read toggle read/unread
    if (Book.read() == true) {
        readButton.textContent = 'Read';
    } else {
        readButton.textContent = 'Unread';
    }

    // delete button removes removes book from myLibrary array
    deleteButton.addEventListener('click', (e) => {
        let nodes = Array.from(e.target.parentNode.parentNode.parentNode.childNodes);
        index = nodes.indexOf(e.target.parentNode.parentNode)
        myLibrary.splice(index, 1);
        renderLibrary();
        console.log(`Deleted '${Book.title}'`);
    });
}

// book counter
function readCount() {
    let t = 0;
    let f = 0;
    for (const book of myLibrary) {
        if (book.read()) {
            t += 1;
        }
    }
    return t;
}

function updateCounter() {
    bookReadCounter.textContent = readCount();
    bookUnreadCounter.textContent = myLibrary.length - readCount();
    bookTotal.textContent = myLibrary.length;
}


// initial render to show exampleBooks
renderLibrary();

// to do:
// Read button functionality on books
// if title, author, or pages are blank, don't allow submit on popup
// Update overall design