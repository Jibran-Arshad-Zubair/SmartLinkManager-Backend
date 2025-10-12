import express from 'express';
import dotenv from 'dotenv';
import AuthRouter from './src/routes/auth/auth.routes.js';
import SiteRouter from './src/routes/sites/site.routes.js';
import cors from 'cors';
import aiRoutes from "./src/routes/ai/aiRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", AuthRouter);
app.use("/api", SiteRouter); 
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});