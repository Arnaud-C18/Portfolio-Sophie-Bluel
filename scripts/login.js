/*const login = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify ({
        "email": document.querySelector("#connectionEmail"),
        "password": document.querySelector("#password")
    })
  });*/

  async function loginFetch(data, url) {
    const monHeader = new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'accept': 'application/json'
    }) 
    const httpOptions = {
      method : "POST",
      headers : monHeader,
      body : JSON.stringify(data)
    }
    const reponse = await fetch(url, httpOptions)
    return reponse
  }



document
    .getElementById("connectionForm").onsubmit = async (event) => {
      event.preventDefault()
      let form = document.getElementsByTagName("form")
      let formData = new FormData(form[0])
      const user = {
        "email" : formData.get("email"),
        "password" : formData.get("password")
      }
      console.log(user)
      
      try {
        const reponse = await loginFetch(user, "http://localhost:5678/api/users/login")
        console.log(reponse)
      } catch (error) {
        console.log({
          message : error
        })
      }
    }