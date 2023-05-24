import { connectToDB } from "../../../../utils/database"
import Prompt from "../../../../models/prompt";

export const GET = async (req,{params})=>{
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate("creator")

        if(!prompt) return new Response("Prompt Not Found",{status: 404});
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Internal Server Error", {status: 500});
    }
}

export const PATCH = async (request,{params})=>{
    const {prompt, tag}= await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id).populate("creator")

        if(!existingPrompt) return new Response("Prompt Not Found",{status: 404});

        //Update the prompt with new data
        existingPrompt.prompt= prompt;
        existingPrompt.tag= tag;
        await existingPrompt.save();
        return new Response('Successfully Update the prompt', {status: 200})
    } catch (error) {
        return new Response(" Error Updating Prompt", {status: 500});
    }
}
export const DELETE = async (req, {params})=>{
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id)
        return new Response ("Prompt Deleted Successfull",{status: 200});
    } catch (error) {
        return new Response ("Error Deleting Prompt",{status: 500});

    }
}