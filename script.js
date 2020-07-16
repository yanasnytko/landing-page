// Consignes exercices globaux:
// https://quotes-light-api.herokuapp.com/api/comments/

// naviguez jusqu'à votre dossier: exercices landing page, lisez les consignes relatives à l'intégration de votre maquette. Ensuite dans le fichier script.js réalisez les consignes suivantes:

// 1. Définissez une nouvelle variable "myHeaders", contenant un objet global Headers, configuré avec la paire de clé/valeur suivante: "Content-Type": "application/json"
let myHeaders = new Headers({ "Content-Type": "application/json" });

// 2. Créez un formulaire dans votre index.html. Utilisez les balises "form", "label", "input", "button", passez comme ID "my-form" à votre balise form, ensuite pour les attributs "id" de vos input il est OBLIGATOIRE d'utiliser les clés attendues par l'API. C'est à dire une clé "auteur" et une clé "comment". Un de vos deux input aura donc comme valeur à l'attribut "id": "auteur", et le second "id":"comment". Pour finir, donnez comme ID "submit-btn" à votre bouton. Attention pour le bouton, il faut le sortir du formulaire sinon il rafraichit automatiquement la page.
// ok

//3. Vous disposez de vos headers, et de votre formulaire. Maintenant vous allez créer une écoute d'évenement sur le bouton ayant pour id "submit-btn".
document.getElementById("submit-btn").addEventListener("click", () => {

  //4. A l'intérieur de cette écoute, vous allez créer une variable "formAuteurValue", une variable formCommentValue et aller pointer vers les inputs qui ont comme id auteur et comment, ensuite récupérer la valeur de ces input et stockez là dans les variables que vous venez de créer
  let formAuteurValue = document.getElementById("auteur").value;
  /*   if (formAuteurValue === null || formAuteurValue === undefined) {
      formAuteurValue = "Anonyme";
    } else {
      formAuteurValue = document.getElementById("auteur").value;
    } */
  let formCommentValue = document.getElementById("comment").value;
  /*   if (formCommentValue === null || formCommentValue === undefined) {
      formCommentValue = "Anonyme";
    } else {
      formCommentValue = document.getElementById("comment").value;
    } */

  //5. Créez une variable "body" de type objet. Dans cette variable passé comme clé: auteur et comment, ensuite attribuez les valeurs de formAuteurValue et formCommentValue aux clés correspondantes
  let body = {
    "auteur": formAuteurValue,
    "comment": formCommentValue
  };

  //6. Maintenant que nous possédons tout le nécessaire à la rédaction de la méthode fetch(), lançons nous! Créez une méthode fetch qui utilise cette url : https://quotes-light-api.herokuapp.com/api/comments/
  fetch("https://quotes-light-api.herokuapp.com/api/comments/", {

    //7. Passez en deuxième argument un objet contenant la méthode, les headers et le body
    method: "POST",
    headers: myHeaders,

    //8. Pour construire le body: utilisez la méthode JSON.stringify, passez lui la variable "myform" qui récupère les valeurs de votre formulaire
    body: JSON.stringify(body)
  })
});

//9. Testez votre code, ouvrez votre index.html dans votre navigateur, ouvrez l'inspecteur d'élément, allez dans l'onglet "console". Maintenant, remplissez votre formulaire avec les valeurs demandées (l'auteur, et le commentaire). Clickez sur le bouton submit, une erreur est elle renvoyée? Si non allez dans l'onglet network et vérifier le statut de votre requête, si il est défini sur 200 c'est que votre requête a fonctionné!
// ok

//10. Maintenant, créez une méthode fetch qui va aller récupérer toutes les données de l'API, comme la semaine dernière. Elle va vous retourner un tableau d'objets. Pour chaque élément de ce tableau, créez dynamiquement une div pour afficher le commentaire dans votre index.html
fetch("https://quotes-light-api.herokuapp.com/api/comments/", { method: "GET" })
  .then(response => {
    return response.json();
  })
  .then(response => {
    let data = response;
    data.forEach(element => {
      let existingDiv = document.getElementById("balise");
      // Recuperation de l'auteur
      let newAuteurDiv = document.createElement("div");
      newAuteurDiv.setAttribute("class", "auteur");
      document.body.insertBefore(newAuteurDiv, existingDiv.nextElementSibling);
      let auteur = document.createTextNode(element.auteur);
      newAuteurDiv.appendChild(auteur);

      // Recuperation du commentaire
      let newCommentDiv = document.createElement("div");
      newCommentDiv.setAttribute("class", "comment")
      document.body.insertBefore(newCommentDiv, existingDiv.nextElementSibling);
      let comment = document.createTextNode(element.comment);
      newCommentDiv.appendChild(comment);

      // Creation de Delete
      let deleteButton = document.createElement("button");
      document.body.insertBefore(deleteButton, existingDiv.nextElementSibling);
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("class", "delete")
      deleteButton.setAttribute("name", "delete-btn");
      deleteButton.setAttribute("value", element.id);
    })
  })
  .then(response => {
    let deleteTable = document.getElementsByName("delete-btn");
    if (deleteTable.length > 0) {
      deleteTable.forEach(element => {
        element.addEventListener("click", () => {
          let id = element.value;
          fetch(`https://quotes-light-api.herokuapp.com/api/comments/${id}`, { method: "DELETE" })
            .then(response => {
              document.location.reload(true);
            });
        })
      })
    } else {
      console.log('error of Delete button');
    };
  })