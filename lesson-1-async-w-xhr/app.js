(function() {
  const form = document.querySelector("#search-form");
  const searchField = document.querySelector("#search-keyword");
  let searchedForText;
  const responseContainer = document.querySelector("#response-container");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    responseContainer.innerHTML = "";
    searchedForText = searchField.value;

    // temporarily set searchedForText to 'hippos'
    // const searchedForText = 'hippos';
    const imgRequest = new XMLHttpRequest();
    imgRequest.onload = addImage;
    imgRequest.onerror = function(err) {
      requestError(err, "image");
    };
    imgRequest.open(
      "GET",
      `http://api.unsplash.com/search/photos?page=1&query=${searchedForText}`
    );
    // the request for Unsplash needs an HTTP header to be sent along.
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
    // When using setRequestHeader(), you must call it after calling open(), but before calling send().
    imgRequest.setRequestHeader("Authorization", "Client-ID <your-client-id>");
    imgRequest.send();

    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.onerror = function(err) {
      requestError(err, "articles");
    };
    articleRequest.open(
      "GET",
      `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=<your-API-key-goes-here>`
    );
    articleRequest.send();
  });

  function addImage() {
    // After the request returned successfully,
    // pause inside the function to check out what's been returned by calling "debugger".
    // debugger;
    // in the function, the `this` value is the XHR object.
    // this.responseText holds the response from the server.
    console.log(this.responseText);

    let htmlContent = "";
    const data = JSON.parse(this.responseText);

    if (data && data.results && data.results[0]) {
      const firstImage = data.results[0];
      htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${
        firstImage.user.name
      }</figcaption>
        </figure>`;
    } else {
      htmlContent = `<div class="error-no-image">No images available</div>`;
    }
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    responseContainer.insertAdjacentHTML("beforeend", htmlContent);
  }

  function addArticles() {
    let htmlContent = "";
    const data = JSON.parse(this.responseText);

    if (data.response && data.response.docs && data.response.docs.length > 1) {
      htmlContent =
        "<ul>" +
        data.response.docs
          .map(
            article => `<li class="article">
          <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
          <p>${article.snippet}</p>
        </li>`
          )
          .join("") +
        "</ul>";
    } else {
      htmlContent =
        '<div class="error-no-articles">No articles available</div>';
    }
    responseContainer.insertAdjacentHTML("beforeend", htmlContent);
  }
  function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML(
      "beforeend",
      `<p class="network-warning error-${part}">Oh no! There was an error making a request for the ${part}.</p>`
    );
  }
})();
