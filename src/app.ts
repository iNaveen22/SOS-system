import "dotenv/config"
import express from "express";
import locationRoutes from "./routes/location.routes";
import sosRoutes from "./routes/sos.routes";
import contactsRoutes from "./routes/contacts.routes";
import cors from 'cors';
import sosDetectionRoutes from './routes/sosdetection';
import signup from './routes/signup';
import signin from './routes/signin';
import meroutes from './routes/me';
import sosActive from './routes/activesos.route';
import cancelRouter from "./routes/cancelSOS.routes"


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.use('/', signup);
app.use('/', signin);
app.use('/', meroutes);
app.use('/api/sos', cancelRouter);
app.use("/api/location", locationRoutes);
app.use("/api/sos", sosActive);//active hai ya nhi
app.use("/api/sos", sosRoutes);//start
app.use("/api/emergency-contacts", contactsRoutes);

app.use('/', sosDetectionRoutes);

app.get("/health", (req, res) => {
  res.send("SOS System Backend Running 🚑");
});

app.listen(3000,'0.0.0.0', () => {
  console.log("Server running on http://localhost:3000");
}); 
