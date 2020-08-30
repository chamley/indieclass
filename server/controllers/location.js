const { fetchRequest } = require('../apiService');

exports.getLatLng = async (req, res) => {
  try {
    await fetchRequest(req.params.place_id).then(async (result) => {
      const locationEntry = {
        lat: result.result.geometry.location.lat,
        lng: result.result.geometry.location.lng,
      };
      res.json(locationEntry);
    });
    res.status(201);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};
