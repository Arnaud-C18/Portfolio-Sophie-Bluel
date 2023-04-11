let token = localStorage.getItem("token")
console.log(token)

if (token != null ) {
    document.querySelectorAll(".edition").style.display = "none";
} else {
    document.querySelectorAll(".edition").style.display = "flex";
};

