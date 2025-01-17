
// Get list of products
async function getProducts() {
    const response = await fetch('http://localhost:3000/productos');
    const data = await response.json();
    
    if(response.status !== 200 || data.length === 0) {
        return [];
    }
    
    return data;
}

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
                <img src="./assets/trashIcon.png" onclick="deleteProduct(${product.id})" />
            </div>
        </div>
    `;
    return card;
}

//List all products on page
async function listProducts() {
    const productsContainer = document.querySelector('[data-products]');
    products = await getProducts();

    if(products.length === 0) {
        productsContainer.innerHTML = '<p>No se han agregado productos</p>';
        return;
    }

    products.forEach(product => {
        const card = createCard(product);
        productsContainer.appendChild(card);
    });
}

//Add a new product
async function addProduct() {
    const form = document.querySelector('#form-product');
    const name = form.querySelector('#nombre'); 
    const price = form.querySelector('#precio'); 
    const image = form.querySelector('#imagen'); 

    if(name.value === '' || price.value === '' || image.value === '') {
        alert('Por favor, rellena todos los campos');
        return;
    }

    const product = {
        nombre: name.value,
        precio: price.value,
        imagen: image.value
    };

    const response = await fetch('http://localhost:3000/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if(response.status !== 201) {
        alert('No se ha podido agregar el producto');
        return;
    }

    alert('Producto agregado correctamente');
    name.value = '';
    price.value = '';
    image.value = '';
}

//Delete a product
async function deleteProduct(id) {
    const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE'
    });

    console.log(response.status);

    if(response.status !== 200) {
        alert('No se ha podido eliminar el producto');
        return;
    }

    alert('Producto eliminado correctamente');
}

document.querySelector('#agregar').addEventListener('click', (e) => {
    e.preventDefault();
    addProduct();
});
document.querySelector('#limpiar').addEventListener('click', () => {
    document.querySelector('#form-product').reset();
});

listProducts();