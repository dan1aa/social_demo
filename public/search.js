const searchButtonForm = document.querySelector(".search_form")
const searchInput = document.querySelector('.find_input');

searchButtonForm.onsubmit = function() {
    this.setAttribute('action', `/${searchInput.value}`)
}