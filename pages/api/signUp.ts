import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import bcrypt from 'bcryptjs';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { email, password } = request.body;  
    const mongodbUri = process.env.MONGODB_URI;

    // Validate email and password
    if (!email || !email.includes('@') || !password) {
      return response.status(422).json({message: 'Invalid Data'});
    }

    const client = await MongoClient.connect(mongodbUri);
    const db = client.db();
    const existingUser = await db.collection('users').findOne({email: email});

    // Send error response if duplicate user is found
    if (existingUser) {
      client.close();
      return response.status(422).json({ message: 'User already exists' });
    }

    const status = await db.collection('users').insertOne({
      name: null,
      email,
      password: await bcrypt.hash(password, 10),
      image: 'new-user-icon.png',
      bio: null,
      phone: null
    });

    client.close();
  
    return response.status(201).json({ message: 'User created', id: status.insertedId });
  }

  response.status(500).json({ message: 'Route not valid' });
}