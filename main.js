import './components/product-card.js';
import './components/category-card.js';

async function loadCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("type");
    if (!category) {
        const collectionTitle = document.getElementById("collection-title");
        if(collectionTitle) {
            collectionTitle.textContent = "Collection Not Found";
        }
        return;
    }

    const res = await fetch("products.json");
    const data = await res.json();
    if (!data[category]) {
        const collectionTitle = document.getElementById("collection-title");
        if(collectionTitle) {
            collectionTitle.textContent = "Collection Not Found";
        }
        return;
    }

    const titleMap = { diwali:"✨ Diwali 2025", christmas:"🎄 Christmas 2025", halloween:"🎃 Halloween 2025", newyear:"🎆 New Year 2026" };
    const collectionTitle = document.getElementById("collection-title");
    if(collectionTitle) {
        collectionTitle.textContent = titleMap[category];
    }

    const container = document.getElementById("products-container");
    if(container) {
        container.innerHTML = "";

        data[category].forEach((product,index)=>{
            const productCard = document.createElement('product-card');
            productCard.setAttribute('name', product.name);
            productCard.setAttribute('image', product.image);
            productCard.setAttribute('price', product.price);
            productCard.setAttribute('stock', product.stock);
            productCard.setAttribute('link', `product.html?type=${category}&id=${index}`);
            container.appendChild(productCard);
        });
    }
}

async function loadCollections() {
    const res = await fetch("products.json");
    const data = await res.json();
    const container = document.getElementById("categories-container");
    if(container) {
        container.innerHTML = "";
        const titleMap = { diwali:"✨ Diwali 2025", christmas:"🎄 Christmas 2025", halloween:"🎃 Halloween 2025", newyear:"🎆 New Year 2026" };
        for(const category in data) {
            const product = data[category][0];
            const categoryCard = document.createElement('category-card');
            categoryCard.setAttribute('title', titleMap[category]);
            categoryCard.setAttribute('image', product.image);
            categoryCard.setAttribute('link', `category.html?type=${category}`);
            container.appendChild(categoryCard);
        }
    }
}

async function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("type");
    const productId = urlParams.get("id");

    if (!category || !productId) {
        document.getElementById('product-details').innerHTML = `<p class="text-center text-red-500">Product not found!</p>`;
        return;
    }

    const res = await fetch('products.json');
    const data = await res.json();

    if (!data[category] || !data[category][productId]) {
        document.getElementById('product-details').innerHTML = `<p class="text-center text-red-500">Product not found!</p>`;
        return;
    }

    const product = data[category][productId];

    document.getElementById('product-details').innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <img src="${product.image}" alt="${product.name}" class="w-full rounded-3xl shadow-xl">
      </div>
      <div>
        <h2 class="font-playfair text-4xl sm:text-5xl text-gray-800 mb-4">${product.name}</h2>
        <p class="text-pink-600 font-semibold text-2xl mb-6">${product.price}</p>
        <p class="text-gray-600 mb-6">${product.description}</p>
        <div class="flex items-center mb-6">
          <span class="badge">${product.stock}</span>
        </div>
        <a href="#" class="px-8 py-4 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition font-semibold">Add to Cart</a>
      </div>
    </div>
    `;
}


// Initial load
if(window.location.pathname.includes('category.html')) {
    loadCategory();
} else if (window.location.pathname.includes('product.html')) {
    loadProduct();
} else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    loadCollections();
}
