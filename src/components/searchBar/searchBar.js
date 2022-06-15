import { getProductByName } from "../../../apiFetch.js";
import productCard from "../productCard/productCard.js";
import $root from "../../../index.js";
import stateVariable from "../../../stateVariable.js";
import pagination from "../pagination/pagination.js";
import spinner from "../spinner/spinner.js";

const searchBar = () => {
    const $div = document.createElement("div"); // creamos el div que sera agregado a app
    $div.classList.add("searchbar-container");

    const $divInput = document.createElement("div"); // creamos el div que contendrá el $input
    $divInput.classList.add("searchbar");
    const $input = document.createElement("input");
    $input.type = "text";
    $input.placeholder = "search a product...";
    $divInput.appendChild($input);
    $div.appendChild($divInput);

    const $divButtonSend = document.createElement("div"); // creamos el div que contendrá el button de "buscar"
    $divButtonSend.classList.add("searchbar-btn");
    const $buttonSend = document.createElement("button");
    $buttonSend.innerText = "Search";
    $divButtonSend.appendChild($buttonSend);
    $div.appendChild($divButtonSend);

    let nameSearch; // esta variable se crea para almacenar el value del input

    $input.addEventListener("change", () => nameSearch = $input.value);// escuchamos los cambios del value 
    $buttonSend.addEventListener("click", () => {
        if (!nameSearch) {
            nameSearch = " "; // esto sirve para renderizar todos los productos en vez de "not found" cuando se da click en "buscar" sin ningun nombre ingresado
        }
        // creamos un nuevo div que sera agregado en el body para renderizar el spinner 
        const $div = document.createElement("div");
        $div.classList.add("body-products");
        $div.appendChild(spinner());
        $root.firstElementChild.lastElementChild.replaceWith($div);

        stateVariable.page = 1;// de esta forma siempre tendremos la pagina 1 selecionada

        // Obetenemos los doce primeros productos de la api para luego inyectarlos al $div
        let productsByName = getProductByName(nameSearch).then(products => products.slice(0, 12).map((product, i) => {
            let $productDiv = document.createElement("div");
            $productDiv.classList.add("card-product");
            let urlImage = product.url_image ? product.url_image : "../src/img/imageNoAvailable.png";
            let name = product.name;
            let price = product.price;
            let discount = product.discount;
            let $productCard = productCard(urlImage, name, price, discount);
            $productDiv.innerHTML = $productCard;
            return $productDiv;
        }))

        const $divBody = document.createElement("div"); // creamos un nuevo div que muestre los productos relacionados a la busqueda 
        $divBody.classList.add("body-products");

        productsByName.then(products => {
            if (products.length != 0) {
                products.map((product) => {
                    if (product.children[2].children[1].textContent == "-0%") {
                        product.children[2].removeChild(product.children[2].children[1])
                    }
                    $divBody.appendChild(product)
                })
                $root.firstElementChild.lastElementChild.replaceWith($divBody);// inyectamos en el body todos los productos con el nombre ingresado
            }
            else {
                // en caso el producto ingresado no se encuentre en la base de datos 
                const $divImg = document.createElement("div");
                $divImg.classList.add("div-img-404");
                const $img = document.createElement("img");
                $img.src = "./src/img/product404.jpg";
                $divImg.appendChild($img);
                $root.firstElementChild.lastElementChild.replaceWith($divImg);// muestra una imagen indicando que el producto no ha sido encontrado
                nameSearch = " "; // de esta forma obtenemos todos los productos cuando hay un click en "buscar" luego de no encontrar ningun producto con el nombre ingresado
            }
        })
        stateVariable.home = false
        stateVariable.nameSearch = true
        stateVariable.nameSort = false
        stateVariable.priceSort = false
        stateVariable.discountSort = false
        stateVariable.categoryFilter = false
        $root.firstElementChild.children[3].replaceWith(pagination(null, null, null, null, nameSearch));// esto lo hago para renderizar nuevamente el paginado 
        $input.value = null;// esto es para que la searchBar quede limpia luego de buscar un producto
    })

    return $div;
}

export default searchBar;