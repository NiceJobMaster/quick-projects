let passwordLength = 12;
let uppercase = true;
let lowercase = true;
let numbers = true;
let symbols = true;

document.getElementById("password-length").addEventListener("input", (e) => {
  passwordLength = e.target.value;
  document.getElementById("password-length-value").innerHTML = passwordLength;
});

document
  .getElementById("uppercase")
  .addEventListener("input", (e) => (uppercase = e.target.checked));

document
  .getElementById("lowercase")
  .addEventListener("input", (e) => (lowercase = e.target.checked));

document
  .getElementById("numbers")
  .addEventListener("input", (e) => (numbers = e.target.checked));

document
  .getElementById("symbols")
  .addEventListener("input", (e) => (symbols = e.target.checked));

document.getElementById("generate-password").addEventListener("click", () => {
  let chars = "";
  let password = "";

  if (uppercase) {
    chars = chars + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (lowercase) {
    chars = chars + "abcdefghijklmnopqrstuvwxyz";
  }

  if (numbers) {
    chars = chars + "0123456789";
  }

  if (symbols) {
    chars = chars + "!@#$%^&*()";
  }

  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  document.getElementById("password").value = password;
});

document.getElementById("copy").addEventListener("click", () => {
  const passwordEl = document.getElementById("password");
  passwordEl.select();
  navigator.clipboard.writeText(passwordEl.value);
});
