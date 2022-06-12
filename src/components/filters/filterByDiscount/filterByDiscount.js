import $root from "../../../../index.js";
import { sortProductsByDiscount } from "../../../../apiFetch.js";
import productCard from "../../productCard/productCard.js";
import stateVariable from "../../../../stateVariable.js";
import pagination from "../../pagination/pagination.js";
import spinner from "../../spinner/spinner.js";
const sortDiscountFilter = () => {

    const $orderDiscountDiv = document.createElement('div');
    $orderDiscountDiv.classList.add("order-Discount");
    $orderDiscountDiv.classList.add("col");
    const $divFilterDiscount = document.createElement("div");
    $divFilterDiscount.textContent = "Filter Discount"
    $orderDiscountDiv.appendChild($divFilterDiscount);

    const $selectOrderDiscount = document.createElement("select");
    $selectOrderDiscount.innerHTML = `
    <option selected disabled={true}>Select Discount</option>
    <option value="false">No Discount</option>
    <option value="asc">Ascendente</option>
    <option value="des">Descendente</option>
    `
    const handleFilterDiscount = (value) => {
        const $div = document.createElement("div");
        $div.classList.add("body-products");
        $div.appendChild(spinner());
        $root.firstElementChild.lastElementChild.replaceWith($div);
        stateVariable.page=1;
        let productsByDiscountSort = sortProductsByDiscount(value).then(products => products.slice(0,12).map((product) => {
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

        productsByDiscountSort.then(products => {
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
        stateVariable.priceSort = false
        stateVariable.discountSort = true
        stateVariable.categoryFilter = false
        $root.firstElementChild.children[3].replaceWith(pagination(null, null, null, value, null));
    }

    $selectOrderDiscount.addEventListener("change", (e) => handleFilterDiscount(e.target.value));
    $orderDiscountDiv.appendChild($selectOrderDiscount);

    return $orderDiscountDiv;
}

export default sortDiscountFilter;






