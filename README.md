# Free Solana Token Agent for Claude Desktop

A Model Context Protocol (MCP) server that allows Claude Desktop to deploy **instantly tradable tokens on Solana at zero cost** with just a simple conversation.

## Features

With this agent, Claude can:
- **FREE TOKEN DEPLOYMENT** - No gas fees or costs for the user
- **INSTANT TRADING** - Tokens are immediately tradable after creation
- Deploy custom tokens on Solana with custom names and images
- Create a single-sided LP pool on Orca automatically
- Seed the pool for immediate liquidity
- All with a simple conversation through Claude

## Installation

This project uses pnpm for package management. To install dependencies:

```bash
pnpm i
```

Then build the project:

```bash
pnpm build
```

## Configuration

Configuration is handled directly in the Claude Desktop config. Add this agent to your `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "agent-kit": {
            "command": "node",
            "env": {
                "OPENAI_API_KEY": "optional_openai_api_key_here",
                "RPC_URL": "your_rpc_url_here",
                "SOLANA_PRIVATE_KEY": "your_private_key_here",
                "TOKEN_API_URL": "ask @kirabuilds on x for access https://x.com/kirabuilds",
                "TOKEN_API_KEY": "ask @kirabuilds on x for access https://x.com/kirabuilds"
            },
            "args": [
                "/absolute/path/to/build/index.js"
            ]
        }
    }
}
```

Replace the placeholder values with your actual credentials.

## Usage

Launch your own token for free in seconds! Once installed and configured, you can interact with Claude Desktop to deploy instantly tradable tokens:

1. Simply ask Claude to deploy a token with a name and symbol
2. Provide a link to an image for the token
3. Example prompt: "Deploy a token called 'Awesome Token' with the symbol 'AWSM' using this image: https://example.com/image.png"

Claude will handle the entire process **at no cost**:
- Token deployment on Solana
- LP pool creation on Orca
- Pool seeding
- **Instant trading enablement**

No technical knowledge required - just have a conversation with Claude and get a fully tradable token for free!

## Requirements

- Node.js 18+
- pnpm
- Claude Desktop with MCP server capabilities
- Solana wallet with some SOL for transactions

## License

ISC
