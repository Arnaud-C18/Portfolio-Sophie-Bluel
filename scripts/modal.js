/*Importation des projets*/
import { works } from "./script.js";
import { token } from "./admin.js"

/*Modal galerie*/

let modalContainer = document.querySelector("#modalContainer");
let currentlyOpenModal = null;

const openGalleryModal = function () {
    if (currentlyOpenModal = "addProjectModal") {
        closeAddProjectModal
    };
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
    document.querySelectorAll(".deleteElementButton").forEach(el => el.addEventListener("click", deleteElement));
    document.querySelector("#addProjectButton").addEventListener("click", openAddProjectModal);

    currentlyOpenModal = "galleryModal"
}


const closeGalleryModal = function () {
    document.querySelector("#projectModal").removeEventListener("click", closeGalleryModal);
    document.querySelector("#modalWrapper").removeEventListener("click", stopPropagation);
    document.querySelector("#modalClose").removeEventListener("click", closeGalleryModal);
    document.querySelectorAll(".deleteElementButton").forEach(el => el.removeEventListener("click", deleteElement));
    document.querySelector("#addProjectButton").removeEventListener("click", openAddProjectModal);
    modalContainer.innerHTML = "";
    currentlyOpenModal = null;
};

/*Generation des projets dans la modal galerie*/

const generateProjectsEdition = function (works) {
    for (let i = 0; i < works.length; i++) {
        const projets = works[i];
        const editionGallery = document.querySelector("#editionGallery");
        const elementContainer = document.createElement("div");
        elementContainer.className = "elementContainer"
        const elementFigure = document.createElement("figure");
        const elementImage = document.createElement("img");
        elementImage.src = projets.imageUrl;
        elementImage.alt = projets.title;
        elementImage.crossOrigin = "anonymous"
        const deleteElementButton = document.createElement("button");
        deleteElementButton.className = "deleteElementButton";
        deleteElementButton.value = projets.id;
        deleteElementButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = "éditer";

        editionGallery.appendChild(elementContainer);
        elementContainer.appendChild(elementFigure);
        elementFigure.appendChild(elementImage);
        elementContainer.appendChild(deleteElementButton);
        elementFigure.appendChild(captionElement);
    };
};


const stopPropagation = function (e) {
    e.stopPropagation()
};

const preventDefault = function (e) {
    e.preventDefault()
};

/*Suppression d'élément*/

const deleteElement = function (e) {
    let buttonId = e.srcElement.offsetParent.value;
    let requestLink = "http://localhost:5678/api/works/" + buttonId;
    fetch(requestLink, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        method: 'delete',
    })
    openGalleryModal;
};


document.querySelector("#projectEdition").addEventListener("click", openGalleryModal);

/*Modal ajout de projet*/

