document.addEventListener('DOMContentLoaded',function(){
    const allButtons = document.querySelectorAll('.searchBtn')
    const searchBar = document.querySelector('.searchBar')
    const searchInput = document.getElementById('searchInput')
    const searchClose = document.getElementById('searchClose')

    for(var i = 0; i < allButtons.length;i++){
        allButtons[i].addEventListener('click',function(){
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded','true');
            searchInput.focus();
        })
        searchClose.addEventListener('click',function(){
            searchBar.style.visibility = 'hidden';
            searchBar.classList.remove('open');
            this.setAttribute('aria-expanded','false');     
        })
    }
})
const darktheme = document.getElementById('dark')
const light = document.getElementById('light')
const temp=true
darktheme.addEventListener('click',()=>{
    if(temp){
        document.body.style.background = "black"
        document.body.style.color="white"
        document.light.classList.remove('hide')
        document.darktheme.classList.add('hide')
        temp=false
    }

})