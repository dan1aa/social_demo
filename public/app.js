document.addEventListener("DOMContentLoaded", function() { 
    const signUpWrapper = document.querySelector(".sign_up_wrapper");
    const logInWrapper = document.querySelector(".log_in_wrapper")
    const registerButton = document.querySelector(".register_text");
    const logInButton = document.querySelector('.popup_button');
    const signUpCancelButton = document.querySelector('.sign_up_close');
    const logInCancelButton = document.querySelector(".log_in_close");
    const container =  document.querySelector(".container");

    function formButtonsOptions(translatePercentage, blurValue, wrapper) {
        wrapper.style.transform = `translateX(${translatePercentage})`;
        wrapper.style.transition = "1s";
        container.style.filter = `blur(${blurValue})`;
    }

    registerButton.onclick = function (){
        if (window.matchMedia("(max-width: 900px)").matches) {
            formButtonsOptions('-25%', '10px', signUpWrapper)
        } else {
            formButtonsOptions('0%', '10px', signUpWrapper)
        }
    }
    logInButton.onclick = function (){
        if (window.matchMedia("(max-width: 900px)").matches) {
            formButtonsOptions('-25%', '10px', logInWrapper)
        } else {
            formButtonsOptions('0%', '10px', logInWrapper)
        }
    }
    signUpCancelButton.onclick = function(event) {
        event.preventDefault()
        if (window.matchMedia("(max-width: 900px)").matches) {
            formButtonsOptions('100%', '0px', signUpWrapper)
        } else {
            formButtonsOptions('100%', '0px', signUpWrapper)
        }
    }
    logInCancelButton.onclick = function (event){
        event.preventDefault()
        if (window.matchMedia("(max-width: 900px)").matches) {
            formButtonsOptions('100%', '0px', logInWrapper)
        } else {
            formButtonsOptions('100%', '0px', logInWrapper)
        }
    }


  });