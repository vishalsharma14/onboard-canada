import Location from "../models/Location";
import indiaCityList from "../../../City List/india.json";

export default {

  /**
   * API to handle facebook callback
   * @param {*} req Request Object
   * @param {*} res Response Object
   */
  seedCityData(req, res) {
    // TODO: Add a check to verify user has access to the chatGroup
    let locations = [];
    let count = 0;
    // res.json(indiaCityList);
    indiaCityList.map((location) => {
      locations.push(new Location({
        city: location.city,
        province: location.province,
        country: location.country,
      }));
      count += 1;
      if (count >= 50) {
        count = 0;

        Location.collection.insert(locations, (error, docs) => {
          if (error) {
            throw error;
          } else {
            console.log("SAVED");
          }
        });

        locations = [];
      }
    });
    res.status(201).json({ success: "true" });
  },

};
