import mongoose, { model, Schema, Types, models } from "mongoose";

/**
 * models object is provided by the Mongoose library 
 * and stores all the registered models.
 * if a specific model "ex: User" already exists in the "models" object
 * it assigns the existing model to the "User" variable.
 * 
 * This prevents redefining the model and ensures that the existing model is reused 
 * 
 * if a specific model "ex: User" does'nt exists in the "models" object
 * the model function define in mongoose object is called to create a new model
 * 
 * The newly created model is assigned to the User variable 
 * 
 */

const UserSchema = new Schema({
    username: {
        type: String, 
        // unique: [true, 'Username is already exists!'],
        required: [true, 'Username is required!'], 
        // match: []
    }, 
    email: {
        type: String, 
        unique: [true, 'Email is already exists!'],
        required: [true, 'Email is required!']
    }, 
    image: String
})

const User = models.User || model('User', UserSchema)
export default User;