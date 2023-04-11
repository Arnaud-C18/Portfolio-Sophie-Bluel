let token = localStorage.getItem("token");
export { token };

/*Elements admin*/
const editItems = document.querySelectorAll(".edition")

/*Dissimulation des elements admin*/

function hideEdition() {
    for (let item of editItems) {
        item.style.display = "none";
    }
}

/*Affichage des elements admin*/

function admin() {
    for (let item of editItems) {
        item.style.display = "flex";
        document.querySelector("#loginButton").style.display = "none";
    };
};

if (token) {
    admin();
} else {
    hideEdition()
}

/*Boutton de déconnexion*/

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

document.querySelector("#logoutButton").addEventListener("click", logout);
