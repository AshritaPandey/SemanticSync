# SemanticSync | AI Similarity Analyzer

SemanticSync is a professional web application that analyzes the semantic similarity between two sentences using transformer-based NLP models.

## 📂 Project Structure
- `backend/`: Python FastAPI server and NLP logic.
- `frontend/`: React + Vite frontend with Tailwind CSS and Framer Motion.

## 🚀 How to Run

### 1. Prerequisites
- Python 3.8+
- Node.js & npm

### 2. Backend Setup
```bash
cd backend
# (Optional) Create a virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows

# Install dependencies
pip install fastapi uvicorn sentence-transformers scikit-learn pandas

# Start the server
python main.py
```
*Note: The first run will download the `all-MiniLM-L6-v2` model (~80MB).*

### 3. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the App
Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173` or `http://localhost:3000`).

---

## ⚡ Features
- **Semantic Mapping**: Highlights similar words across sentences.
- **Visual Meter**: Real-time score visualization.
- **Model Comparison**: See how BERT, GloVe, and Word2Vec compare.
- **History**: Keeps track of your previous analyses.
