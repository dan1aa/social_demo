document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");
    const addPostWrapper = document.querySelector(".add_post_wrapper");
    const addPostCloseButton = document.querySelector(".add_post_cancel");
    const addPostButton = document.querySelector(".add_post_button");
    let tabButtonPosts = document.querySelector(".your_posts");
    let tabButtonEdit = document.querySelector(".edit_profile");
    const posts = document.querySelector(".posts");
    const editForm = document.querySelector(".edit_user");
    const likeButton = document.querySelector('.like_button')
  
    function formButtonsOptions(translatePercentage, blurValue, wrapper) {
        wrapper.style.transform = `translateX(${translatePercentage})`;
        wrapper.style.transition = "1s";
        container.style.filter = `blur(${blurValue})`;
    }

    function tabButtonsOptions(hideContent, showContent) {
        showContent.classList.add("tab_active")
        showContent.classList.remove("tab_inactive")
        hideContent.classList.add("tab_inactive")
        hideContent.classList.remove("tab_active")
    }

    addPostButton.onclick = function () {
        formButtonsOptions("0%", '10px', addPostWrapper);
    }
    addPostCloseButton.onclick = function (event) {
        event.preventDefault()
        formButtonsOptions("100%", '0px', addPostWrapper)
    }
    tabButtonPosts.onclick = function(){
        tabButtonsOptions(editForm, posts)
    }
    tabButtonEdit.onclick = function(){
        tabButtonsOptions(posts, editForm)
    }
});