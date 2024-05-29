const inputName = document.getElementById("exampleFormControlInput1");
const inputPhone = document.getElementById("exampleFormControlInput2");
const textarea = document.getElementById("exampleFormControlTextarea1");

let personName = "";
inputName.addEventListener("input", (event) => {
  personName = event.target.value;
});
let phone = "";
inputPhone.addEventListener("input", (event) => {
  phone = event.target.value;
});
let description = "";
textarea.addEventListener("input", (event) => {
  description = event.target.value;
});

const validError = document.createElement("div");

const container = document.querySelector(".container");

const btn = document.querySelector(".btn-primary");
btn.addEventListener("click", (event) => {
  const newNote = {
    personName,
    phone,
    description,
    date: currentDate(),
  };
  console.log(newNote);
  event.target.disabled = true;

  addNote(newNote)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        validError.className = "alert alert-danger";
        validError.textContent = "Заполните поля";
        container.before(validError);
        event.target.disabled = false;
      } else {
        container.before(validError);
        validError.className = "alert alert-success";
        validError.textContent = "Данные успешно отправлены";
        event.target.disabled = false;
        inputName.value = "";
        inputPhone.value = "";
        textarea.value = "";
      }
    });
});

async function addNote(newNote) {
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      personName: newNote.personName,
      phone: newNote.phone,
      description: newNote.description,
      date: newNote.date,
    }),
  });
}

const currentDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let time = `${today.getHours()}:${today.getMinutes()}`;
  let yyyy = today.getFullYear();
  if (time.length === 4) {
    time = "0" + time;
  }
  return mm + "-" + dd + "-" + yyyy + " " + time;
};
