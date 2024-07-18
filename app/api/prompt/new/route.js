import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    if(!userId) {
        return new Response({message: "You are not allowed to access the resource"}, { status: 403 });
    }
    if(!prompt || !tag) {
        return new Response({message: "Missing parameters"}, { status: 400 });
    }
    try {
        await connectToDB();
        // TODO add logic to create post in database and return success message
       const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {
            status: 201
        }) 

    } catch(err) {
        console.log("Error: ", err);
        return new Response({ error: 'Failed to create a new prompt' }, { status: 500 });
    }
}