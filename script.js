// bookmark.js

// Bookmark management functionality
class BookmarkManager {
    constructor() {
        this.bookmarks = this.loadBookmarks();
    }

    loadBookmarks() {
        const bookmarks = localStorage.getItem('bookmarks');
        return bookmarks ? JSON.parse(bookmarks) : [];
    }

    saveBookmarks() {
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }

    addBookmark(title, url) {
        const icon = this.fetchSiteIcon(url);
        this.bookmarks.push({ title, url, icon });
        this.saveBookmarks();
    }

    editBookmark(index, newTitle, newUrl) {
        const icon = this.fetchSiteIcon(newUrl);
        this.bookmarks[index] = { title: newTitle, url: newUrl, icon };
        this.saveBookmarks();
    }

    deleteBookmark(index) {
        this.bookmarks.splice(index, 1);
        this.saveBookmarks();
    }

    fetchSiteIcon(url) {
        return `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
    }

    toggleView(view) {
        // Implement logic to toggle between list and grid view
        const viewContainer = document.getElementById('bookmarkContainer');
        if (view === 'list') {
            viewContainer.classList.add('list-view');
            viewContainer.classList.remove('grid-view');
        } else {
            viewContainer.classList.add('grid-view');
            viewContainer.classList.remove('list-view');
        }
    }
}

const bookmarkManager = new BookmarkManager();

// Example usage:
// bookmarkManager.addBookmark('Google', 'https://www.google.com');
// bookmarkManager.editBookmark(0, 'Google Search', 'https://www.google.com');
// bookmarkManager.deleteBookmark(0);