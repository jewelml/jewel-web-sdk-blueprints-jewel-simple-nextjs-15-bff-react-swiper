const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3004;

// Configuration
const JEWEL_ML_INTEGRATION_ID = '67fd95260740ccc4ec658d03';
const JEWEL_ML_BASE_URL = 'https://repersonalize.jewelml.io/c/p';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'jewel-bff-server-nextjs15' });
});

// Recommendations endpoint
app.get('/api/recommendations', async (req, res) => {
  try {
    const { item_id, models } = req.query;
    
    // Validate required parameters
    if (!item_id) {
      return res.status(400).json({ 
        error: 'Missing required parameter: item_id' 
      });
    }
    
    if (!models) {
      return res.status(400).json({ 
        error: 'Missing required parameter: models' 
      });
    }
    
    // Parse models (comma-separated string)
    const modelList = models.split(',').map(m => m.trim());
    
    // Make parallel API calls for each model
    const apiCalls = modelList.map(async (model) => {
      const apiUrl = `${JEWEL_ML_BASE_URL}/${JEWEL_ML_INTEGRATION_ID}/l?model=${encodeURIComponent(model)}&item_id=${encodeURIComponent(item_id)}&minimum_items=2&number_of_placements=20`;
      
      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
          model,
          data,
          error: null
        };
      } catch (error) {
        console.error(`Error fetching data for model ${model}:`, error.message);
        return {
          model,
          data: null,
          error: error.message
        };
      }
    });
    
    const results = await Promise.all(apiCalls);
    
    // Return organized response
    res.json({
      success: true,
      item_id,
      models: modelList,
      results
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Jewel BFF Server (Next.js 15) running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/recommendations`);
});

module.exports = app;