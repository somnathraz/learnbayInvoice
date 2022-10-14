// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const { username, password } = req.body;

  const client = new MongoClient(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const col = client.db("learnbay").collection("users");
    let user = await col.findOne({ email: username });

    // If no username, user doesn't exist

    if (user === null) {
      res.status(404).json({ message: "No user found" });
    } else {
      const passWordMatch = await bcrypt.compare(password, user.password);
      if (passWordMatch)
        res
          .status(200)
          .json({ token: user.email, role: user.role, team: user.team });
      else res.status(401).json({ message: "password mismatch" });
    }
  } catch (err) {
    const { response } = err;
    response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(500).json({ message: err.message });
  }

  // Disconnect from database
  client.close();
}
