async function loginFetch(data, url) {
  const myHeader = new Headers({
    'Content-Type': 'application/json;charset=utf-8',
    'accept': 'application/json'
  })
  const postHttpOptions = {
    method: "POST",
    headers: myHeader,
    body: JSON.stringify(data)
  }
  const reponse = await fetch(url, postHttpOptions)
  return reponse
}



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
      const response = await loginFetch(user, "http://localhost:5678/api/users/login")
        .then(response => response.json())
        .then(data => console.log(data))
    }
    catch (error) {
      console.log({
        message: error
      })
    }
  }