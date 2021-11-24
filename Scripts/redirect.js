//IDEA
import Router from "./router";

const params = new URLSearchParams()
params.append("redirect", location.href.replace(location.origin,''));
Router.goToUrlNoHistory(window.location.origin + "index.html?redirect=" + params.toString());
