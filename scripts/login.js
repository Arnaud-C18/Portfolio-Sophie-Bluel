async function login(data, url) {
  const postHttpOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'accept': 'application/json'
    },
    body: JSON.stringify(data)
  }
  let response = await fetch(url, postHttpOptions);
  return response
}

const token = undefined;

document
  .getElementById("connectionForm").onsubmit = async (event) => {
    event.preventDefault()
    let form = document.getElementsByTagName("form")
    let formData = new FormData(form[0])
    const user = {
      "email": formData.get("email"),
      "password": formData.get("password")
    }

    try {
      const response = await login(user, "http://localhost:5678/api/users/login")
        .then(response => response.json())
        .then(data => localStorage.setItem("token", data.token))
        window.location.href = "index.html"
    }

    catch (error) {
      console.log({
        message: error
      })
    }

  }

