/*Importation des projets*/
import { token } from "./admin.js"
import { getData, generateWorks } from "./script.js"
const works = await getData();


/*Modal galerie*/

let modalContainer = document.querySelector("#modalContainer");
let currentlyOpenModal = null;

const openGalleryModal = async function () {
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
    generateProjectsEdition(await getData());

    document.querySelector("#projectModal").addEventListener("click", closeGalleryModal);
    document.querySelector("#modalWrapper").addEventListener("click", stopPropagation);
    document.querySelector("#modalClose").addEventListener("click", closeGalleryModal);
    //Suppression d'un élément//
    document.querySelectorAll(".deleteElementButton").forEach(el => el.addEventListener("click", async function (e) {
        if (confirm("Voulez vous supprimer cet élément?") == true) {
            let buttonId = e.srcElement.parentElement.attributes.value.value;
            let requestLink = "http://localhost:5678/api/works/" + buttonId;
            await fetch(requestLink, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                method: 'delete',
            });
            try {
                closeGalleryModal();
                openGalleryModal();
                document.querySelector("#gallery").innerHTML = "";
                generateWorks(await getData());
            }
            catch(error) {
                console.log(error);
            }}
        }));
    document.querySelector("#addProjectButton").addEventListener("click", openAddProjectModal);
    document.querySelector("#deleteGalleryButton").addEventListener("click", deleteAll);

    currentlyOpenModal = "galleryModal"
}


const closeGalleryModal = function () {
    document.querySelector("#projectModal").removeEventListener("click", closeGalleryModal);
    document.querySelector("#modalWrapper").removeEventListener("click", stopPropagation);
    document.querySelector("#modalClose").removeEventListener("click", closeGalleryModal);
    document.querySelectorAll(".deleteElementButton").forEach(el => el.removeEventListener("click", async function(e){}));
    document.querySelector("#addProjectButton").removeEventListener("click", openAddProjectModal);
    document.querySelector("#deleteGalleryButton").removeEventListener("click", deleteAll);
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
        const elementButton = document.createElement("div");
        elementButton.className = "elementButton";
        const moveElementButton = document.createElement("button");
        moveElementButton.className = "moveElementButton";
        moveElementButton.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>'
        const deleteElementButton = document.createElement("button");
        deleteElementButton.className = "deleteElementButton";
        deleteElementButton.value = projets.id;
        deleteElementButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = "éditer";

        editionGallery.appendChild(elementContainer);
        elementContainer.appendChild(elementFigure);
        elementFigure.appendChild(elementImage);
        elementContainer.appendChild(elementButton);
        elementButton.appendChild(moveElementButton);
        elementButton.appendChild(deleteElementButton);
        elementFigure.appendChild(captionElement);
    };
};


const stopPropagation = function (e) {
    e.stopPropagation()
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
        + '<form id="addImageForm" >'
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
        + '<input type="submit" id="sendFormButton" value="Envoyer">'
        + '</form>'
        + '</div>'
        + '</aside>';

    document.querySelector("#projectModal").addEventListener("click", closeAddProjectModal);
    document.querySelector("#modalWrapper").addEventListener("click", stopPropagation);
    document.querySelector("#returnGallery").addEventListener("click", openGalleryModal);
    document.querySelector("#modalClose").addEventListener("click", closeAddProjectModal);
    document.querySelector("#fileInput").addEventListener("change", previewFile);
    document.querySelector("#addImageForm").addEventListener("change", formValidation);
    //Ajout de projet//
    document.querySelector("#addImageForm").onsubmit = async function (e) {
        e.preventDefault();
        if (validForm) {
            const formTitle = document.querySelector("#addImageTitle").value;
            const image = document.querySelector("#fileInput").files[0];
            const formCategory = document.querySelector("#addImageCategory").value;
            const data = new FormData();
            data.append("title", formTitle);
            data.append("image", image, image.name);
            data.append("category", formCategory);
            let response = await fetch("http://localhost:5678/api/works", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                ContentType: 'multipart/form-data',
                method: 'post',
                body: data,
            });
            try {
                closeAddProjectModal();
                openGalleryModal();
                document.querySelector("#gallery").innerHTML = "";
                generateWorks(await getData());
            }
            catch(error) {
                console.log(error);
            }
        }
    };

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
};

//Suppression de tout les projets//

const deleteAll = async function() {
    if (confirm("Voulez vous supprimer l'intégralité de la galerie?") == true) {
        for (let i = 0; i < works.length; i++) {
            let deleteProject = works[i];
            let projectId = deleteProject.id;
            let requestLink = "http://localhost:5678/api/works/" + projectId;
            await fetch(requestLink, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                method: 'delete',
            });
        };
        try {
            closeGalleryModal();
            openGalleryModal();
            document.querySelector("#gallery").innerHTML = "";
            generateWorks(await getData());
        }
        catch(error) {
            console.log(error);
        };
    };
};
