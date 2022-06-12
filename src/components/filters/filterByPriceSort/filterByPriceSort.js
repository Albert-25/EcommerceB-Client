import $root from "../../../../index.js";
import { sortProductsByPrice } from "../../../../apiFetch.js";
import productCard from "../../productCard/productCard.js";
import stateVariable from "../../../../stateVariable.js";
import pagination from "../../pagination/pagination.js";
import spinner from "../../spinner/spinner.js";

const sortPriceFilter = () => {

    const $orderPriceDiv = document.createElement('div');
    $orderPriceDiv.classList.add("order-Price");
    $orderPriceDiv.classList.add("col");
    const $divFilterPrice = document.createElement("div");
    $divFilterPrice.textContent = "Order Price"
    $orderPriceDiv.appendChild($divFilterPrice);

    const $selectOrderPrice = document.createElement("select");
    $selectOrderPrice.innerHTML = `
    <option selected disabled={true}>Select Price</option>
    <option value="asc">Ascendente</option>
    <option value="des">Descendente</option>
    `
    const handleFilterPrice = (value) => {
        const $div = document.createElement("div");
        $div.classList.add("body-products");
        $div.appendChild(spinner());
        $root.firstElementChild.lastElementChild.replaceWith($div);
        stateVariable.page=1;
        let productsByPriceSort = sortProductsByPrice(value).then(products => products.slice(0,12).map((product) => {
            let $productDiv = document.createElement("div");
            $productDiv.classList.add("card-product");
            let urlImage = product.url_image ? product.url_image : "../src/img/imageNoAvailable.png";
            let name = product.name;
            let price = product.price;
            let discount = product.discount;
            let $productCard = productCard(urlImage, name, price, discount);
            $productDiv.innerHTML = $productCard;
            return $productDiv;
        }));

        const $divBody = document.createElement("div");
        $divBody.classList.add("body-products");

        productsByPriceSort.then(products => {
            products.map((product) => {
                if (product.children[2].children[1].textContent == "-0%") {
                    product.children[2].removeChild(product.children[2].children[1])
                }
                $divBody.appendChild(product)
            })
            $root.firstElementChild.lastElementChild.replaceWith($divBody);
        })
        stateVariable.home = false
        stateVariable.nameSearch = false
        stateVariable.nameSort = false
        stateVariable.priceSort = true
        stateVariable.discountSort = false
        stateVariable.categoryFilter = false
        $root.firstElementChild.children[3].replaceWith(pagination(null, value, null, null, null));
    }

    $selectOrderPrice.addEventListener("change", (e) => handleFilterPrice(e.target.value));
    $orderPriceDiv.appendChild($selectOrderPrice);

    return $orderPriceDiv;
}

export default sortPriceFilter;






