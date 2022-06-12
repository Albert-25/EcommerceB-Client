let styles = document.createElement("style");
styles.innerHTML =
    "*{" +
    "margin: 0;" +
    "padding: 0;" +
    "}" +
    ".body-products{" +
    "text-align: justify;" +
    "background-color: #f6f6f6;" +
    "display: grid;" +
    "grid-template-columns: 200px 200px 200px 200px;" +
    "justify-content: center;" +
    "gap: 10px;" +
    "padding: 0px 270px;" +
    "padding-bottom: 20px;" +
    "}" +

    ".body-products .card-product {" +
    "background-color: #fff;" +
    "border: 1px solid #f0f0f0;" +
    "border-radius: 5px;" +
    "color:#333;" +
    "padding: 10px;" +
    "font-family: Arial, Helvetica, sans-serif;" +
    "font-size: 15px;" +
    "font-weight: 550;" +
    "}" +

    ".body-products .card-product:hover{" +
    "background-color: #8999;" +
    "   transition: 0.6s;" +
    "transform: scale(1.1);" +
    "}" +

    " .body-products .card-product img{" +
    "width: 100%;" +
    "height: 200px" +
    "}" +

    ".body-products .card-product div{ " +
    "display: grid;" +
    "grid-template-columns: auto auto;" +
    "justify-content: space-between;" +
    " row-gap: 10px;" +
    " }" +

    ".body-products .card-product div span{ " +
    "color:#D35400;" +
    "font-size: 15px;" +
    "}" +

    " .body-products .card-product div button{" +
    " grid-column: 1 / 3;" +
    "background-color: #D35400;" +
    "border: none;" +
    " border-radius: 10px;" +
    "color: #e9eef2;" +
    "padding: 5px 10px;" +
    " cursor: pointer;" +
    "font-size: 15px;" +
    "}" +

    " .body-products .card-product div i{" +
    "background-color: #D35400;" +
    " border-radius: 10px;" +
    "color: #e9eef2;" +
    "padding: 5px 5px;" +
    "padding-right: 0px;" +
    "}"

export default styles;