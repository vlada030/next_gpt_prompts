import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET single prompt

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const post = await Prompt.findOne({ _id: params.id }).populate("creator");

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};

// PATCH prompt

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt, { status: 200 }));
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE prompt

export const DELETE = async (req, { params }) => {
  try {
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleteed successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", {status: 500})
  }
};
