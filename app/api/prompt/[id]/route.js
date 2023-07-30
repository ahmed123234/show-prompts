import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { stringify } from "postcss";

// GET (rread)
export const GET = async(request, {params}) => {
    try {
        console.log("inside get request", params.id);
       await connectToDB();
       const promot = await Prompt.findById(params.id).populate('creator');

       if (!promot) {
        return new Response("Prompt not found", { status: 404 })
       }
       console.log("prompt", promot);
       return new Response(JSON.stringify(promot), { status: 200 })

    } catch(err) {
        console.log(err.message);
        return new Response("failed to fetch all prompts", { status: 500})
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json(); 

    console.log("inside update the propmt");

    try {

        const exisitingPrompt = await Prompt.findById(params.id);
        if (!exisitingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }
        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;
        await exisitingPrompt.save();
        console.log("the post is updated successfully")
        return new Response(JSON.stringify(exisitingPrompt), { status: 200 })
    } catch(err) {
        console.log(err);
        return new Response("failed to fetch all prompts", { status: 500})
    }
} 
// DELETE (delete)

export const DELETE = async (request, { params }) => {

    try {
        await Prompt.findByIdAndRemove(params.id);
    
        return new Response(JSON.stringify("Prompt deleted successfully"), { status: 200 })
    } catch(err) {
        console.log(err);
        return new Response("failed to fetch all prompts", { status: 500})
    }
}