# RAGify

This repository contains a full-stack Retrieval-Augmented Generation (RAG) application called **RAGify**. The app allows users to upload PDF documents and ask natural language questions based on the content of those documents.

## How RAGify is Useful  

RAGify solves a very common problem: **extracting specific information from long documents without reading them entirely.**

* **Saves Time:** Instead of manually reading a 100-page manual, research paper, or legal contract, you can ask questions like "What is the penalty for late payment?" and get instant answers.
* **Reduces AI Hallucinations:** RAGify forces the AI to look *only* at the text inside your PDF to answer your question. If the answer isn't in the PDF, it explicitly states that.
* **Focuses on Your Data:** It brings the power of advanced Large Language Models (LLMs) to your private or specific documents that the AI was never trained on.

## Key Technologies Used

**Backend (Python/Flask):**
*   **Flask & Flask-CORS:** Serves the REST API endpoints and handles Cross-Origin Resource Sharing.
*   **LangChain:** Orchestrates the entire RAG pipeline (document loading, splitting, vector storage, and querying).
*   **HuggingFace Embeddings:** Uses `sentence-transformers/all-MiniLM-L6-v2` to convert text chunks into vector embeddings.
*   **FAISS (faiss-cpu):** Acts as an in-memory vector database to store and retrieve document embeddings.
*   **Google Generative AI:** Uses the `gemini-2.5-flash` model for generating answers based on retrieved context.
*   **PyPDF:** Parses and loads text from user-uploaded PDF files.

**Frontend (React/Vite):**
*   **React:** Used for building the user interface.
*   **Vite:** Acts as the build tool and development server for the frontend.

## Codebase Structure

The codebase is cleanly divided into a backend (at the repository root) and a frontend (in the `Rag-Frontend/` directory).

### 1. Backend 
*   **`app.py`:** The main entry point for the Flask backend. It defines two core endpoints:
    *   `/upload`: Accepts a PDF file, saves it to `uploads/`, and triggers the chunking and embedding.
    *   `/ask`: Accepts a user's question, retrieves relevant context from FAISS, and prompts the Gemini LLM for an answer.
*   **`src/` directory:** Contains the modularized LangChain RAG pipeline.
    *   `loader.py`: Uses `PyPDFLoader` to extract text from the PDF.
    *   `splitter.py`: Splits the loaded text into smaller, manageable chunks.
    *   `embeddings.py`: Initializes the HuggingFace `all-MiniLM-L6-v2` embedding model.
    *   `vector_store.py`: Loads the chunked text and embeddings into a FAISS vector database.
    *   `rag_chain.py`: Connects the FAISS retriever and the Gemini LLM.
*   **`requirements.txt`:** Lists the Python dependencies required to run the backend.

### 2. Frontend
*   **`Rag-Frontend/` directory:** This is the Vite-based React project.
    *   `src/`: Contains the React application logic, organized into components, pages, and services.

## How to Run RAGify Locally

To run this application, you will need **Python** (for the backend), **Node.js** (for the frontend), and a free **Google Gemini API Key**.

### 1. Clone the Repository
```bash
git clone https://github.com/Abhishekkrsharma07/RAGify.git
cd RAGify
```

### 2. Set Up the Python Backend

```bash
# Create and activate a virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install the required Python packages
pip install -r requirements.txt
```

**Add your API Key:**
Create a file named `.env` in the root `RAGify` directory and add your Google Gemini API key:
```env
GOOGLE_API_KEY=your_actual_api_key_here
```

**Start the Backend:**
```bash
python app.py
```
*The backend should now be running on `http://localhost:5000`.*

### 3. Set Up the React Frontend
Leave the backend running and open a **new terminal window**. Navigate to the frontend folder.

```bash
cd Rag-Frontend

# Install the Node dependencies
npm install

# Start the frontend development server
npm run dev
```

### 4. Use the App
1. The frontend terminal will give you a local URL (usually `http://localhost:5173`). Open that link in your web browser.
2. Upload a PDF document using the UI.
3. Wait for the backend to chunk and embed the document.
4. Type your question in the chat interface to get answers based strictly on your PDF!
