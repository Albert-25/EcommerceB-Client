const header = ()=>{
    const $div = document.createElement("div");
    $div.classList.add("header-div");
    const $img = document.createElement("img");
    $img.src = "./src/img/logoHeader.png";
    $div.appendChild($img);
    return $div;
}
export default header;