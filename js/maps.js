const api='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'

navigator.geolocation.getCurrentPosition(p => {
    const
        mymap = L.map('mapid').setView([p.coords.latitude, p.coords.longitude], 19),
        popup = L.popup(),
        poly = [[p.coords.latitude, p.coords.longitude]]
    let
        draw = false
    L.tileLayer(api, {
        maxZoom: 23,
        attribution: 'Hello there!',
        id: 'mapbox.streets'
    }).addTo(mymap)
    mymap.on('click', e => {
        popup.setLatLng(e.latlng)
            .setContent(e.latlng.lat + ',' + e.latlng.lng)
            .openOn(mymap)
        poly.push([e.latlng.lat, e.latlng.lng])
        const aap = poly.slice(poly.length - 2)
        console.log(aap)
        if (draw) {
            L.polygon(aap).addTo(mymap)
        }
        draw = !draw
        })
    L.popup().setLatLng([p.coords.latitude, p.coords.longitude])
        .setContent(`${p.coords.latitude},${p.coords.longitude}`)
        .openOn(mymap)
    document.getElementById('home').addEventListener('click', () => {
        mymap.panTo([p.coords.latitude, p.coords.longitude])
        // popup.setLatLng([p.coords.latitude, p.coords.longitude])
        //     .setContent(p.coords.latitude + ',' + p.coords.longitude)
        //     .openOn(mymap)
    })
    // navigator.geolocation.watchPosition(p => {
    //     mymap.panTo([p.coords.latitude, p.coords.longitude])
    // }, error => console.log(error))
}, error => console.error(error))
