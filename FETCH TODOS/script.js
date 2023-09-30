let btn = document.getElementById('btn');
let result = document.getElementById('result');

let URL = `https://jsonplaceholder.typicode.com/todos`;

btn.addEventListener('click', async () => {
    result.innerHTML = ``;
    let res = await fetch(URL);
    let data = await res.json();
    Draw(data);
})

function Draw(data) {
    data.forEach(ele => {
        result.innerHTML += `
        <tr>
        <td>${ele.id}.</td>
        <td>${ele.title}</td>
        <td>${ele.completed}</td>
    </tr>
        `;
    });
}


