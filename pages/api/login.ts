import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt, { compare } from 'bcryptjs';

interface NewUser {
  id: string;
}

interface ExistingUser {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, response: NextApiResponse) {
  const mongodbUri = process.env.MONGODB_URI;
  const body: NewUser | ExistingUser = req.body;

  const client = await MongoClient.connect(mongodbUri);
  const db = client.db();

  // New users automatically sign in after creating their account which sends the id of the created account
  if (isNewUser(body)) {
    const newUser = await db.collection('users').findOne({ _id: new ObjectId(body.id) });
    client.close();

    if (newUser) {
      console.log('Found New User', newUser);
      return response.status(201).json({ user: newUser, message: 'User found' });
    }

    console.log('Did not find New User', newUser);
    return response.status(500).json({ user: null, message: 'New User account not found...' }); 
  }

  // Existing Users have to sign in via email & password
  const existingUser = await db.collection('users').findOne({ email: body.email });
  client.close();

  if (!existingUser) {
    console.log('Did not find existing User', existingUser);
    return response.status(403).json({ user: null, message: 'Invalid email'});
  }
  
  const passwordCheck = await bcrypt.compare(body.password, existingUser.password);
  if (!passwordCheck) {
    console.log('Invalid password', passwordCheck);
    return response.status(403).json({ user: null, message: 'Invalid password'});
  }

  console.log('Found Existing User', existingUser);
  return response.status(201).json({ user: existingUser, message: 'User found' });
}

function isNewUser(user: NewUser | ExistingUser): user is NewUser {
  return (user as NewUser).id !== undefined;
}