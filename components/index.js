let doc = document.getElementById("root");
const  result = []
async function getData() {
  await fetch("http://localhost:3000")
    .then(res => {
      res.json().then(data => result.push(...data));
    })
    .catch(err => console.log(err));
  console.log(result);
  return result;
}

function post() {
  const formData = handleChange();
  console.log(formData);
  fetch("http://localhost:3000", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(formAndTabel());
}

function handleChange() {
  const text = document.getElementById("text").value;
  return {
    id: Date.now(),
    text: text
  };
}

function formTodo() {
  return `<div>
    <label for="text">Text</label>
    <input type="text" name="text" onchange=handleChange() id="text">
    <button onclick=post()>Create</button>
  </div>`;
}

function tbHeader() {
  return `
    <tr>
      <th>Text</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>`;
}
function deleteB() {
  return `<button id="del">Delete</button>`;
}
function editB() {
  return `<button id="edit">Edit</button>`;
}
async function tbBody() {
  const data = await getData();
  const dBtn = deleteB();
  const eBtn = editB();
  console.log(data.length)
  const rows = data.map(el => {
      console.log(el)
    `<tr>
    <td>${el.text}</td>
    <td>${dBtn}</td>
    <td>${eBtn}</td>
    </tr>`
  });
  return rows ? rows.toString() : "";
}

function tableComp() {
  return `<table>
            ${tbHeader()}
            ${tbBody()}
    </table>`;
}

function formAndTabel() {
  const form = formTodo();
  const table = tableComp();

  return `<div>
            ${form}
            ${table}
            </div>`;
}
doc.innerHTML = formAndTabel();
