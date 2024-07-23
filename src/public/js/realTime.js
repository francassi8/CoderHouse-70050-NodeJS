const socket = io();

const contenedorListaProductos = document.querySelector('#listaDeProductos')

socket.on('realTimeProducts', (data) => {

    //Lista de Productos

    contenedorListaProductos.innerHTML = '<h2>Lista de Productos</h2>'
    data.forEach(producto => {
        const div = document.createElement('div')
        const idNode = document.createTextNode(`Id: ${producto.id}`);
        const titleNode = document.createTextNode(`Title: ${producto.title}`);
        const codeNode = document.createTextNode(`Code: ${producto.code}`);
        const priceNode = document.createTextNode(`Price: ${producto.price}`);
        const stockNode = document.createTextNode(`Stock: ${producto.stock}`);
        const statusNode = document.createTextNode(`Status: ${producto.status}`);

        div.appendChild(idNode);
        div.appendChild(document.createElement('br'));
        div.appendChild(titleNode);
        div.appendChild(document.createElement('br'));
        div.appendChild(codeNode);
        div.appendChild(document.createElement('br'));
        div.appendChild(priceNode);
        div.appendChild(document.createElement('br'));
        div.appendChild(stockNode);
        div.appendChild(document.createElement('br'));
        div.appendChild(statusNode);
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));

        contenedorListaProductos.appendChild(div);
    });

    //agregar Producto

    const crearProducto = document.querySelector('#crearProducto')
    crearProducto.innerHTML = ''

    const form = document.createElement('form');
    form.id = 'productForm';

        form.innerHTML = `
            <div style="margin-left: 15px;">
                <h2>Crear Producto</h2>
                <label for="title">Title:</label><br>
                <input type="text" id="title" name="title" required><br><br>
                <label for="description">Description:</label><br>
                <input type="text" id="description" name="description" required><br><br>
                <label for="code">Code:</label><br>
                <input type="text" id="code" name="code" required><br><br>
                <label for="price">Price:</label><br>
                <input type="number" id="price" name="price" required><br><br>
                <label for="stock">Stock:</label><br>
                <input type="number" id="stock" name="stock" required><br><br>
                <label for="category">Category:</label><br>
                <input type="text" id="category" name="category" required><br><br>
                <button type="submit">Agregar Producto</button>
            </div>
        `;

        crearProducto.appendChild(form);

        form.addEventListener('submit', async function(event) {
            event.preventDefault(); 
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log(JSON.stringify(data))
            try {
                const response = await fetch('/api/products/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                const result = await response.json();
                //alert(result.message);
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al agregar el Producto');
            }
        });

        //eliminar Producto

        const eliminarProducto = document.querySelector('#eliminarProducto')
        eliminarProducto.innerHTML = ''

        const form_eliminar = document.createElement('div');

        form_eliminar.innerHTML = `
            <div style="margin-left: 15px;">
                <h2>Eliminar Producto</h2>
                <label for="id_producto">producto ID:</label><br>
                <input type="text" id="id_producto" name="id_producto" required><br><br>
                <button class="deleteButton">Eliminar Producto</button>
            </div>
        `;

        eliminarProducto.appendChild(form_eliminar);

        document.addEventListener('click', async function(event) {
            if (event.target.matches('.deleteButton')) {
                event.preventDefault();
                const productId = document.getElementById('id_producto').value;
    
                try {
                    const response = await fetch(`/api/products/${productId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (response.ok) {
                        const result = await response.json();
                        //alert(result.message);
    
                        const productItem = document.querySelector(`.productItem[data-id="${productId}"]`);
                        if (productItem) {
                            productItem.remove();
                        }
                    } else {
                        const result = await response.json();
                        alert(result.error);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Ingrese un ID de producto');
                }
            }
        });
        

})