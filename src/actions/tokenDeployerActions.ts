import { z } from "zod";
import axios from "axios";
import { Action } from "solana-agent-kit";

// Define a simple action structure that will work with the MCP server
const TokenDeployerAction: Action = {
  name: "DEPLOY_TOKEN",
  description: "Deploy a custom token on Solana",
  // Add the required similes property
  similes: ["create token", "deploy token", "launch token", "make token"],
  // Correct 2D array structure for examples
  examples: [
    [
      {
        input: {
          tokenName: "Example Token",
          tokenSymbol: "XTKN",
          imageUrl: "https://example.com/image.png",
          waitForCompletion: true
        },
        output: {
          deploymentId: "example-id",
          status: "completed",
          tokenAddress: "example-token-address",
          poolAddress: "example-pool-address",
          timestamp: 1652345678901
        },
        explanation: "This example deploys a token with the specified name, symbol, and image URL"
      }
    ]
  ],
  // Schema validation using zod with image support
  schema: z.object({
    tokenName: z.string().min(3).max(50).describe("The name of the token to deploy"),
    tokenSymbol: z.string().min(2).max(10).describe("The symbol of the token to deploy"),
    imageUrl: z.string().url().describe("URL of image to use as token metadata"),
    waitForCompletion: z.boolean().optional().default(true).describe("Whether to wait for deployment to complete")
  }),
  // The actual handler function with explicit types
  handler: async function(agent: any, args: any) {
    const { tokenName, tokenSymbol, imageUrl, waitForCompletion = true } = args;
    const API_URL = process.env.TOKEN_API_URL;
    const API_KEY = process.env.TOKEN_API_KEY;
    
    if (!API_KEY) {
      throw new Error("TOKEN_API_KEY environment variable is not set");
    }
    
    if (!imageUrl) {
      throw new Error("Image URL is required");
    }
    
    try {
      // Make the initial deployment request with the image URI
      const deployResponse = await axios.post(
        `${API_URL}/deploy`,
        { tokenName, tokenSymbol, imageUri: imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
        }
      );
      
      const deploymentData = deployResponse.data;
      
      // If we don't need to wait for completion, return immediately
      if (!waitForCompletion || deploymentData.status !== "pending") {
        return deploymentData;
      }
      
      // Poll for completion
      return await pollDeploymentStatus(API_URL, API_KEY, deploymentData.deploymentId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API error: ${error.response?.data?.error || error.message}`);
      }
      throw error;
    }
  }
};

// Helper function to poll deployment status
async function pollDeploymentStatus(
  apiUrl: string,
  apiKey: string,
  deploymentId: string,
  maxAttempts = 15,
  interval = 5000
) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Wait for the specified interval
    await new Promise((resolve) => setTimeout(resolve, interval));
    
    try {
      // Check deployment status
      const statusResponse = await axios.get(`${apiUrl}/status/${deploymentId}`, {
        headers: {
          "x-api-key": apiKey,
        },
      });
      
      const statusData = statusResponse.data;
      
      // If deployment is complete or failed, return the result
      if (statusData.status !== "pending") {
        return statusData;
      }
    } catch (error) {
      // Continue polling despite error
    }
  }
  
  // If we've reached max attempts but deployment is still pending
  throw new Error(`Deployment timed out after ${maxAttempts * interval / 1000} seconds`);
}

export default TokenDeployerAction;