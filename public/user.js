document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");
    const addPostWrapper = document.querySelector(".add_post_wrapper");
    const addPostCloseButton = document.querySelector(".add_post_cancel");
    const addPostButton = document.querySelector(".add_post_button");
    let tabButtonPosts = document.querySelector(".your_posts");
    let tabButtonEdit = document.querySelector(".edit_profile");
    const posts = document.querySelector(".posts");
    const editForm = document.querySelector(".edit_user");
    //
    const settingsWrapper= document.querySelector(".settings_wrapper");
    const settingsButton = document.querySelector(".settings_button");
    const settingsCancel = document.querySelector(".settings_cancel");
    const settingsEditInfo = document.querySelector(".edit_info_button");
    const settingsChangeInfo = document.querySelector("change_info_button")
    const editSettingsWrapper = document.querySelector(".edit_settings_wrapper")
    const editSettingsCancel = document.querySelector(".edit_settings_cancel");
    const changeSettingsInfo = document.querySelector(".change_info_button")
    const changeSettingsWrapper = document.querySelector(".change_settings_wrapper")
    const changeSettingsCancel = document.querySelector(".change_settings_cancel") 
    //
  
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
    settingsButton.onclick = function(){
        formButtonsOptions("0px", "10px", settingsWrapper);
    }
    settingsCancel.onclick = function(event){
        event.preventDefault()
        formButtonsOptions("100%", "0px", settingsWrapper)
    }
    settingsEditInfo.onclick = function(){
        formButtonsOptions("0px", "10px", editSettingsWrapper);
        formButtonsOptions("100%", "10px", settingsWrapper)
    }
    editSettingsCancel.onclick = function(event){
        event.preventDefault()
        formButtonsOptions("100%", "0px", editSettingsWrapper);
    }
    changeSettingsInfo.onclick = function(){
        formButtonsOptions("100%", "0px", settingsWrapper)
        formButtonsOptions("0px", "10px", changeSettingsWrapper)
    }
    changeSettingsCancel.onclick = function(event){
        event.preventDefault()
        formButtonsOptions("100%", "0px", changeSettingsWrapper)
    }
});