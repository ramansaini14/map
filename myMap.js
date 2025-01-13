$.ajax({
  url: "./mapData.json",
  datatype: "JSON",
  method: "GET",
  success: (data) => {
    getData(data);
  },
});

function getData(data) {
  let long = data[0].longitude;
  let lat = data[0].latitude;
  maptilersdk.config.apiKey = "MoSLz5r1fpiogdHZ3kM6";
  const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.BASIC,
    center: [135, -29.51],
    zoom: 4,
  });

  if (!lat && !long) {
    console.log(data[0].title);
  } else {
    for(let i=0; i<data.length; i++){
    const marker = new maptilersdk.Marker({
      color: "red",
      draggable: false,
    })
      .setLngLat([data[i].longitude, data[i].latitude])
      .addTo(map);
        
    }
    map.on("load", async function () {
      const image = await map.loadImage(
        "./assets/image.png",
        async function (error, image) {
          map.addImage("plane", image.data);
          const geojson = await fetch(data);
          map.addSource("airports", {
            type: "geojson",
            data: geojson,
          });
          map.addLayer({
            id: "airports",
            type: "symbol",
            source: "airports",
            layout: {
              "icon-image": "plane",
              "icon-size": ["*", ["get", "scalerank"], 0.01],
            },
            paint: {},
          });
        }
      );
    });
  }
}
