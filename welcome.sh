#!/bin/bash

# Display welcome banner
cat << 'EOF'

    ____  __    ___   ___________  ____  _____
   / __ )/ /   /   | / ___/_  __/ / __ \/ ___/
  / __  / /   / /| | \__ \ / /   / /_/ /\__ \ 
 / /_/ / /___/ ___ |___/ // /   / _, _/___/ / 
/_____/_____/_/  |_/____//_/   /_/ |_|/____/  
                                               
       AI-Powered Code Review - v2.0.0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ QUICK START:

   ./start      → One-click launcher (easiest!)
   ./run.sh     → Interactive menu (9 options)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ FEATURES:

   • Multi-AI Consensus (GPT + Claude + Llama)
   • 20+ Languages Support
   • Security & CVE Scanning
   • Architecture Analysis
   • Web Dashboard
   • HTML Reports

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 DOCUMENTATION:

   cat START_HERE.md       → Beginner guide (5 min)
   cat QUICK_SUMMARY.txt   → Super quick summary

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 TIP: Just run './start' - everything is automatic!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Happy Coding! 🚀

EOF

# Make scripts executable if not already
chmod +x start run.sh quickstart.sh 2>/dev/null

echo ""
