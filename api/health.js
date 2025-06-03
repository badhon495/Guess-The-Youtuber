// Health check endpoint for Netlify Functions
exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'Content-Type': 'application/json'
    };
    
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }
    
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            status: 'OK', 
            timestamp: new Date().toISOString(),
            youtube_api_key: process.env.YOUTUBE_API_KEY ? 'Configured' : 'Missing',
            environment: process.env.NETLIFY ? 'netlify' : 'unknown',
            message: 'API is working properly on Netlify'
        })
    };
};
