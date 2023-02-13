let token = localStorage.getItem("token")
console.log(token)

/*Affichage des éléments admin*/

function admin() {
    document.querySelector("#editionBar").style.display = "flex";
    document.querySelector("#pictureEdition").style.display = "flex";
    document.querySelector("#introEdition").style.display = "flex";
    document.querySelector("#projectEdition").style.display = "flex";
    document.querySelector("#loginButton").style.display = "none";
    document.querySelector("#logoutButton").style.display = "flex";
};

if (token != null ) {
    admin();
};

/*Boutton de déconnexion*/

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

document.querySelector("#logoutButton").addEventListener("click", logout);
