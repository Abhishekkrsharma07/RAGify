from langchain_google_genai import ChatGoogleGenerativeAI

def create_rag_chain(vector_store):

    llm = ChatGoogleGenerativeAI(
        model="models/gemini-1.5-flash",
        temperature=0.3
    )

    retriever = vector_store.as_retriever()

    return retriever, llm