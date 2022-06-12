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

let statePagination;
let requestType;
let parameter;

const pagination = (nameSortQuery, priceSortQuery, categoryFilterQuery, discountFilterQuery, nameSearch) => {

    const $navPagination = document.createElement("nav");
    $navPagination.classList.add("container-nav-pagination");

    for (const state in stateVariable) {
        if (stateVariable[state] == true) {
            statePagination = state;
            break;
        }
    }

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
            const $div = document.createElement("div");
            $div.classList.add("body-products");
            $div.appendChild(spinner());
            $root.firstElementChild.lastElementChild.replaceWith($div);
            stateVariable.page = pageNumber;
            $root.firstElementChild.children[3].replaceWith(pagination(nameSortQuery, priceSortQuery, categoryFilterQuery, discountFilterQuery, nameSearch));

            const allProducts = requestType(parameter).then(products => {
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
                $root.firstElementChild.lastElementChild.replaceWith($divBody);
            })

        }

    })

    return $navPagination;
}
export default pagination;