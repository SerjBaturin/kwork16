const randomBtn = document.querySelector("#get-random");
const addFolderBtn = document.querySelector("#add-folder");
const carouselInner = document.querySelector(".carousel-inner");

window.onload = () => {
  fetch("/random")
    .then(response => response.json())
    .then(data => {
      const item = data[0];
      const img = document.createElement("IMG");
      const div = document.createElement("DIV");
      div.className = "carousel-item active";
      img.src = item;
      img.style = "height: 400px;";
      div.appendChild(img);
      carouselInner.appendChild(div);
      data.slice(1).map(item => {
        const img = document.createElement("IMG");
        const div = document.createElement("DIV");
        div.className = "carousel-item";
        img.src = item;
        img.style = ""
        img.style = "height: 400px;";
        div.appendChild(img);
        carouselInner.appendChild(div);
      });
    });
};

randomBtn.addEventListener("click", () => {
  location.reload();
});

addFolderBtn.addEventListener("click", () => {
  const attr = document.querySelector("img").attributes.src.value;
  const urlArr = attr.split("/");
  urlArr.pop();
  const url = urlArr.join("/");
  fetch("/intolog", {
    method: "post",
    body: JSON.stringify({ url: url }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});
