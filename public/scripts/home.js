// const { Json } = require("sequelize/types/lib/utils");

const box = document.getElementById("cards");

console.log(userApp);

document.querySelector("form").addEventListener("submit", (event) => {
  box.innerHTML = ` 
                <div id="contenedor_carga">
                      <h2 id="loadingText">Cargando...</h2>
                      <div id="carga"></div>
                </div>
  `; //Se genera el spinner cada vez que llamamos al formulario
  event.preventDefault();

  const paintResults = () => {
    fetch("/scraping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: search.value }),
    })
      .then((Data) => Data.json())
      .then((scrapData) => {
        document.getElementById("cards").innerHTML = "";
        scrapData.map((offer) => {


          box.innerHTML += `
                          <section class="section2">
                              <article class="job1">
                                  <div class="job_header">
                                      <h2 class="jobTitle">${offer.jobTitle}</h2><i class="fa fa-heart" id="fav_btn_empty"></i>
                                  </div>
                                  <div class="separator"></div>
                                  <div class="job_body"><img class="job_img" src="/assets/img/default_img.jpg" alt="">
                                      <p class="job_description">${offer.jobDescription}</p>
                                  </div>
                                  <div class="separator"></div>
                                  <div class="job_footer">
                                      <p class="job_price">${offer.jobBudget}</p><button class="see_more_btn" href="${offer.jobUrl}">See More</button>
                                  </div>
                              </article>
                              <input type="hidden" value=${offer._id} class="hiddenInp">
                          </section>
                          `;
        });
      })
      .then(() => {
        document.querySelectorAll('.see_more_btn').forEach(item => {
          item.addEventListener('click', () => {
            /*
            console.log(item);
            console.log(item.parentNode.parentNode);
            console.log(item.parentNode.parentNode.childNodes[1].childNodes[1].innerText); // titlte
            console.log(item.parentNode.parentNode.childNodes[5].childNodes[0].currentSrc); //Imagen empresa
            console.log(item.parentNode.parentNode.childNodes[5].childNodes[2].innerText); //Descripcion
            console.log(item.parentNode.parentNode.childNodes[9].childNodes[1].innerText); //more info
            */

            let title = item.parentNode.parentNode.childNodes[1].childNodes[1].innerText;
            let img = item.parentNode.parentNode.childNodes[5].childNodes[0].currentSrc
            let description = item.parentNode.parentNode.childNodes[5].childNodes[2].innerText
            let moreInfo = item.parentNode.parentNode.childNodes[9].childNodes[1].innerText
            let user_id = userApp;
            
            const objJob = { title , img , description, moreInfo, user_id }

            console.log(objJob);

            fetch('/api/addFav', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(objJob)
            })
            
          })
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  paintResults();
});
