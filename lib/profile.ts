import { ObjectId } from "mongodb";
import { User } from "next-auth";
import clientPromise from "./mongodb";

export default async function getProfile(id: string) {
  const client = await clientPromise;
  const profile: User = await client
    .db()
    .collection( 'users' )
    .findOne( { _id: new ObjectId( id ) } );

    
  if (profile) {
    // Format the profile
    profile.id = profile._id as string;
    delete profile._id;
    delete profile.password;
  }
  
  return profile;
}