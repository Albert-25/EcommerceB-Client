const urlBase = "https://ecommerce-smith.herokuapp.com";

export async function getAllProducts() {
    try {
        let response = await fetch(`${urlBase}/products`);
        let json = response.json();
        return json;
    }
    catch (e) {
        console.log("error en requests.js getAllProducts ", e)
    }
}

export async function getProductByName(productName) {
    try {
        let response = await fetch(`${urlBase}/products?name=${productName}`);
        let json = response.json();
        return json;
    }
    catch (e) {
        console.log("error en requests.js getProductByName", e)
    }
}

export async function sortProductsByName(value) {
    try {
        let response = await fetch(`${urlBase}/products/name?sort=${value}`)
        let json = response.json();
        return json;
    } catch (e) {
        console.log("error en requests.js sortProductsByName", e)
    }
}

export async function sortProductsByPrice(value) {
    try {
        let response = await fetch(`${urlBase}/products/price?sort=${value}`)
        let json = response.json();
        return json;
    } catch (e) {
        console.log("error en requests.js sortProductsByPrice", e)
    }
}

export async function sortProductsByDiscount(value) {
    try {
        if (value == "false") {
            let response = await fetch(`${urlBase}/products/discount?value=${value}`);
            let json = response.json();
            return json;
        }
        else {
            let response = await fetch(`${urlBase}/products/discount?value=true&sort=${value}`);
            let json = response.json();
            return json;
        }
    } catch (e) {
        console.log("error en requests.js sortProductsByDiscount", e)
    }
}

export async function filterProductsByCategory(category) {
    try {
        let response = await fetch(`${urlBase}/products/category?name=${category}`);
        let json = response.json();
        return json;
    } catch (e) {
        console.log("error en requests.js filterProductsByCategory", e)
    }
}

export async function getAllCategories() {
    try {
        let response = await fetch(`${urlBase}/categories`);
        let json = response.json();
        return json;
    } catch (e) {
        console.log("error en requests.js getAllCategories", e)
    }
}