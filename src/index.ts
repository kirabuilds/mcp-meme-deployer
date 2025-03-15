import { SolanaAgentKit, startMcpServer } from "solana-agent-kit";
import * as dotenv from "dotenv";
import TokenDeployerAction from "./actions/tokenDeployerAction.js";

// Load environment variables
dotenv.config();

// Initialize the Solana Agent Kit
const agent = new SolanaAgentKit(
  process.env.SOLANA_PRIVATE_KEY!,
  process.env.RPC_URL!,
  {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  }
);

// Only include your custom token deployer action
const mcp_actions = {
  DEPLOY_TOKEN: TokenDeployerAction
};

// Start the MCP server with just your custom action
startMcpServer(mcp_actions, agent, {
  name: "token-deployer",
  version: "0.0.1"
});