const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static directory for file and material uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'SkillNest API',
    module: 'Module 1 - Course & Learning Material Management',
    author: 'L.M.R.C.Bandara (SEU/IS/22/ICT/113)',
    timestamp: new Date().toISOString(),
  });
});

// Import route modules
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const topicRoutes = require('./routes/topicRoutes');
const materialRoutes = require('./routes/materialRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Nested routes for topics & materials
app.use('/api/courses/:courseId/topics', topicRoutes);
app.use('/api/topics', topicRoutes);

app.use('/api/topics/:topicId/materials', materialRoutes);
app.use('/api/materials', materialRoutes);

// 404 handler for undefined API routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[SkillNest Server Error]:', err.stack || err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('================================================================');
  console.log(` SkillNest API - Module 1 (Course & Learning Material Management)`);
  console.log(` Developed by: L.M.R.C.Bandara (SEU/IS/22/ICT/113)`);
  console.log(` Server running on: http://localhost:${PORT}`);
  console.log('================================================================');
});

module.exports = app;

