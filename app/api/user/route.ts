import { NextResponse } from "next/server";
import { Pool } from "pg"; // PostgreSQL client

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "voters", // Your database name
  password: "1129970141",
  port: 5432,
});

export async function POST(req: Request) {
  try {
    const { username, userImage, hasVoted } = await req.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const client = await pool.connect();
    const query = `
      INSERT INTO users (username, userImage, hasVoted)
      VALUES ($1, $2, $3)
      RETURNING id, username;
    `;
    const values = [username, userImage || null, hasVoted || false];
    const result = await client.query(query, values);
    client.release();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Failed to save user details" }, { status: 500 });
  }
}
