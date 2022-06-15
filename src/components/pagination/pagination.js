import {
    getAllProducts,
    getProductByName,
    sortProductsByName,
    sortProductsByPrice,
    sortProductsByDiscount,
    filterProductsByCategory,
} from "../../../apiFetch.js";
import productCard from "../productCard/productCard.js";
import $root from "../../../index.js";
import stateVariable from "../../../stateVariable.js";
import spinner from "../../components/spinner/spinner.js";

let statePagination; // esta variable sirve para verificar cual es el ultimo filtro que tuvo un evento de onClick 
let requestType; // esta variable sirve para almacenar el tipo de peticion a la api de acuerdo con la variable de arriba
let parameter; // nos ayuda a almacenar la query dependiendo del tipo de peticion a la api

const pagination = (nameSortQuery, priceSortQuery, categoryFilterQuery, discountFilterQuery, nameSearch) => { // estos parametros indican su respectiva query
    const $navPagination = document.createElement("nav");// creamos el div para agregarlo al div root
    $navPagination.classList.add("container-nav-pagination");

    for (const state in stateVariable) {
        if (stateVariable[state] == true) { // verificamos cual fue el ultimo filtro donde se hizo el evento click
            statePagination = state;
            break;
        }
    }
    //asignamos la peticion a requestype dependiendo del ultimo filtro clickeado
    switch (statePagination) {
        case "home":
            requestType = getAllProducts;
            break;
        case "nameSearch":
            requestType = getProductByName;
            parameter = nameSearch;
            break;
        case "nameSort":
            requestType = sortProductsByName;
            parameter = nameSortQuery;
            break;
        case "priceSort":
            requestType = sortProductsByPrice;
            parameter = priceSortQuery;
            break;
        case "discountSort":
            requestType = sortProductsByDiscount;
            parameter = discountFilterQuery;
            break;
        case "categoryFilter":
            requestType = filterProductsByCategory;
            parameter = categoryFilterQuery;
            break;
        default:
            requestType = getAllProducts;
            break;
    }
    requestType(parameter).then(products => {
        const $ul = document.createElement("ul");
        $ul.classList.add("pagination");
        $navPagination.appendChild($ul);
        const productsNumber = products.length;
        const pagesNumber = Math.ceil(productsNumber / 12);

        for (let i = 1; i <= pagesNumber; i++) {
            // en este bucle creamos el paginado de acuerdo al tipo de peticion 
            const $li = document.createElement("li");
            $li.classList.add("number-li");
            const $a = document.createElement("a");
            $a.addEventListener("click", (e) => onclick(e.target.textContent));
            $a.classList.add("number-a");
            if (stateVariable.page == i) {
                $a.className = "number-a-selected"
            }
            $a.textContent = `${i}`;
            $li.appendChild($a);
            $ul.appendChild($li);
        }

        const onclick = (pageNumber) => {
            // agregamos el spinner mientras llega la respuesta de la api
            const $div = document.createElement("div");
            $div.classList.add("body-products");
            $div.appendChild(spinner());
            $root.firstElementChild.lastElementChild.replaceWith($div);
            stateVariable.page = pageNumber; // indicamos la pagina en la cual se encuentra
            // renderizamos nuevamente el paginado con la pagina actualizada
            $root.firstElementChild.children[3].replaceWith(pagination(nameSortQuery, priceSortQuery, categoryFilterQuery, discountFilterQuery, nameSearch));

            const allProducts = requestType(parameter).then(products => {
                //traemos los productos y de acuerdo a la pagina en la que se encuentre con la ayuda del metodo slice
                let productsSlice = products.slice((pageNumber - 1) * 12, pageNumber * 12);
                productsSlice = productsSlice.map((product) => {
                    let $productDiv = document.createElement("div");
                    $productDiv.classList.add("card-product");
                    let urlImage = product.url_image ? product.url_image : "./src/img/imageNoAvailable.png";
                    let name = product.name;
                    let price = product.price;
                    let discount = product.discount;
                    let $productCard = productCard(urlImage, name, price, discount);
                    $productDiv.innerHTML = $productCard;
                    return $productDiv;
                })
                return productsSlice;
            })

            const $divBody = document.createElement("div");
            $divBody.classList.add("body-products");

            allProducts.then(products => {
                products.map((product) => {
                    if (product.children[2].children[1].textContent == "-0%") {
                        product.children[2].removeChild(product.children[2].children[1])
                    }
                    $divBody.appendChild(product)
                })
                $root.firstElementChild.lastElementChild.replaceWith($divBody);//inyectamos los productos de la pagina actual en el div root
            })

        }

    })

    return $navPagination;
}
export default pagination;