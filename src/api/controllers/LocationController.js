import Location from "../models/Location";


export default {

  getLocations(req, res) {
    const queryData = req.query;

    Location.find({
      country: (queryData.country) ? queryData.country : /.*/,
      province: (queryData.province) ? queryData.province : /.*/,
      city: (queryData.city) ? queryData.city : /.*/,
    }).exec((err, locations) => {
      if (err) {
        throw err;
      } else {
        res.json({ locations });
      }
    });
  },

  createLocation(req, res) {
    const requestData = req.body;

    const location = new Location();
    location.city = requestData.city;
    location.province = requestData.province;
    location.country = requestData.country;
    location.save((err) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        res.json({ success: true, message: "Location created!" });
      }
    });
  },

};
