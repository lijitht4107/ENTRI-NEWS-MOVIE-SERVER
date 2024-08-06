import express from "express";
import  "dotenv/config";
import cors from "cors";
// import USERS from "./models/userModels.js";
import userRouter from "./routers/userRouter.js";
import employeeRouter from "./routers/employeeRouter.js";
import postRouter from "./routers/postRouter.js";
import path from 'path';
import mongoose from 'mongoose'

const app = express();
const PORT = process.env.PORT;

async function main() {
  
  await mongoose.connect(process.env.MONGODB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().then(console.log('connected to DB')).catch(err => console.log(err));


app.use(express.json());
app.use(cors());
app.use('/users', userRouter)
app.use('/employees',employeeRouter)
app.use('/post',postRouter)

const dirname = path.resolve()
app.use(express.static(path.join(dirname,'uploads')))

app.listen(PORT, () => {
  console.log(`listening PORT ${PORT}`);
});
