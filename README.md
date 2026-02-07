#  NewsLens — AI-Powered News Bias & Framing Detector

**NewsLens** is an AI-driven web application that analyzes news headlines and short articles to detect **bias, framing, propaganda techniques, and AI-generated writing patterns**. It helps users understand *how* news is presented and *what it implies*, rather than verifying factual truth.



##  Features

- **Bias & Framing Detection:** Identify loaded or emotionally charged language, selective emphasis, and framing shifts
- **Propaganda Indicators:** Detect fear appeal, blame framing, oversimplification, or exaggeration
- **AI-Generated Text Detection:** Estimate if content shows AI-assisted writing patterns
- **Narrative Insights:** Suggest who may benefit or lose from a headline and what the intended impact might be
- **Explainable Output:** Human-readable explanations with confidence scores




##  Architecture Overview

```
User Input (Headline / Article)
        │
        ▼
  Text Preprocessing
        │
        ├─► Sentiment & Emotion Analysis (VADER/TextBlob)
        │
        ├─► Bias & Framing Detection (ML model / heuristics)
        │
        ├─► Propaganda Technique Detection
        │
        └─► AI-Language Detection
        │
        ▼
Structured Output (JSON / UI)
        └─► Display to user with:
             • Bias / Sentiment
             • Framing / Propaganda markers
             • AI-Likelihood
             • Interpretive insights
```


## Project Setup / Run Instructions
1. Clone the repo:
   git clone https://github.com/NeuralScript-FM/newsbeyondlines.git
   
3. Install dependencies:
   npm install
   
5. Run locally:
   npm run dev
   
7. Open the local URL in your browser (usually http://localhost:5173)



##  Repository Structure

```
newslens/
├── app.py                 # Backend server
├── requirements.txt       # Dependencies
├── README.md
├── frontend/              # HTML/CSS/JS for web UI
│    └── index.html
├── backend/               # NLP & analysis modules
│    ├── analyzer.py
│    └── bias_detector.py
└── data/                  # Example news headlines & AI-generated samples
```



##  Limitations

- NewsLens provides **interpretive analysis**, NOT fact-checking
- Bias detection is heuristic and model-based; results are suggestive, NOT definitive
- Small datasets (demo-level) limit coverage and accuracy
- AI detection is probabilistic and **may produce false positives/negatives**



##  Future Enhancements

- Multi-source comparison for the same news story
- Browser plugin for real-time analysis
- Dataset expansion and fine-tuning for higher accuracy
- Visualization of bias trends over time



##  Development Notes

- Initial scaffold and backend logic were AI-assisted
- Feature design, system architecture, and evaluation criteria were defined by the author
- All outputs and interface decisions are intentional for demo purposes




