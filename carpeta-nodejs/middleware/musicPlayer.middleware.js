import { player } from "../models/musicPlayer.model.js";

export const unSoloDoc = async (req, res, next) => {
    try {
        const id = req.params._id;
        const count = await player.countDocuments();

        if (count > 0) {
            await player.findOneAndDelete({}, { sort: { Date: -1 } });
        }

       
        return next();
    } catch (error) {
        console.log(error);
        next(error); 
    }
};