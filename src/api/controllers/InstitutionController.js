import Institution from "../models/Institution";
import Location from "../models/Location";


export default {

  getInstitutions(req, res) {
    Institution.find({})
      .populate("location")
      .exec((err, institutions) => {
        if (err) {
          throw err;
        } else {
          res.json({ institutions });
        }
      });
  },

  createInstitution(req, res) {
    const requestData = req.body;

    Location
      .findOne({
        country: (requestData.country) ? requestData.country : /.*/,
        province: (requestData.province) ? requestData.province : /.*/,
        city: (requestData.city) ? requestData.city : /.*/,
      })
      .exec((err, location) => {
        if (err) {
          throw err;
        } else {
          const institution = new Institution();
          institution.name = requestData.name;
          institution.location = location;
          institution.save((error) => {
            if (error) {
              res.json({ success: false, message: err.message });
            } else {
              res.json({ success: true, message: "Instituion Created!" });
            }
          });
        }
      });
  },

};
