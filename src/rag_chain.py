from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

def create_rag_chain(vector_store):

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0
    )

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 4}
    )

    return retriever, llm