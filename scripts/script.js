//Récupération des données sur les serveur//
async function getData (){
    const askWorks = await fetch("http://localhost:5678/api/works");
    return askWorks.json();
}

const works = await getData();

export { getData, generateWorks };

//Boucles pour générer les projets//
async function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const project = works[i];
        const gallery = document.querySelector("#gallery");
        const element = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        imageElement.alt = project.title;
        imageElement.crossOrigin = "anonymous"
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = project.title;

        gallery.appendChild(element);
        element.appendChild(imageElement);
        element.appendChild(captionElement);
    }
}

//Première génération//

generateWorks(works);

/*Filtre des projets*/

document.querySelectorAll(".filter").forEach(el => el.addEventListener("click", function (e) {
    let filterId = e.target.value;
    if (filterId == "null") {
        const worksFiltered = works.filter(function (work) {
            return work.categoryId !== null;
        });
        document.querySelector("#gallery").innerHTML = "";
        generateWorks(worksFiltered);
    } else {
        const worksFiltered = works.filter(function (work) {
            return work.categoryId == filterId;
        })
        document.querySelector("#gallery").innerHTML = "";
        generateWorks(worksFiltered);
    };
}));
