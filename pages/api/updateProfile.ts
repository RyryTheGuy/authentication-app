import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcryptjs';
import { User } from "next-auth";
import { EditProfileInputs } from "../../components/EditProfileForm/EditProfileForm";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'PUT') {
    const { oldProfile, updatedInfo }: {oldProfile: User, updatedInfo: EditProfileInputs} = request.body;  
    const mongodbUri = process.env.MONGODB_URI;
    const client = await MongoClient.connect(mongodbUri);
    const db = client.db();
    const newEmailUser = await db.collection('users').findOne({email: updatedInfo.email});
    const currentUser = await db.collection('users').findOne({email: oldProfile.email});

    // Send error response if there is a different user with the new email
    if (newEmailUser && 
        newEmailUser._id.toString() !== currentUser._id.toString() 
      ) {
      client.close();
      return response.status(422).json({ message: 'Unable to update profile' });
    }

    // Must know their current password to edit their information
    const passwordCheck = await bcrypt.compare(updatedInfo.currentPassword, currentUser.password);
    if (!passwordCheck) {
      return response.status(403).json({ error: 'password', message: 'Incorrect password'});
    }

    if (updatedInfo.newPassword) {
      console.log(updatedInfo);
      console.log(updatedInfo.name.length ? updatedInfo.name : 'empty');
      
      await db.collection('users').updateOne({email: oldProfile.email}, {
        name: updatedInfo.name.length ? updatedInfo.name : null,
        email: updatedInfo.email,
        password: await bcrypt.hash(updatedInfo.newPassword, 10),
        image: 'new-user-icon.png', // todo: update with new image
        bio: updatedInfo.bio.length ? updatedInfo.bio : null,
        phone: updatedInfo.phone.length ? updatedInfo.phone : null,
      });

      return response.status(200).json({});
    } else {
      await db.collection('users').updateOne({email: oldProfile.email}, {
        name: updatedInfo.name,
        email: updatedInfo.email,
        password: '...',
        image: 'new-user-icon.png',
        bio: null,
        phone: null
      });
    }

    client.close();
  
    return response.status(201).json({ message: 'User updated' });
  }

  response.status(500).json({ message: 'Route not valid' });
}