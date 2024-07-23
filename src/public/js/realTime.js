const socket = io();

const contenedorListaProductos = document.querySelector('#listaDeProductos')

socket.on('realTimeProducts', (data) => {
    contenedorListaProductos.innerHTML = ''
    data.forEach(producto => {
        const div = document.createElement('div')
        const titleNode = document.createTextNode(`Title: ${producto.title}`);
        const codeNode = document.createTextNode(`Code: ${producto.code}`);
        const priceNode = document.createTextNode(`Price: ${producto.price}`);
        const stockNode = document.createTextNode(`Stock: ${producto.stock}`);
        const statusNode = document.createTextNode(`Status: ${producto.status}`);

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
})
