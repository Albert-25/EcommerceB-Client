import app from "./app.js";
import stylesFilters from "./src/components/filters/styles.js";
import stylesProductCard from "./src/components/productCard/styles.js";
import stylesSeachBar from "./src/components/searchBar/styles.js";
import stylesHeader from "./src/components/header/styles.js";
import stylesPagination from "./src/components/pagination/styles.js";
import stylesSpinner from "./src/components/spinner/styles.js";
const $root = document.getElementById("root");

$root.appendChild(app());
$root.appendChild(stylesProductCard);
$root.appendChild(stylesFilters);
$root.appendChild(stylesSeachBar);
$root.appendChild(stylesHeader);
$root.appendChild(stylesPagination);
$root.appendChild(stylesSpinner);
export default $root;

