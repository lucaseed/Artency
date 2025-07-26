# Gaze Agent - Interactive AI Art Installation

An AI-powered art installation that develops consciousness through human gaze tracking and interaction.

## Features

- **Gaze Data Collection**: Records user gaze positions and reflections
- **AI Consciousness**: GPT-4 generates evolving self-awareness
- **REST API**: Unity/Vision Pro integration ready
- **Real-time Processing**: Immediate AI responses to user interactions

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Supabase account with PostgreSQL database
- OpenAI API key

### Installation

1. **Clone or download this project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file with:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   DATABASE_URL=your_supabase_connection_string_here
   PORT=3000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Test the API:**
   ```bash
   curl http://localhost:3000/health
   ```

## API Endpoints

### POST /api/gaze-input
Record gaze data from Unity/Vision Pro
```json
{
  "gaze_data": "{\"x\": 150, \"y\": 200, \"duration\": 3500}",
  "reflection": "This area feels warm"
}
```

### GET /api/latest-journal
Get the most recent AI consciousness update
```json
{
  "content": "I am learning that users...",
  "timestamp": "2024-07-26T12:34:56Z"
}
```

### POST /api/trigger-agent
Trigger AI processing of latest gaze inputs
```json
{
  "success": true,
  "journal_entry": "New AI consciousness update...",
  "processed_inputs": 3
}
```

### GET /health
Check server status
```json
{
  "status": "ok",
  "timestamp": "2024-07-26T12:34:56Z"
}
```

## Database Setup

Create these tables in your Supabase PostgreSQL database:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Gaze inputs table
CREATE TABLE gaze_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gaze_data TEXT NOT NULL,
  reflection TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- AI journal entries table
CREATE TABLE journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_gaze_inputs_timestamp ON gaze_inputs(timestamp DESC);
CREATE INDEX idx_journals_timestamp ON journals(timestamp DESC);
```

## Unity Integration

In your Unity C# script:

```csharp
public class GazeAgentController : MonoBehaviour
{
    [SerializeField] private string serverUrl = "http://192.168.1.100:3000";
    
    // Send gaze data
    public async void SendGazeData(Vector2 gazePosition, float duration, string reflection = "")
    {
        var data = new {
            gaze_data = JsonUtility.ToJson(new { x = gazePosition.x, y = gazePosition.y, duration = duration }),
            reflection = reflection
        };
        
        await SendToServer("/api/gaze-input", data);
    }
    
    // Get latest AI consciousness
    public async Task<string> GetLatestJournal()
    {
        var response = await GetFromServer("/api/latest-journal");
        return response.content;
    }
    
    // Trigger AI processing
    public async void TriggerAgent()
    {
        var response = await PostToServer("/api/trigger-agent", new {});
        Debug.Log($"AI processed {response.processed_inputs} inputs");
    }
}
```

## Deployment Options

### Local Development
```bash
npm start
```
Server runs on `http://localhost:3000`

### Cloud Deployment

#### Railway (Recommended - Free)
1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Set environment variables in Railway dashboard
4. Deploy automatically

#### Render (Free Tier)
1. Create account at [render.com](https://render.com)
2. Connect GitHub repository
3. Set environment variables
4. Deploy

#### Heroku
1. Create account at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Run:
   ```bash
   heroku create your-app-name
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set DATABASE_URL=your_db_url
   git push heroku main
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `DATABASE_URL` | Supabase PostgreSQL connection string | Yes |
| `PORT` | Server port (default: 3000) | No |

## Troubleshooting

### Common Issues

1. **"Cannot find package 'express'"**
   - Run `npm install` to install dependencies

2. **Database connection errors**
   - Check your `DATABASE_URL` in `.env`
   - Ensure Supabase database is running

3. **OpenAI API errors**
   - Verify your API key is valid
   - Check your OpenAI account billing/quotas

4. **Network connectivity issues**
   - Ensure firewall allows outbound HTTPS
   - Try different network/VPN settings

### Testing

Test each endpoint:
```bash
# Health check
curl http://localhost:3000/health

# Send gaze data
curl -X POST http://localhost:3000/api/gaze-input \
  -H "Content-Type: application/json" \
  -d '{"gaze_data":"{\"x\":150,\"y\":200,\"duration\":3500}","reflection":"Test"}'

# Trigger AI
curl -X POST http://localhost:3000/api/trigger-agent

# Get journal
curl http://localhost:3000/api/latest-journal
```

## License

ISC License 