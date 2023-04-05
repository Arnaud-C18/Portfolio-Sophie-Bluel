/*Importation des projets*/
import { works } from "./script.js";

/*Modal galerie*/

let modalContainer = document.querySelector("#modalContainer");

const openGalleryModal = function (e) {
    modalContainer.innerHTML =
        '<aside id="projectModal" class="modal" aria-modal="true" aria-labelledby="modalTitle">'
        + '<div id="modalWrapper">'
        + '<div id="modalButton">'
        + '<button id="modalClose"><i class="fa-solid fa-xmark"></i></button>'
        + '</div>'
        + '<h1 id="modalTitle">Galerie photo</h1>'
        + '<div id="editionGallery">'
        + '</div>'
        + '<button id="addProjectButton">Ajouter une photo</button>'
        + '<button id="deleteGalleryButton">Supprimer la galerie</button>'
        + '</div>'
        + '</aside>';

    generateProjectsEdition(works);

    document.querySelector("#projectModal").addEventListener("click", closeGalleryModal);
    document.querySelector("#modalWrapper").addEventListener("click", stopPropagation);
    document.querySelector("#modalClose").addEventListener("click", closeGalleryModal);
    document.querySelector("#addProjectButton").addEventListener("click", openAddProjectModal);
}


const closeGalleryModal = function () {
    document.querySelector("#projectModal").removeEventListener("click", closeGalleryModal);
    document.querySelector("#modalWrapper").removeEventListener("click", stopPropagation);
    document.querySelector("#modalClose").removeEventListener("click", closeGalleryModal);
    document.querySelector("#addProjectButton").removeEventListener("click", openAddProjectModal);
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
        const deleteElement = document.createElement("button");
        deleteElement.className = "imageDeleteButton";
        deleteElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = "éditer";

        editionGallery.appendChild(element);
        element.appendChild(imageElement);
        element.appendChild(deleteElement);
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
        + '<div id="modalWrapper">'
        + '<div id="modalButton">'
        + '<button id="returnGallery"><i class="fa-solid fa-arrow-left"></i></button>'
        + '<button id="modalClose"><i class="fa-solid fa-xmark"></i></button>'
        + '</div>'
        + '<h1 id="modalTitle">Ajout photo</h1>'
        + '<form id="addImageForm">'
        + '<div id="addImageSection">'
        + '<div id="imageInformation">'
        + '<i class="fa-regular fa-image"></i>'
        + '</div>'
        + '<label for="fileInput" id="fileInputLabel">+ Ajout photo</label>'
        + '<input type="file" id="fileInput" accept="image/jpeg, image/png">'
        + '<p>jpg.png : 4mo max</p>'
        + '</div>'
        + '<label for="title" class="addImageRessourceLabel">Titre</label>'
        + '<input type="text" name="title" id="addImageTitle" class="addImageRessource">'
        + '<label for="category" class="addImageRessourceLabel">Catégorie</label>'
        + '<select name="category" class="addImageRessource" id="addImageCategory">'
        + '<option value=""></option>'
        + '<option value="objects">Objets</option>'
        + '<option value="appartements">Appartements</option>'
        + '<option value="hotelsAndRestaurants">Hôtels & restaurants</option>'
        + '</select>'
        + '<button id="addImageValidation">Valider</button>'
        + '</form>'
        + '</div>'
        + '</aside>';

    document.querySelector("#projectModal").addEventListener("click", closeAddProjectModal)
    document.querySelector("#modalWrapper").addEventListener("click", stopPropagation)
    document.querySelector("#returnGallery").addEventListener("click", openGalleryModal)
    document.querySelector("#modalClose").addEventListener("click", closeAddProjectModal)
    document.querySelector("#fileInput").addEventListener("change", previewFile);
    document.querySelector("#addImageForm").addEventListener("change", formValidation)
};

let currentlyDisplayImage = false;
export { currentlyDisplayImage };

const closeAddProjectModal = function (e) {
    document.querySelector("#projectModal").removeEventListener("click", closeAddProjectModal);
    document.querySelector("#modalWrapper").removeEventListener("click", stopPropagation);
    document.querySelector("#returnGallery").removeEventListener("click", openGalleryModal);
    document.querySelector("#modalClose").removeEventListener("click", closeAddProjectModal);
    if (currentlyDisplayImage = false) {
        document.querySelector("#fileInput").removeEventListener("change", previewFile);
    }
    document.querySelector("#addImageForm").removeEventListener("change", formValidation)
    modalContainer.innerHTML = "";
}

/*Prévision de l'image*/

function previewFile() {
    const fileExtensionRegex = /\.(jpe?g|png)$/i;
    if (fileExtensionRegex.test(this.files[0].name)) {
        if ((this.files[0].size) <= 4194304) {
            document.querySelector("#addImageSection").innerHTML = ""
            const file = this.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.addEventListener("load", (event) => displayImage(event, file));
            currentlyDisplayImage = true;
        } else {
            let wrongSize = document.createElement("span");
            wrongSize.className = "wrongFileText"
            wrongSize.innerText = "Cette image est trop grande";
            document.querySelector("#imageInformation").innerHTML = ""
            document.querySelector("#imageInformation").appendChild(wrongSize);
        }
    } else {
        let wrongType = document.createElement("span");
        wrongType.className = "wrongFileText"
        wrongType.innerText = "Ce fichier n'est pas au bon format";
        document.querySelector("#imageInformation").innerHTML = ""
        document.querySelector("#imageInformation").appendChild(wrongType);
    }
}

function displayImage(event, file) {
    const figureElement = document.createElement("figure");
    figureElement.id = "selectedImage";

    const imageElement = document.createElement("img");
    imageElement.src = event.target.result;

    figureElement.appendChild(imageElement);

    document.querySelector("#addImageSection").appendChild(figureElement);
}

/*Validation du formulaire*/

let validForm = false

function formValidation() {
    const validationButton = document.querySelector("#addImageValidation");
    const title = document.querySelector("#addImageTitle").value;
    const category = document.querySelector("#addImageCategory").value;
    const titleRegex = /[A-Za-z.&"',-\d\s]{3,40}/;
    if (currentlyDisplayImage) {
        if (titleRegex.test(title)) {
            if (category != "") {
                validationButton.style.backgroundColor = "#1D6154"
                validForm = true
            }
        }
    }
}