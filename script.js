let selectedCategory = localStorage.getItem("selectedCategory") || "";

function displayProducts(data) {
  var productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear existing content

  // Find the selected category
  const selectedCategoryData = data.categories.find(
    (category) => category.category_name === selectedCategory
  );

  // Check if the selected category is found
  if (selectedCategoryData) {
    selectedCategoryData.category_products.forEach((product) => {
      // Creating product elements
      var productDiv = document.createElement("div");
      productDiv.classList.add("men-card");

      var badge_text = document.createElement("h6");
      badge_text.classList.add("badge-text");
      badge_text.textContent = product.badge_text;

      var imageElement = document.createElement("img");
      imageElement.src = product.image;
      imageElement.alt = product.title;

      var imageDiv = document.createElement("div");
      imageDiv.classList.add("image-div");
      imageDiv.appendChild(badge_text);
      imageDiv.appendChild(imageElement);

      var headingElement = document.createElement("h3");
      headingElement.textContent = product.title;

      var vendorElement = document.createElement("p");
      vendorElement.textContent = product.vendor;

      var dotSpan = document.createElement("h1");
      dotSpan.classList.add("dot-span");
      dotSpan.textContent = ".";

      var titleAndVendorDiv = document.createElement("div");
      titleAndVendorDiv.classList.add("TitleAndVendor");
      titleAndVendorDiv.appendChild(headingElement);
      titleAndVendorDiv.appendChild(dotSpan);
      titleAndVendorDiv.appendChild(vendorElement);

      var originalPrice = document.createElement("h4");
      originalPrice.textContent = `Rs.${product.price}.00`;

      var discountedPrice = document.createElement("h4");
      discountedPrice.classList.add("compare-at-price");
      discountedPrice.textContent = `${product.compare_at_price}.00`;

      var compare_at_price = parseInt(product.compare_at_price);
      var price = parseInt(product.price);

      var discountPercentage = Math.round(
        ((compare_at_price - price) / compare_at_price) * 100
      );

      var discountedPercentageElement = document.createElement("h4");
      discountedPercentageElement.classList.add("discount-price");
      discountedPercentageElement.textContent = `${discountPercentage}% Off`;

      var pricingDiv = document.createElement("div");
      pricingDiv.classList.add("price-div");
      pricingDiv.appendChild(originalPrice);
      pricingDiv.appendChild(discountedPrice);
      pricingDiv.appendChild(discountedPercentageElement);

      var cardButton = document.createElement("button");
      cardButton.textContent = "Add to Cart";

      productDiv.appendChild(imageDiv);
      productDiv.appendChild(titleAndVendorDiv);
      productDiv.appendChild(pricingDiv);
      productDiv.appendChild(cardButton);

      productContainer.appendChild(productDiv);
    });
  }
}

function selectCategory(category) {
  selectedCategory = category;

  const tabs = document.querySelectorAll(".section-tab a");
  tabs.forEach((tab) => {
    tab.classList.remove("selected");
  });

  const selectedTab = document.querySelector(
    `.section-tab a.${category.toLowerCase()}`
  );
  selectedTab.classList.add("selected");

  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Bad network response");
      }
      return res.json();
    })
    .then((data) => {
      displayProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
