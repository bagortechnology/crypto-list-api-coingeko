
// Function to display crypto assets
const displayCryptoAssets = (assets) => {
    const cryptoListingsContainer = document.getElementById('cryptoListings');
    cryptoListingsContainer.innerHTML = '';
  
    let count = 0; // Track the number of displayed cryptocurrencies
  
    // Loop through each crypto asset
    assets.forEach(crypto => {
      // Create HTML elements for each crypto asset
      const cryptoItem = document.createElement('div');
      cryptoItem.className = 'container crypto-item p-4 mb-4';
  
      const row = document.createElement('div');
      row.className = 'row g-4';
  
      const col = document.createElement('div');
      col.className = 'col-sm-12 col-md-8 d-flex align-items-center';
  
      const logoImg = document.createElement('img');
      logoImg.src = 'https://usethebitcoin.com/wp-content/uploads/2018/03/CoinGecko.png';
      logoImg.alt = 'currency logo';
      logoImg.className = 'flex-shrink-0 img-fluid border rounded';
      logoImg.style.width = '80px';
      logoImg.style.height = '80px';
  
      const cryptoInfo = document.createElement('div');
      cryptoInfo.className = 'text-start ps-4';
  
      const cryptoName = document.createElement('span');
      cryptoName.className = 'me-3';
      cryptoName.innerHTML = `<i class="fa fa-coins me-2"></i>Crypto Name: ${crypto.name}`;
  
      const cryptoUnit = document.createElement('span');
      cryptoUnit.className = 'me-3';
      cryptoUnit.innerHTML = `<i class="fa fa-cube me-2" aria-hidden="true"></i>Crypto Unit: ${crypto.unit}`;
  
      const cryptoRate = document.createElement('h5');
      cryptoRate.className = 'mb-3 lead fw-bolder';
      cryptoRate.style.color = '#00660a';
      const formattedValue = crypto.value.toLocaleString();
      cryptoRate.innerHTML = `<i class="fa fa-money-bill-alt" aria-hidden="true"></i> Rate: ${formattedValue}`;
  
      // Append the elements to the DOM
      cryptoInfo.appendChild(cryptoRate);
      cryptoInfo.appendChild(cryptoName);
      cryptoInfo.appendChild(cryptoUnit);
  
      col.appendChild(logoImg);
      col.appendChild(cryptoInfo);
  
      row.appendChild(col);
  
      cryptoItem.appendChild(row);
  
      cryptoListingsContainer.appendChild(cryptoItem);
  
      count++;
  
      if (count >= 4) {
        // Displayed at least four cryptocurrencies, exit the loop
        return;
      }
    });
  };
  
  // Fetch data from the API
  fetch('https://api.coingecko.com/api/v3/exchange_rates')
    .then(response => response.json())
    .then(data => {
      // Get the rates object from the API response
      const rates = data.rates;
  
      // Convert rates object to an array of crypto assets
      const assets = Object.values(rates);
  
      // Display at least four crypto assets
      displayCryptoAssets(assets);
  
      // Attach the search functionality to the search button
      const searchButton = document.querySelector('.search-btn');
      searchButton.addEventListener('click', searchCrypto);
    })
    .catch(error => console.error(error));
  
  // Function to filter crypto assets based on the search input
  const searchCrypto = () => {
    const searchInput = document.getElementById('job-search').value.toLowerCase();
    const cryptoListingsContainer = document.getElementById('cryptoListings');
  
    // Remove previous search results
    cryptoListingsContainer.innerHTML = '';
  
    // Fetch data from the API
    fetch('https://api.coingecko.com/api/v3/exchange_rates')
      .then(response => response.json())
      .then(data => {
        // Get the rates object from the API response
        const rates = data.rates;
  
        // Loop through each crypto asset in the rates object
        Object.keys(rates).forEach(asset => {
          const crypto = rates[asset];
  
          // Check if the crypto name or unit contains the search input
          if (crypto.name.toLowerCase().includes(searchInput) || crypto.unit.toLowerCase().includes(searchInput)) {
            // Create HTML elements for each crypto asset
            const cryptoItem = document.createElement('div');
            cryptoItem.className = 'container crypto-item p-4 mb-4';
  
            const row = document.createElement('div');
            row.className = 'row g-4';
  
            const col = document.createElement('div');
            col.className = 'col-sm-12 col-md-8 d-flex align-items-center';
  
            const logoImg = document.createElement('img');
            logoImg.src = 'https://usethebitcoin.com/wp-content/uploads/2018/03/CoinGecko.png';
            logoImg.alt = 'currency logo';
            logoImg.className = 'flex-shrink-0 img-fluid border rounded';
            logoImg.style.width = '80px';
            logoImg.style.height = '80px';
  
            const cryptoInfo = document.createElement('div');
            cryptoInfo.className = 'text-start ps-4';
  
            const cryptoName = document.createElement('span');
            cryptoName.className = 'me-3';
            cryptoName.innerHTML = `<i class="fa fa-coins me-2"></i>Crypto Name: ${crypto.name}`;
  
            const cryptoUnit = document.createElement('span');
            cryptoUnit.className = 'me-3';
            cryptoUnit.innerHTML = `<i class="fa fa-cube me-2" aria-hidden="true"></i>Crypto Unit: ${crypto.unit}`;
  
            const cryptoRate = document.createElement('h5');
            cryptoRate.className = 'mb-3 lead fw-bolder';
            cryptoRate.style.color = '#00660a';
            const formattedValue = crypto.value.toLocaleString();
            cryptoRate.innerHTML = `<i class="fa fa-money-bill-alt" aria-hidden="true"></i> Rate: ${formattedValue}`;
  
            // Append the elements to the DOM
            cryptoInfo.appendChild(cryptoRate);
            cryptoInfo.appendChild(cryptoName);
            cryptoInfo.appendChild(cryptoUnit);
  
            col.appendChild(logoImg);
            col.appendChild(cryptoInfo);
  
            row.appendChild(col);
  
            cryptoItem.appendChild(row);
  
            cryptoListingsContainer.appendChild(cryptoItem);
          }
        });
      })
      .catch(error => console.error(error));
  };
  