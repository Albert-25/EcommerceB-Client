import $root from "../../../../index.js";
import { filterProductsByCategory, getAllCategories } from "../../../../apiFetch.js";
import productCard from "../../productCard/productCard.js";
import stateVariable from "../../../../stateVariable.js";
import pagination from "../../pagination/pagination.js";
import spinner from "../../spinner/spinner.js";

const sortCategoryFilter = () => {

    const $orderCategoryDiv = document.createElement('div');
    $orderCategoryDiv.classList.add("order-Category");
    $orderCategoryDiv.classList.add("col");
    const $divFilterCategory = document.createElement("div");
    $divFilterCategory.textContent = "Filter Category"
    $orderCategoryDiv.appendChild($divFilterCategory);

    const $selectOrderCategory = document.createElement("select");
    $selectOrderCategory.innerHTML = "<option selected disabled=true>Select Category</option>"
    $orderCategoryDiv.appendChild($selectOrderCategory);

    getAllCategories().then(categories => categories.map(category => {
        let $option = document.createElement("option");
        $option.value = category.name;
        $option.innerText = category.name;
        $option.id = category.id;
        $selectOrderCategory.appendChild($option);
    }))

    const handleFilterCategory = (value) => {
        const $div = document.createElement("div");
        $div.classList.add("body-products");
        $div.appendChild(spinner());
        $root.firstElementChild.lastElementChild.replaceWith($div);

        let selectElemnt = $root.firstElementChild.children[2].children[3].lastElementChild;
        let categoryId;
        for (let i = 0; i < selectElemnt.childElementCount; i++) {
            const element = selectElemnt[i];
            if(value == element.value){
                categoryId = element.id
            }
        }
        console.log("caaaaaaaaaaa ",categoryId);
        stateVariable.page = 1;
        let productsByCategorySort = filterProductsByCategory(categoryId).then(products => products.slice(0, 12).map((product) => {
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

        productsByCategorySort.then(products => {
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
        stateVariable.discountSort = false
        stateVariable.categoryFilter = true
        $root.firstElementChild.children[3].replaceWith(pagination(null, null, value, null, null));
    }

    $selectOrderCategory.addEventListener("change", (e) => handleFilterCategory(e.target.value));
    return $orderCategoryDiv;
}

export default sortCategoryFilter;






