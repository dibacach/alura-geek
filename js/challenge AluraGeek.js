import { getProducts, addProduct, deleteProduct } from './apiConection.js';

//Delete a product
async function dropProduct(id) {
    const response = await deleteProduct(id);

    if(!response) {
        alert('No se ha podido eliminar el producto');
        return;
    }

    alert('Producto eliminado correctamente');
}

window.dropProduct = dropProduct;

// Create container for each product
function createCard(product) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img class="card-product" src="${product.imagen}" />
        <div class="card-container--info">
            <p class="card-container--name">${product.nombre}</p>
            <div class="card-container--value">
                <p>$ ${product.precio}</p>
                <img src="./assets/trashIcon.png" class="trash" onclick="dropProduct('${product.id}')" />
            </div>
        </div>
    `;
    return card;
}

//List all products on page
async function listProducts() {
    const productsContainer = document.querySelector('[data-products]');
    const products = await getProducts();

    if(products.length === 0) {
        productsContainer.innerHTML = '<p>No se han agregado productos</p>';
        return;
    }

    products.forEach(product => {
        const card = createCard(product);
        productsContainer.appendChild(card);
    });
}


document.querySelector('[data-agregar]').addEventListener('click', async (e) => {
    e.preventDefault();
    const form = document.querySelector('[data-product]');
    const name = form.querySelector('[data-name]');
    const price = form.querySelector('[data-price]'); 
    const image = form.querySelector('[data-image]'); 

    if(name.value === '' || price.value === '' || image.value === '') {
        alert('Por favor, rellena todos los campos');
        return;
    }

    const product = {
        nombre: name.value,
        precio: price.value,
        imagen: image.value
    };

    const response = await addProduct(product);

    if(!response) { 
        alert('No se ha podido agregar el producto');
        return;
    }

    alert('Producto agregado correctamente');
    name.value = '';
    price.value = '';
    image.value = '';
});

document.querySelector('[data-limpiar]').addEventListener('click', () => {
    document.querySelector('[data-product]').reset();
});

listProducts();