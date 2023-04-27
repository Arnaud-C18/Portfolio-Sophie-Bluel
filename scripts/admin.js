
let token = localStorage.getItem("token");
export { token };

/*Elements admin*/
const editItems = document.querySelectorAll(".edition")


/*Affichage des elements admin*/

function admin() {
    document.querySelector("#editionBar").style.display = "flex"
    for (let item of editItems) {
        item.style.display = "flex";
    };
    document.querySelector("#loginButton").style.display = "none";
    document.querySelector("#logoutButton").addEventListener("click", logout);
};

if (token) {
    admin();
};

/*Boutton de déconnexion*/

function logout() {
    localStorage.removeItem("token");
    token = undefined;
    window.location.href = "index.html";
}

