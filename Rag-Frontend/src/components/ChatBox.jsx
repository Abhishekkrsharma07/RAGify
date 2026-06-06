import { useState } from "react";
import { motion } from "framer-motion";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {

    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
          }),
        }
      );

      const data = await response.json();

      setAnswer(data.answer);

    } catch (error) {
      setAnswer("Failed to connect backend.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto mt-10"
    >

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Ask Your PDF
        </h2>

        <textarea
          rows={5}
          className="w-full p-4 rounded-xl bg-slate-900/60 border border-slate-700 focus:outline-none focus:border-cyan-500 transition-all"
          placeholder="Ask anything about your uploaded PDF..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={askQuestion}
          className="mt-5 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 font-bold"
        >
          Ask AI
        </motion.button>

        {loading && (
          <div className="mt-6 flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-cyan-400 animate-bounce" />
            <div className="w-4 h-4 rounded-full bg-purple-400 animate-bounce delay-100" />
            <div className="w-4 h-4 rounded-full bg-pink-400 animate-bounce delay-200" />
            <span>Thinking...</span>
          </div>
        )}

        {answer && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="mt-8"
          >
            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">

              <h3 className="text-cyan-400 font-bold mb-3">
                AI Response
              </h3>

              <p className="leading-8 text-gray-200">
                {answer}
              </p>

            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}

export default ChatBox;