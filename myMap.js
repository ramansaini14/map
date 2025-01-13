$.ajax({
  url: "./mapData.json",
  datatype: "JSON",
  method: "GET",
  success: (data) => {
    initializeMap(data);
  },
  error: (err) => {
    console.error("Failed to load JSON data", err);
  },
});

function initializeMap(data) {
  maptilersdk.config.apiKey = "MoSLz5r1fpiogdHZ3kM6"; 

  const map = new maptilersdk.Map({
    container: "map", 
    style: maptilersdk.MapStyle.BASIC, 
    center: [145.0, -37.8], 
    zoom: 5, 
  });

  data.forEach((property) => {
    if (property.latitude && property.longitude) {
      const latitude = parseFloat(property.latitude);
      const longitude = parseFloat(property.longitude);

      const marker = new maptilersdk.Marker({ color: "red" })
        .setLngLat([longitude, latitude])
        .addTo(map);

      const popupContent = `
        <div style="font-size: 14px; line-height: 1.5;">
          <h3>${property.title}</h3>
          <img src="${property.cover_img}" alt="Property Image" style="width: 100%; height: auto; margin-bottom: 10px;">
          <p><b>Address:</b> ${property.full_address}</p>
          <p><b>Price:</b> ${property.po_price}</p>
          <p><b>Bedrooms:</b> ${property.bedroom_count}</p>
          <p><b>Bathrooms:</b> ${property.bathroom_count}</p>
          <p><a href="${property.property_url}" target="_blank">View Property</a></p>
          <p>${property.propbasic_detail_one.description}</p>
        </div>
      `;

      const popup = new maptilersdk.Popup({ offset: 25 })
        .setHTML(popupContent)
        .setMaxWidth("300px");

      marker.setPopup(popup);
    }
  });
}
