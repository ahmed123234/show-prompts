import Prompt from "@models/prompt"
import { connectToDB  } from "@utils/database";

export const GET = async(req) => {
    const path = req.query;
    console.log("path is ", path);
    try {
       await connectToDB();
  
       const promots = await Prompt.find({}).populate('creator');
       return new Response(JSON.stringify(promots), { status: 200 })

    } catch(err) {
        console.log(err.message);
        return new Response("failed to fetch all prompts", { status: 500})
    }
}