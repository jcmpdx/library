const addBook = document.getElementById('addBook');
const bookSVG = document.getElementById('addBookSVG');

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