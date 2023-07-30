import Prompt from "@models/prompt"
import { connectToDB  } from "@utils/database";

// params are populated if you pass  dynamic variables into the url 
export const GET = async(request, { params }) => {
    try {
       await connectToDB();
       const promots = await Prompt.find({ creator: params.id }).populate('creator');
       return new Response(JSON.stringify(promots), { status: 200 })

    } catch(err) {
        console.log(err.message);
        return new Response("failed to fetch all prompts", { status: 500})
    }
}