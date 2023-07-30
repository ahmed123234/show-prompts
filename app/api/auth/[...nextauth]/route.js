/**
 * in this file we will set our auth providers 
 * such as google auth
*/
import { connectToDB } from "@utils/database";
import User from '@models/user'
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from 'next-auth/providers/facebook'

// console.log( "clientId: ", process.env.GOOGLE_ID,
//     "clientSecret: ",  process.env.GOOGLE_CLIENT_SECRET)

// to handle the authuntication we gonna create a handler function
const handler = NextAuth({
    // configure your authentication provider
    providers: [
        // visit https://console.cloud.google.com/ to get them
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENTID,
        //     clientSecret:process.env.FACEBOOK_SECRET
        // })
    ],
    callbacks: {
        async session({ session }) {
            // get the data about the user every single time to keep an exisiting and running session
            // so here we get the current user from the session
            const sessionUser = await User.findOne({email: session.user.email});
            console.log("the current user is", sessionUser);
            // updating the session and making sure u always know the online user
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({ profile }) {
            // keep in mind that every next.js route is serverless route
            // this means that it is a lambda function that opens up only when it gets called
            // so every time it's called you need to spin up the server and make a connection to the database 
            // so by this feature you don't have to keep the server running constantly
            // but we do have actually to make a connection to the database
            console.log("profile", profile);
            try {
               await connectToDB();
                // check if the user allready exists
                const userExists = await User.findOne({ email: profile.email });
    
                // if not, create a new user and save it in the db
                if(!userExists) {
                    console.log("user not exists");
                    // console.log("profile Info", profile);
                 const user =  await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });    

                    console.log("user is", user);
                }
    
                return true;
            } catch(err) {
                console.log(err.message);
                return false
            }
        }
    }
})

export { handler as GET, handler as POST };