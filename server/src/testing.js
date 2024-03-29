let html = `<h1>Dyanamic List</h1><ul>`;
const arr = ["one","two","three"];
for(const x in arr){
    html += `<li>${x}</li>`
}

html +=`</ul>`;

console.log(html);