const openAddProjectModal = function () {
    closeGalleryModal
    modalContainer.innerHTML =
        '<aside id="projectModal" class="modal" aria-labelledby="modalTitle">'
        + '<div id="modalWrapper">'
        + '<div id="modalButton">'
        + '<button id="returnGallery"><i class="fa-solid fa-arrow-left"></i></button>'
        + '<button id="modalClose"><i class="fa-solid fa-xmark"></i></button>'
        + '</div>'
        + '<h1 id="modalTitle">Ajout photo</h1>'
        + '<form id="addImageForm">'
        + '<div id="imageSection">'
        + '<div id="addImageSection">'
        + '<div id="imageInformation">'
        + '<i class="fa-regular fa-image"></i>'
        + '</div>'
        + '<label for="fileInput" id="fileInputLabel">+ Ajout photo</label>'
        + '<input type="file" id="fileInput" accept="image/jpeg, image/png">'
        + '<p>jpg.png : 4mo max</p>'
        + '</div>'
        + '<div id="showImageSection">'
        + '<figure>'
        + '<img src="" id="showImage">'
        + '</figure>'
        + '</div>'
        + '</div>'
        + '<label for="title" class="addImageRessourceLabel">Titre</label>'
        + '<input type="text" name="title" id="addImageTitle" class="addImageRessource">'
        + '<label for="category" class="addImageRessourceLabel">Catégorie</label>'
        + '<select name="category" class="addImageRessource" id="addImageCategory">'
        + '<option value=""></option>'
        + '<option value="1">Objets</option>'
        + '<option value="2">Appartements</option>'
        + '<option value="3">Hôtels & restaurants</option>'
        + '</select>'
        + '<button id="sendFormButton">Valider</button>'
        + '</form>'
        + '</div>'
        + '</aside>';

    document.querySelector("#projectModal").addEventListener("click", closeAddProjectModal);
    document.querySelector("#modalWrapper").addEventListener("click", stopPropagation);
    document.querySelector("#returnGallery").addEventListener("click", openGalleryModal);
    document.querySelector("#modalClose").addEventListener("click", closeAddProjectModal);
    document.querySelector("#fileInput").addEventListener("change", previewFile);
    document.querySelector("#addImageForm").addEventListener("change", formValidation);
    document.querySelector("#sendFormButton").addEventListener("click", sendForm);
    document.querySelector("#sendFormButton").addEventListener("click", preventDefault);


    currentlyOpenModal = "addProjectModal"
};

let currentlyDisplayImage = false;

const closeAddProjectModal = function () {
    document.querySelector("#projectModal").removeEventListener("click", closeAddProjectModal);
    document.querySelector("#modalWrapper").removeEventListener("click", stopPropagation);
    document.querySelector("#returnGallery").addEventListener("click", openGalleryModal);
    document.querySelector("#modalClose").removeEventListener("click", closeAddProjectModal);
    if (currentlyDisplayImage = false) {
        document.querySelector("#fileInput").removeEventListener("change", previewFile);
    }
    document.querySelector("#addImageForm").removeEventListener("change", formValidation)
    document.querySelector("#sendFormButton").removeEventListener("click", sendForm)
    document.querySelector("#sendFormButton").removeEventListener("click", preventDefault);
    modalContainer.innerHTML = "";
    currentlyOpenModal = null;
}

/*Prévision de l'image*/

function previewFile() {
    const fileExtensionRegex = /\.(jpe?g|png)$/i;
    if (fileExtensionRegex.test(this.files[0].name)) {
        if ((this.files[0].size) <= 4194304) {
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

function displayImage(e) {
    document.querySelector("#addImageSection").style.display = "none";
    document.querySelector("#showImageSection").style.display = "flex";
    document.querySelector("#showImage").src = e.target.result;
}

/*Validation du formulaire*/

let validForm = false

function formValidation() {
    const validationButton = document.querySelector("#sendFormButton");
    const title = document.querySelector("#addImageTitle").value;
    const category = document.querySelector("#addImageCategory").value;
    const titleRegex = /[A-Za-z.&"',-\d\s]{3,40}/;
    if (currentlyDisplayImage) {
        if (titleRegex.test(title)) {
            if (category != "") {
                validationButton.style.backgroundColor = "#1D6154"
                validForm = true
            } else {
                validationButton.style.backgroundColor = "#A7A7A7"
                validForm = false
            }
        } else {
            validationButton.style.backgroundColor = "#A7A7A7"
            validForm = false
        }
    } else {
        validationButton.style.backgroundColor = "#A7A7A7"
        validForm = false
    }
}

/*Envoie du formulaire*/

const sendForm = function () {
    if (validForm) {
        const formTitle = document.querySelector("#addImageTitle").value;
        console.log(formTitle);
        const image = document.querySelector("#fileInput").files[0];
        console.log(image);
        const formCategory = document.querySelector("#addImageCategory").value
        console.log(formCategory);
        const data = new FormData();
        data.append("title", formTitle);
        data.append("image", image, image.name);
        data.append("categoryId", formCategory);
        fetch("http://localhost:5678/api/works", {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            ContentType: 'multipart/form-data',
            method: 'post',
            body: data,
        });
    }
}
