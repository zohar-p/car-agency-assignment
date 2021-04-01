import mongoose from 'mongoose'
const { MONGO_CONNECTION_STRING } = process.env

export const connectToDb = async (): Promise<void> => {
    if (!MONGO_CONNECTION_STRING) { throw new Error('Mongo connection string is missing from env vars')}
    mongoose.connect(
      MONGO_CONNECTION_STRING,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Connected to Mongo successfully')
}