//Récupération des données sur les serveur//
const answer = await fetch("http://localhost:5678/api/works");
const works = await answer.json();

//Boucles pour générer les projets//
for (let i = 0; i < works.length; i++) {

    const projets = works[i];
    const gallery = document.querySelector(".gallery");
    const element = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = projets.imageUrl;
    const captionElement = document.createElement("figcaption");
    captionElement.innerText = projets.title;

    gallery.appendChild(element);
    element.appendChild(imageElement);
    element.appendChild(captionElement);
};