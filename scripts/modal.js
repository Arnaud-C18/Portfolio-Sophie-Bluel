/*Importation des projets*/
import { works } from "./script.js";

/*Modal galerie*/

let modalContainer = document.querySelector("#modalContainer");

const openGalleryModal = function (e) {
    modalContainer.innerHTML =
        '<aside id="projectModal" class="modal" aria-modal="true" aria-labelledby="modalTitle">'
        + '<div id="modalWrapper" class="modalStop">'
        + '<div id="modalButton">'
        + '<button id="modalClose"><i class="fa-solid fa-xmark"></i></button>'
        + '</div>'
        + '<h1 id="modalTitle">Galerie photo</h1>'
        + '<div id="editionGallery">'
        + '</div>'
        + '<button id="addProject">Ajouter une photo</button>'
        + '<button id="deleteGallery">Supprimer la galerie</button>'
        + '</div>'
        + '</aside>';

    generateProjectsEdition(works);

    document.querySelector("#projectModal").addEventListener("click", closeGalleryModal);
    document.querySelector("#modalWrapper").addEventListener("click", stopPropagation);
    document.querySelector("#modalClose").addEventListener("click", closeGalleryModal);
    document.querySelector("#addProject").addEventListener("click", openAddProjectModal);
    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeGalleryModal(e)
        }
    });
}

const closeGalleryModal = function () {
    document.querySelector("#projectModal").removeEventListener("click", closeGalleryModal);
    document.querySelector("#modalWrapper").removeEventListener("click", stopPropagation);
    document.querySelector("#modalClose").removeEventListener("click", closeGalleryModal);
    document.querySelector("#addProject").removeEventListener("click", openAddProjectModal);
    window.removeEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeGalleryModal(e)
        }
    });
    modalContainer.innerHTML = "";
}

/*Generation des projets dans la modal galerie*/

const generateProjectsEdition = function (works) {
    for (let i = 0; i < works.length; i++) {
        const projets = works[i];
        const editionGallery = document.querySelector("#editionGallery");
        const element = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = projets.imageUrl;
        imageElement.alt = projets.title;
        imageElement.crossOrigin = "anonymous"
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = "éditer";

        editionGallery.appendChild(element);
        element.appendChild(imageElement);
        element.appendChild(captionElement);
    }
}


const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelector("#projectEdition").addEventListener("click", openGalleryModal);

/*Modal ajout de projet*/

const openAddProjectModal = function () {
    modalContainer.innerHTML =
        '<aside id="projectModal" class="modal" aria-labelledby="modalTitle">'
        + '<div id="modalWrapper" class="modalStop">'
        + '<div id="modalButton">'
        + '<button id="returnGallery"><i class="fa-solid fa-arrow-left"></i></button>'
        + '<button id="modalClose"><i class="fa-solid fa-xmark"></i></button>'
        + '</div>'
        + '<h1 id="modalTitle">Ajout photo</h1>'
        + '<form>'
        + '<div id="addImageSection">'
        + '<i class="fa-regular fa-image"></i>'
        + '<label for="file" id="label-file">+ Ajout photo</label>'
        + '<input type="file" id="file">'
        + '<p>jpg.png : 4mo max</p>'
        + '</div>'
        + '<label for="title" id="addImageRessourceLabel">Titre</label>'
        + '<input type="text" name="title" id="addImageTitle" class="addImageRessource">'
        + '<label for="category" id="addImageRessourceLabel">Catégorie</label>'
        + '<input type="list" name="category" id="addImageCategory" class="addImageRessource">'
        + '<button id="addImageValidation">Valider</button>'
        + '</form>'
        + '</div>'
        + '</aside>';

    document.querySelector("#projectModal").addEventListener("click", closeAddProjectModal)
    document.querySelector("#modalWrapper").addEventListener("click", stopPropagation)
    document.querySelector("#returnGallery").addEventListener("click", openGalleryModal)
    document.querySelector("#modalClose").addEventListener("click", closeAddProjectModal)
    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeAddProjectModal(e)
        }
    })
};

const closeAddProjectModal = function (e) {
    document.querySelector("#projectModal").removeEventListener("click", closeAddProjectModal);
    document.querySelector("#modalWrapper").removeEventListener("click", stopPropagation);
    document.querySelector("#returnGallery").removeEventListener("click", openGalleryModal);
    document.querySelector("#modalClose").removeEventListener("click", closeAddProjectModal);
    window.removeEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeAddProjectModal(e)
        }
    });
    modalContainer.innerHTML = "";
}

