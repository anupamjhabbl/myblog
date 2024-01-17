import mongoose from "mongoose";

const connectToDb = async () => {
    mongoose.connect("mongodb://0.0.0.0:27017/myblogs", {useNewUrlParser:true}).then(
        () => {
            console.log("Connection established properly");
        }
    ).catch(
        (err) => {
            console.log("There is some problem in connecting to db");
            console.log(err);
        }
    )
}

export default connectToDb;