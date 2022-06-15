import productCard from "../productCard/productCard.js";
import { getAllProducts } from "../../../apiFetch.js";
import spinner from "../spinner/spinner.js";

const body = () => {
    const $div = document.createElement("div");// creamos el div que sera agregado a app
    $div.classList.add("body-products");
    $div.appendChild(spinner());// renderizamos el spinner mientras llega la respuesta de la api

    // Obetenemos los doce primeros productos de la api para luego inyectarlos al $div
    const $products = getAllProducts().then(products => products.slice(0,12).map((product) => {
        let $productDiv = document.createElement("div");
        $productDiv.classList.add("card-product");
        let urlImage = product.url_image ? product.url_image : "./src/img/imageNoAvailable.png";
        let name = product.name;
        let price = product.price;
        let discount = product.discount;
        let $productCard = productCard(urlImage, name, price, discount);
        $productDiv.innerHTML = $productCard;
        return $productDiv;
    }))

    $products.then(products => products.map((product) => {
        if (product.children[2].children[1].textContent == "-0%") {
            product.children[2].removeChild(product.children[2].children[1])
        }

        if ($div.firstElementChild.className == "spinner") {
            $div.removeChild($div.firstElementChild); // quitamos el spinner y en su lugar renderizamos los productos
        }
        $div.appendChild(product); // agregamos cada producto al $div

    }));

    return $div;
}


export default body;
