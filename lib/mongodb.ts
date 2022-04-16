import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// };

let client : MongoClient, clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please Add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoCLientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;