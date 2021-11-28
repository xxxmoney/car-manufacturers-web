import Router from "/Scripts/router.js"

//Redirect to index.html with a redirect query param.
const params = new URLSearchParams();
params.append("redirect", location.href.replace(location.origin,''));
Router.goToUrlNoHistory(window.location.origin + "/index.html?" + params.toString());
