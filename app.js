import body from "./src/components/body/body.js";
import sortCategoryFilter from "./src/components/filters/filterByCategory/filterByCategory.js";
import sortDiscountFilter from "./src/components/filters/filterByDiscount/filterByDiscount.js";
import sortNameFilter from "./src/components/filters/filterByNameSort/filterByNameSort.js";
import sortPriceFilter from "./src/components/filters/filterByPriceSort/filterByPriceSort.js";
import header from "./src/components/header/header.js"
import pagination from "./src/components/pagination/pagination.js";
import searchBar from "./src/components/searchBar/searchBar.js";

const app = ()=>{
    const $div = document.createElement("div");
    const $divFilters = document.createElement("div");// creamos este div para agregar todos los div de filtros
    $divFilters.classList.add("container-filters");
    $divFilters.appendChild(sortNameFilter());
    $divFilters.appendChild(sortPriceFilter());
    $divFilters.appendChild(sortDiscountFilter());
    $divFilters.appendChild(sortCategoryFilter());    


    $div.appendChild(header());
    $div.appendChild(searchBar());
    $div.appendChild($divFilters);
    $div.appendChild(pagination());
    $div.appendChild(body()) 
    return $div
}   
export default app;