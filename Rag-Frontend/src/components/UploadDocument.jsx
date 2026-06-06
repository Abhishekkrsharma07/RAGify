import { useState } from "react";
import { motion } from "framer-motion";

function UploadDocument() {

  const [file, setFile] = useState(null);

  const uploadFile = async () => {

    if (!file) return;

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const response = await fetch(
      "http://localhost:5000/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    alert(data.message);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="max-w-5xl mx-auto"
    >
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Upload PDF
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
          className="w-full text-gray-300"
        />

        <motion.button
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={uploadFile}
          className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-bold"
        >
          Upload PDF
        </motion.button>

      </div>
    </motion.div>
  );
}

export default UploadDocument;