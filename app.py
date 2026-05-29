from dotenv import load_dotenv
load_dotenv()

from src.loader import load_pdf
from src.splitter import split_documents
from src.embeddings import get_embeddings
from src.vector_store import create_vector_store
from src.rag_chain import create_rag_chain

# Load PDF
documents = load_pdf("data/ml_book.pdf")

# Split text
chunks = split_documents(documents)

# Create embeddings
embeddings = get_embeddings()

# Create vector store
vector_store = create_vector_store(chunks, embeddings)

# Create retriever and LLM
retriever, llm = create_rag_chain(vector_store)

print("RAG Chatbot Ready!")
print("Type 'exit' to quit\n")

while True:

    query = input("Ask Question: ")

    if query.lower() == "exit":
        break

    # Retrieve relevant docs
    docs = retriever.invoke(query)

    # Combine retrieved text
    context = "\n".join([doc.page_content for doc in docs])

    # Create prompt
    prompt = f"""
    Answer the question using the context below.

    Context:
    {context}

    Question:
    {query}
    """

    # Gemini response
    try:
        response = llm.invoke(prompt)

        print("\nAnswer:")
        print(response.content)
        print("\n")

    except Exception as e:
        print("\nError:")
        print(e)
        print("\n")