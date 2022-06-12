const productCard = (urlImage, name, price, discount) => {
    let $productCard =
        `
            <img src = ${urlImage}>
            <p>${name}</p>
            <div>
            <span>$${price}</span>
            <i>-${discount}%</i>
            <button>AGREGAR</button>
            </div>
        `;
    return $productCard;
}
export default productCard;