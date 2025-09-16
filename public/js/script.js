document.addEventListener('DOMContentLoaded', function () {
    const allButtons = document.querySelectorAll('.searchBtn')
    const searchBar = document.querySelector('.searchBar')
    const searchInput = document.getElementById('searchInput')
    const searchClose = document.getElementById('searchClose')

    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', function () {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
            searchInput.focus();
        })
        searchClose.addEventListener('click', function () {
            searchBar.style.visibility = 'hidden';
            searchBar.classList.remove('open');
            this.setAttribute('aria-expanded', 'false');
        })
    }
})
const darktheme = document.getElementById('dark')
const light = document.getElementById('light')
const r = document.querySelector(':root');

let temp = true
darktheme.addEventListener('click', () => {
     light.classList.remove('hide');
  darktheme.classList.add('hide');
    r.style.setProperty('--bg-color', '#1c1c1c');
    r.style.setProperty('--text-color', '#faf5ee');
    document.body.style.backgroundImage = "none";
})
light.addEventListener('click', () => {
    r.style.setProperty('--bg-color', '#faf5ee');   
  r.style.setProperty('--text-color', '#1c1c1c'); 
  light.classList.add('hide');
  darktheme.classList.remove('hide');
    document.body.style.backgroundImage = "url('/images/img-noise.png')";
})