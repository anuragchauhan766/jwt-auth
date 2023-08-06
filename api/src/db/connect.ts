import { connect } from "mongoose";

connect(process.env.DATABASE!)
  .then(() => console.log("database connected successfully"))
  .catch((e) => console.log("Cannot connect to datatbase ", e));
