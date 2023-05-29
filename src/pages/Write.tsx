import { useEffect, useState } from "react";
import axios from "axios";

const Write = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("/api/quizzes");
      setQuizzes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const quiz = { question, answer };

    try {
      const res = await axios.post("/api/quizzes", quiz);

      console.log("res", res);

      setQuestion("");
      setAnswer("");
      fetchQuizzes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("id", id);
    try {
      const res = await axios.delete(`/api/quizzes?id=${id}`);
      console.log("res", res);
      fetchQuizzes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {quizzes.map((quiz: any) => (
          <li key={quiz._id}>
            Question: {quiz.question}, Answer: {quiz.answer}
            <button onClick={() => handleDelete(quiz._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Write;
