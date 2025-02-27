import { displayMessage } from "./displayMessage.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const desktopLoginLink = document.getElementById("desktopLoginLink");
  const mobileLoginLink = document.getElementById("mobileLoginLink");

  const isUserLoggedIn = localStorage.getItem("name");

  if (isUserLoggedIn) {
    updateLoginLinks("Log Out", "#");
  }
  [desktopLoginLink, mobileLoginLink].forEach((link) => {
    link.addEventListener("click", (event) => {
      if (isUserLoggedIn) {
        event.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
          displayMessage("#message", "warning", "Logging out...");
          logOutUser();
        }
      } else {
        displayMessage(
          "#message",
          "warning",
          "You are not logged in. Please log in. Test Enviroment"
        );
        link.href = "./account/login.html";
      }
    });
  });

  const depth = window.location.pathname.split("/").length - 2;

  const basePath =
    depth > 0
      ? "../".repeat(depth) + "account/login.html"
      : "account/login.html";

  function logOutUser() {
    setTimeout(() => {
      localStorage.clear();
      updateLoginLinks("Log In", "./account/login.html");
      window.location.href = basePath;
    }, 1000);
  }

  function updateLoginLinks(text, href) {
    desktopLoginLink.textContent = text;
    desktopLoginLink.href = href;

    mobileLoginLink.textContent = text;
    mobileLoginLink.href = href;
  }
});
