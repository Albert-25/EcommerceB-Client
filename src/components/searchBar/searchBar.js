import { getProductByName, getAllProducts } from "../../../apiFetch.js";
import productCard from "../productCard/productCard.js";
import $root from "../../../index.js";
import stateVariable from "../../../stateVariable.js";
import pagination from "../pagination/pagination.js";
import spinner from "../spinner/spinner.js";

const searchBar = () => {
    const $div = document.createElement("div");
    $div.classList.add("searchbar-container");

    const $divInput = document.createElement("div");
    $divInput.classList.add("searchbar");
    const $input = document.createElement("input");
    $input.type = "text";
    $input.placeholder = "search a product...";
    $divInput.appendChild($input);
    $div.appendChild($divInput);

    const $divButtonSend = document.createElement("div");
    $divButtonSend.classList.add("searchbar-btn");
    const $buttonSend = document.createElement("button");
    $buttonSend.innerText = "Search";
    $divButtonSend.appendChild($buttonSend);
    $div.appendChild($divButtonSend);

    let nameSearch;

    $input.addEventListener("change", () => nameSearch = $input.value);
    $buttonSend.addEventListener("click", () => {
        const $div = document.createElement("div");
        $div.classList.add("body-products");
        $div.appendChild(spinner());
        $root.firstElementChild.lastElementChild.replaceWith($div);
        stateVariable.page = 1;
        let productsPromise = nameSearch == "asasa" ? getAllProducts() : getProductByName(nameSearch);

        let productsByName = productsPromise.then(products => products.slice(0, 12).map((product) => {
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

        const $divBody = document.createElement("div");
        $divBody.classList.add("body-products");

        productsByName.then(products => {
            if (products.length != 0) {
                products.map((product) => {
                    if (product.children[2].children[1].textContent == "-0%") {
                        product.children[2].removeChild(product.children[2].children[1])
                    }
                    $divBody.appendChild(product)
                })
                $root.firstElementChild.lastElementChild.replaceWith($divBody);
            }
            else {
                const $divImg = document.createElement("div");
                $divImg.classList.add("div-img-404");
                const $img = document.createElement("img");
                $img.src = "./src/img/product404.jpg";
                $divImg.appendChild($img);
                $root.firstElementChild.lastElementChild.replaceWith($divImg);
            }
        })
        stateVariable.home = false
        stateVariable.nameSearch = true
        stateVariable.nameSort = false
        stateVariable.priceSort = false
        stateVariable.discountSort = false
        stateVariable.categoryFilter = false
        $root.firstElementChild.children[3].replaceWith(pagination(null, null, null, null, nameSearch));
        $input.value = null;
    })

    return $div;
}

export default searchBar;