let displayErrorMessage = false

document.getElementById("connectionForm").onsubmit = async (event) => {
  event.preventDefault()
  let form = document.getElementsByTagName("form")
  let formData = new FormData(form[0])
  let response = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      "email": formData.get("email"),
      "password": formData.get("password")
    })
  })
    .then(response => {
      if (response.status == 401 || response.status == 404) {
        if (!displayErrorMessage) {
          let wrongInfo = document.createElement("p");
          wrongInfo.id = "wrongInfoText"
          wrongInfo.innerText = "E-mail ou mot de passe incorrect";
          const insert = document.querySelector("#connectionForm")
          document.querySelector("#loginSection").insertBefore(wrongInfo, insert);
          displayErrorMessage = true;
        }
      } else if (response.ok) {
        response.json()
          .then(data => localStorage.setItem("token", data.token));
        window.location.href = "index.html"
      }
    })
}