import { connectToDatabase } from "../../../lib/mongodb";
import bcrypt from "bcrypt";

const saltRounds = 12;

export default async function handler(req, res) {
  const { email, password, role, team } = req.body;
  console.log(email, password, role, team);

  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    try {
      const usernameConflict = await db.collection("users").findOne({
        email,
      });
      if (usernameConflict) {
        res.status(409).json({ message: "email already taken" });
      } else {
        // Hash password
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert user into database
        const result = await db.collection("users").insertOne({
          email: email,
          password: passwordHash,
          role: role,
          team: team,
        });

        // Send all-clear with _id as token
        res.status(200).json({
          token: result.insertedId.toString(),
          email,
          password,
          role,
          team,
          message: "user created Successful",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
