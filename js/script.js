var input = document.getElementsByTagName("input");
var subBtn = document.getElementById("frm-sub-btn");
var bookTbody = document.getElementById("book-tbody");
var msg = document.getElementById("msg");
var tableOfBooks = [];
var isValid = false;

subBtn.addEventListener("click", addRecord);

if (localStorage.getItem("allBooks")) {
  tableOfBooks = JSON.parse(localStorage.getItem("allBooks"));
  showInTable();
}

function addRecord(e) {
  e.preventDefault();
  if (isValid) {
    var BookMark = {
      siteName: input[0].value,
      SiteURL: input[1].value,
    };
    tableOfBooks.push(BookMark);
    localStorage.setItem("allBooks", JSON.stringify(tableOfBooks));
  } else {
    msg.classList.replace("d-none", "d-flex");
  }
  showInTable();
  resetForm()
}

function showInTable() {
  var row = "";
  for (var i = 0; i < tableOfBooks.length; i++) {
    row += `<tr>
        <td>${i + 1}</td>
        <td>${tableOfBooks[i].siteName}</td>
        <td><a href="${
          tableOfBooks[i].SiteURL
        }" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</a></td>
        <td><button id="deleteBtn" onclick="deleteRow(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`;
  }
  bookTbody.innerHTML = row;
}

function resetForm() {
  input[0].value = "";
  input[1].value = "";
}

function deleteRow(index) {
  tableOfBooks.splice(index, 1);
  localStorage.setItem("allBooks", JSON.stringify(tableOfBooks));
  showInTable();
}

function validation() {
  var nameRegex = /^(([a-z]{3,})\s?)+$/gi;
  var urlRegex = /^((www\.)[a-z]{2,}|[a-z]{2,})\.(com)$/gi;
  var redName = document.getElementById("redName");
  var greenName = document.getElementById("greenName");
  var redUrl = document.getElementById("redUrl");
  var greenUrl = document.getElementById("greenUrl");

  var isNameValid = nameRegex.test(input[0].value);
  var isurlvalid = urlRegex.test(input[1].value);

  if (input[0].value === "") {
    input[0].classList.remove("isRight");
    input[0].classList.remove("isWrong");
  } else if (isNameValid) {
    input[0].classList.remove("isWrong");
    input[0].classList.add("isRight");
    redName.classList.replace("d-inline", "d-none");
    greenName.classList.replace("d-none", "d-inline");
  } else {
    input[0].classList.remove("isRight");
    input[0].classList.add("isWrong");
    greenName.classList.replace("d-inline", "d-none");
    redName.classList.replace("d-none", "d-inline");
  }

  if (input[1].value === "") {
    input[1].classList.remove("isRight");
    input[1].classList.remove("isWrong");
  } else if (isurlvalid) {
    input[1].classList.remove("isWrong");
    input[1].classList.add("isRight");
    redUrl.classList.replace("d-inline", "d-none");
    greenUrl.classList.replace("d-none", "d-inline");
  } else {
    input[1].classList.remove("isRight");
    input[1].classList.add("isWrong");
    greenUrl.classList.replace("d-inline", "d-none");
    redUrl.classList.replace("d-none", "d-inline");
  }

  isValid = isNameValid && isurlvalid;
  console.log(isValid);
  return isValid;
}

function closeMsg() {
  msg.classList.replace("d-flex","d-none");
}

msg.addEventListener("click", function(e){
  var alertMsg = document.getElementById('alertMsg');
  if(!alertMsg.contains(e.target)){
    msg.classList.add("d-none");
  }
})