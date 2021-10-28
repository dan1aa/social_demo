const followButton = document.querySelector('.follow_button')
const unfollowButton = document.querySelector('.unfollow_button')

function followButtonsOptions(thisButton, oppositeButton, displayForThis, displayForOpposite) {
    thisButton.style.display = displayForThis
    oppositeButton.style.display = displayForOpposite
}

followButton.onclick = function(event) {
    followButtonsOptions(followButton, unfollowButton, 'none', 'flex')
}

unfollowButton.onclick = function(event) {
    followButtonsOptions(unfollowButton, followButton, 'none', 'flex')
}

