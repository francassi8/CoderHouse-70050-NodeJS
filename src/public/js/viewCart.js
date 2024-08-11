document.addEventListener('DOMContentLoaded', () => {
    const cartForm = document.getElementById('cart-form');
    const cartInput = document.getElementById('cart-id');
    const cartOutput = document.getElementById('cart-output');

    cartForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cartID = cartInput.value.trim();

        if (cartID) {
            try {
                const response = await fetch(`/api/carts/${cartID}`);
                const data = await response.json();
                
                if (data.status === "success") {
                    displayCart(data.resultado);
                } else {
                    cartOutput.innerHTML = `<p>${data.message}</p>`;
                }
            } catch (error) {
                cartOutput.innerHTML = `<p>Error al obtener carrito: ${error.message}</p>`;
            }
        } else {
            cartOutput.innerHTML = `<p>ingrese un ID de carrito valido.</p>`;
        }
    });

    function displayCart(cart) {  
        if (!cart || !cart.products.length) {
            cartOutput.innerHTML = `<p>Carrito vacio o no encontrado.</p>`;
            return;
        }

        let cartHTML = `<h2>Cart ID: ${cart._id}</h2>`;
        cartHTML += `<ul>`;
        cart.products.forEach(product => {
            cartHTML += `<li>
                <strong>title:</strong> ${product.pid.title} <br/>
                <strong>Quantity:</strong> ${product.quantity} <br/>
                <strong>Price:</strong> $${product.pid.price} <br/>
                <strong>Quantity:</strong> ${product.quantity}
            </li><br>`;
        });
        cartHTML += `</ul>`;

        cartOutput.innerHTML = cartHTML;
    }
});