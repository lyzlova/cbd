const registration = document.querySelector(".registration");
const crossBtn = document.querySelector(".registration__btn");
const signinBtn = document.querySelector(".form-signin--btn");
const loginBtn = document.querySelector(".form-login--btn");
const linkHeaderLogin = document.querySelector(".info-header__link--login");

linkHeaderLogin.addEventListener("click", openForm);
crossBtn.addEventListener("click", openForm);
signinBtn.addEventListener("click", store);
loginBtn.addEventListener("click", setEnterValue);

function openForm(e) {
  e.preventDefault();
  registration.classList.toggle("is-open");
}

function store(e) {
  e.preventDefault();
  const inputEmail = document.querySelector(".form-signin__email").value;
  const inputPass = document.querySelector(".form-signin__password").value;

  localStorage.setItem("login", inputEmail);
  localStorage.setItem("password", inputPass);

  document.querySelector(".form-signin__email").value = "";
  document.querySelector(".form-signin__password").value = "";
}

function setEnterValue(e) {
  e.preventDefault();
  const enteredName = document.querySelector(".form-login__email").value;
  const enteredPass = document.querySelector(".form-login__password").value;
  const storedName = localStorage.getItem("login");
  const storedPass = localStorage.getItem("password");

  document.querySelector(".form-login__email").value = "";
  document.querySelector(".form-login__password").value = "";

  if (enteredName == storedName && enteredPass == storedPass) {
    alert("You are logged in!");
  } else {
    alert("Username and Password do not match!");
  }
}
