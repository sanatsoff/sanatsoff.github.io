// Bookmark Manager Functionality

// Replace with your GitHub token
const GITHUB_TOKEN = 'your_github_token_here';

// Variables
let bookmarks = [];
const bookmarksContainer = document.getElementById('bookmarks');

// Load bookmarks from local storage or GitHub
function loadBookmarks() {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
        bookmarks = JSON.parse(storedBookmarks);
    } else {
        fetchBookmarksFromGitHub();
    }
    renderBookmarks();
}

// Fetch bookmarks from GitHub API
async function fetchBookmarksFromGitHub() {
    const response = await fetch('https://api.github.com/repos/sanatsoff/sanatsoff.github.io/contents/bookmarks.json',{ headers: { 'Authorization': `token ${GITHUB_TOKEN}` }});
    if (response.ok) {
        const data = await response.json();
        bookmarks = JSON.parse(atob(data.content));
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    renderBookmarks();
}

// Save bookmarks to GitHub
async function saveBookmarksToGitHub() {
    const content = btoa(JSON.stringify(bookmarks));
    await fetch('https://api.github.com/repos/sanatsoff/sanatsoff.github.io/contents/bookmarks.json', {
        method: 'PUT',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Updated bookmarks',
            content,
            sha: 'your_file_sha_here' // Replace this with the current file SHA
        })
    });
}

// Render bookmarks
function renderBookmarks() {
    bookmarksContainer.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
        const bookmarkElement = document.createElement('div');
        bookmarkElement.innerHTML = `<a href='${bookmark.url}'>${bookmark.title}</a>`;
        bookmarksContainer.appendChild(bookmarkElement);
    });
}

// Add a new bookmark
function addBookmark(title, url) {
    bookmarks.push({ title, url });
    saveBookmarksToGitHub();
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
}

// Edit a bookmark
function editBookmark(index, newTitle, newUrl) {
    bookmarks[index] = { title: newTitle, url: newUrl };
    saveBookmarksToGitHub();
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
}

// Delete a bookmark
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    saveBookmarksToGitHub();
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
}

// Export bookmarks
function exportBookmarks() {
    const blob = new Blob([JSON.stringify(bookmarks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Import bookmarks
function importBookmarks(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        bookmarks = JSON.parse(event.target.result);
        saveBookmarksToGitHub();
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        renderBookmarks();
    };
    reader.readAsText(file);
}

// Initial load
loadBookmarks();