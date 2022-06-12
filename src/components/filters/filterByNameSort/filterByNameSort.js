import $root from "../../../../index.js";
import { sortProductsByName } from "../../../../apiFetch.js";
import productCard from "../../productCard/productCard.js";
import stateVariable from "../../../../stateVariable.js";
import pagination from "../../pagination/pagination.js";
import spinner from "../../spinner/spinner.js";

const sortNameFilter = () => {

    const $orderNameDiv = document.createElement('div');
    $orderNameDiv.classList.add("order-name");
    $orderNameDiv.classList.add("col");
    const $divFilterName = document.createElement("div");
    $divFilterName.textContent = "Order Name"
    $orderNameDiv.appendChild($divFilterName);
    
    const $selectOrderName = document.createElement("select");
    $selectOrderName.innerHTML = `
    <option selected disabled=true>Select Name</option>
    <option value="asc">Ascendente</option>
    <option value="des">Descendente</option>
    `
    const handleFilterName = (value) => {
        const $div = document.createElement("div");
        $div.classList.add("body-products");
        $div.appendChild(spinner());
        $root.firstElementChild.lastElementChild.replaceWith($div);
        stateVariable.page=1;
        let productsByNameSort = sortProductsByName(value).then(products => products.slice(0,12).map((product) => {
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

        productsByNameSort.then(products => {
            products.map((product) => {
                if (product.children[2].children[1].textContent == "-0%") {
                    product.children[2].removeChild(product.children[2].children[1])
                }
                $divBody.appendChild(product)
            })
            $root.firstElementChild.lastElementChild.replaceWith($divBody);
        })
        stateVariable.home=false
        stateVariable.nameSearch= false
        stateVariable.nameSort= true
        stateVariable.priceSort=false
        stateVariable.discountSort= false
        stateVariable.categoryFilter=false
        $root.firstElementChild.children[3].replaceWith(pagination(value,null,null,null,null));
    }
    
    $selectOrderName.addEventListener("change", (e) => handleFilterName(e.target.value));
    $orderNameDiv.appendChild($selectOrderName);
    
    return $orderNameDiv;
}

export default sortNameFilter;






