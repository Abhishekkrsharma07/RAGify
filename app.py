from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from src.embeddings import get_embeddings
from src.loader import load_pdf
from src.splitter import split_documents
from src.vector_store import create_vector_store
from src.rag_chain import create_rag_chain

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

vector_store = None
retriever = None
llm = None


@app.route("/")
def home():
    return jsonify({
        "message": "Backend Running"
    })


@app.route("/upload", methods=["POST"])
def upload_pdf():

    global vector_store
    global retriever
    global llm

    try:

        if "file" not in request.files:
            return jsonify({
                "error": "No file uploaded"
            }), 400

        file = request.files["file"]

        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(file_path)

        documents = load_pdf(file_path)

        print(
            f"Pages Loaded: {len(documents)}"
        )

        chunks = split_documents(
            documents
        )

        print(
            f"Chunks Created: {len(chunks)}"
        )

        embeddings = get_embeddings()

        vector_store = create_vector_store(
            chunks,
            embeddings
        )

        retriever, llm = create_rag_chain(
            vector_store
        )

        return jsonify({
            "message":
            "PDF uploaded successfully",
            "chunks":
            len(chunks)
        })

    except Exception as e:

        print("UPLOAD ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500


@app.route("/ask", methods=["POST"])
def ask_question():

    global retriever
    global llm

    try:

        if retriever is None:

            return jsonify({
                "answer":
                "Please upload a PDF first."
            })

        data = request.get_json()

        question = data["question"]

        docs = retriever.invoke(
            question
        )

        context = "\n\n".join(
            [
                doc.page_content
                for doc in docs
            ]
        )

        print("\nRetrieved Context:\n")
        print(context[:1000])

        prompt = f"""
You are a PDF assistant.

Answer ONLY from the context.

If answer is not found say:

'I could not find this information in the uploaded PDF.'

Context:
{context}

Question:
{question}
"""

        response = llm.invoke(
            prompt
        )

        return jsonify({
            "answer":
            response.content
        })

    except Exception as e:

        print(
            "ASK ERROR:",
            str(e)
        )

        return jsonify({
            "error":
            str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )