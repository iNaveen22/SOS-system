"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_routes_1 = __importDefault(require("./routes/location.routes"));
const sos_routes_1 = __importDefault(require("./routes/sos.routes"));
const contacts_routes_1 = __importDefault(require("./routes/contacts.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/location", location_routes_1.default);
app.use("/api/sos", sos_routes_1.default);
app.use("/api/emergency-contacts", contacts_routes_1.default);
app.get("/health", (req, res) => {
    res.send("SOS System Backend Running 🚑");
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
//# sourceMappingURL=app.js.map