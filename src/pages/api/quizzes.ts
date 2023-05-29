import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (req: any, res: any) => {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === "POST") {
    // Create
    try {
      const { question, answer } = req.body;
      const quiz = { question, answer };

      await db.collection("quizzes").insertOne(quiz);
      res.status(200).json({ message: "Quiz added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding quiz." });
    }
  } else if (req.method === "PUT") {
    // Update
    try {
      const { id, question, answer } = req.body;
      const result = await db
        .collection("quizzes")
        .updateOne({ _id: new ObjectId(id) }, { $set: { question, answer } });

      res.status(200).json({ message: "Quiz updated successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating quiz." });
    }
  } else if (req.method === "DELETE") {
    // Delete
    try {
      const { id } = req.query;

      console.log("id", id);
      await db.collection("quizzes").deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ message: "Quiz deleted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting quiz." });
    }
  } else if (req.method === "GET") {
    // List
    try {
      const quizzes = await db.collection("quizzes").find({}).toArray();

      res.status(200).json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching quizzes." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
};
