"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const location_routes_1 = __importDefault(require("./routes/location.routes"));
const sos_routes_1 = __importDefault(require("./routes/sos.routes"));
const contacts_routes_1 = __importDefault(require("./routes/contacts.routes"));
const cors_1 = __importDefault(require("cors"));
const sosdetection_1 = __importDefault(require("./routes/sosdetection"));
const signup_1 = __importDefault(require("./routes/signup"));
const signin_1 = __importDefault(require("./routes/signin"));
const me_1 = __importDefault(require("./routes/me"));
const activesos_route_1 = __importDefault(require("./routes/activesos.route"));
const cancelSOS_routes_1 = __importDefault(require("./routes/cancelSOS.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/', signup_1.default);
app.use('/', signin_1.default);
app.use('/', me_1.default);
app.use('/api/sos', cancelSOS_routes_1.default);
app.use("/api/location", location_routes_1.default);
app.use("/api/sos", activesos_route_1.default); //active hai ya nhi
app.use("/api/sos", sos_routes_1.default); //start
app.use("/api/emergency-contacts", contacts_routes_1.default);
app.use('/', sosdetection_1.default);
app.get("/health", (req, res) => {
    res.send("SOS System Backend Running 🚑");
});
app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on http://localhost:3000");
});
//# sourceMappingURL=app.js.map