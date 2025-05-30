// Tabs
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'tracking') {
    setTimeout(() => map.invalidateSize(), 100); // fix map size
  }
}

// STOCK
let stock = [];
function addItem() {
  const name = document.getElementById('itemName').value;
  const qty = parseInt(document.getElementById('itemQty').value);
  const price = parseFloat(document.getElementById('itemPrice').value);
  if (!name || isNaN(qty) || isNaN(price)) return alert("Fill all fields!");
  stock.push({ name, qty, price });
  renderStock();
  document.getElementById('itemName').value = '';
  document.getElementById('itemQty').value = '';
  document.getElementById('itemPrice').value = '';
}
function renderStock() {
  const tbody = document.getElementById('stockTable');
  tbody.innerHTML = '';
  stock.forEach((item, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>₱${item.price}</td>
        <td><button onclick="sellItem(${i})">Sell</button></td>
      </tr>`;
  });
}
function sellItem(index) {
  if (stock[index].qty > 0) {
    stock[index].qty--;
    renderStock();
  } else {
    alert("Out of stock!");
  }
}

// DELIVERY
let deliveries = [];
function addDelivery() {
  const item = document.getElementById('deliveryItem').value;
  const address = document.getElementById('deliveryAddress').value;
  const status = document.getElementById('deliveryStatus').value;
  if (!item || !address || !status) return alert("Fill all fields!");
  deliveries.push({ item, address, status });
  renderDelivery();
  document.getElementById('deliveryItem').value = '';
  document.getElementById('deliveryAddress').value = '';
  document.getElementById('deliveryStatus').value = '';
}
function renderDelivery() {
  const tbody = document.getElementById('deliveryTable');
  tbody.innerHTML = '';
  deliveries.forEach(del => {
    tbody.innerHTML += `
      <tr>
        <td>${del.item}</td>
        <td>${del.address}</td>
        <td>${del.status}</td>
      </tr>`;
  });
}

// MAP
const map = L.map('map').setView([8.5014, 123.3345], 10); // default to Zamboanga Peninsula
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map by OpenStreetMap',
  maxZoom: 19,
}).addTo(map);

let marker;
function locateOnMap() {
  const input = document.getElementById('truckLocationInput').value.trim();
  if (!input) return alert("Please enter a location.");

  // If coordinates
  const coordMatch = input.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lng = parseFloat(coordMatch[3]);
    setMapMarker(lat, lng);
  } else {
    // Use basic Nominatim API
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data[0]) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setMapMarker(lat, lon);
        } else {
          alert("Location not found.");
        }
      });
  }
}

function setMapMarker(lat, lng) {
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lng]).addTo(map).bindPopup("Truck Here").openPopup();
  map.setView([lat, lng], 14);
}
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        // Add loading state
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.textContent;
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;
        setTimeout(() => {
    alert('Login functionality would be implemented here!');
    loginBtn.textContent = originalText;
    loginBtn.disabled = false;
}, 1500);
setTimeout(() => {
    // Simulate successful login and redirect to index.html
    window.location.href = 'index.html';
}, 1500);



        // Simulate login process
        setTimeout(() => {
            // After successful login, redirect to index.html
            window.location.href = 'index.html';
        }, 1500);
    }
});
