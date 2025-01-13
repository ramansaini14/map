$.ajax({
  url: "./mapData.json",
  datatype: "JSON",
  method: "GET",
  success: (data) => {
    getData(data);
  },
});

function getData(data) {
  //   let lengthOfData = data.length;
  //       let long = data[i].longitude;
  //       let lat = data[i].latitude;
  //             maptilersdk.config.apiKey = "MoSLz5r1fpiogdHZ3kM6";
  //             const map = new maptilersdk.Map({
  //           container: "map",
  //           style: maptilersdk.MapStyle.BASIC,
  //           center: [lat,long],
  //           zoom: 4,
  //         });

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
    map.on("load", async function () {
      const image = await map.loadImage(
        "./assets/image.png",
        async function (error, image) {
          map.addImage("plane", image.data);
          const geojson = await maptilersdk.data.post(`${data}`);
          console.log("working here");
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
