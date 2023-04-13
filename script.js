document.addEventListener("DOMContentLoaded", function () {
  password1_1.addEventListener("input", function () {
    if (password1_1.value.length === 1) {
      password1_2.focus();
    }
  });

  password1_2.addEventListener("input", function () {
    if (password1_2.value.length === 1) {
      password1_3.focus();
    }
  });

  password1_3.addEventListener("input", function () {
    if (password1_3.value.length === 1) {
      password1_4.focus();
    }
  });

  const submitButton = document.querySelector(".quiz1__submit");
  submitButton.addEventListener("click", checkPassword);
});

function checkPassword() {
  const password1_1 = document.querySelector("#password1_1").value;
  const password1_2 = document.querySelector("#password1_2").value;
  const password1_3 = document.querySelector("#password1_3").value;
  const password1_4 = document.querySelector("#password1_4").value;

  const desiredPassword = "0315";

  if (
    password1_1 + password1_2 + password1_3 + password1_4 ===
    desiredPassword
  ) {
    const quiz1 = document.querySelector(".quiz1");
    const quiz2 = document.querySelector(".quiz2");

    // apply display: none to quiz1 and display: flex to quiz2
    quiz1.style.display = "none";
    quiz2.style.display = "flex";
  } else {
    alert("비밀번호가 틀렸습니다. 다시 입력해주세요");
    document.querySelector("#password1_1").value = "";
    document.querySelector("#password1_2").value = "";
    document.querySelector("#password1_3").value = "";
    document.querySelector("#password1_4").value = "";
    password1_1.focus();
  }
}
