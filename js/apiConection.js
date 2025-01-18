const API_URL = 'http://localhost:3000';

export async function getProducts() {
    const response = await fetch(`${API_URL}/productos`);
    const data = await response.json();
    
    if(response.status !== 200 || data.length === 0) {
        return [];
    }
    
    return data;
}

export async function addProduct(product) {
    const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if(response.status !== 201) {
        return false;
    }

    return true;
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE'
    });

    if(response.status !== 200) {
        return false;
    }

    return true;
}