import Prompt from "@models/prompt"
import { connectToDB  } from "@utils/database";


export const GET = async(req) => {
    const query = req.query;
    "".substring("".indexOf("?"));

    // const queryParams = req.nextUrl.search.startWith();
    // const = url.split('?')
    // const path = req.nextUrl.search;

    // console.log("path is ", path[1]);
    
    try {
       await connectToDB();
  
       const promots = await Prompt.find({}).populate('creator');
       return new Response(JSON.stringify(promots), { status: 200 })

    } catch(err) {
        console.log(err.message);
        return new Response("failed to fetch all prompts", { status: 500})
    }
}