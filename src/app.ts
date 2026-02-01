import express from "express";
import locationRoutes from "./routes/location.routes";
import sosRoutes from "./routes/sos.routes";
import contactsRoutes from "./routes/contacts.routes";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/location", locationRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/emergency-contacts", contactsRoutes);

app.get("/health", (req, res) => {
  res.send("SOS System Backend Running 🚑");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
