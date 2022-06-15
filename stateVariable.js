// esta variable es creada con la finalidad de manejar el renderizado del paginado despues los eventos onclick de los filtros
let stateVariable = {
    home:false,
    nameSearch: false,
    nameSort: false,
    priceSort:false,
    discountSort: false,
    categoryFilter:false,
    page:1 // esta key sirve para que la pagina selecionada tenga el color naranja
};
export default stateVariable;