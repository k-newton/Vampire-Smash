#!/bin/bash

# Change to the directory where this script is located
cd "$(dirname "$0")"

# Display a colorful header
echo ""
echo "🎮 Vampire Smash Game Server 🎮"
echo "=================================="
echo "✨ Starting your game server..."
echo ""

# Kill any existing server on port 8000
if lsof -i:8000 > /dev/null; then
  echo "🔄 Closing previous server..."
  kill $(lsof -ti:8000)
  sleep 1
fi

# Start the server
echo "🚀 Server starting on http://localhost:8000"
echo "📱 Open this URL in your browser to play"
echo "⚠️ This terminal window must stay open while playing"
echo "📝 Press Ctrl+C to stop the server when done"
echo "=================================="
echo ""

# Start the server
python3 -m http.server 8000

# Exit message (will only show if user closes with Ctrl+C)
echo ""
echo "🛑 Game server stopped"
echo "=================================="