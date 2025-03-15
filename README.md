# Solana Token Agent for Claude Desktop

A Model Context Protocol (MCP) server that allows Claude Desktop to deploy tokens on Solana with just a simple conversation.

## Features

With this agent, Claude can:
- Deploy custom tokens on Solana
- Create a single-sided LP pool on Orca
- Seed the pool automatically
- Enable trading instantly
- All for free, with no gas fees for the user

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

Once installed and configured, you can interact with Claude Desktop to deploy tokens:

1. Simply ask Claude to deploy a token with a name and symbol
2. Provide a link to an image for the token
3. Example prompt: "Deploy a token called 'Awesome Token' with the symbol 'AWSM' using this image: https://example.com/image.png"

Claude will handle the entire process:
- Token deployment on Solana
- LP pool creation on Orca
- Pool seeding
- Trading enablement

No technical knowledge required - just have a conversation with Claude!

## Requirements

- Node.js 18+
- pnpm
- Claude Desktop with MCP server capabilities
- Solana wallet with some SOL for transactions

## License

ISC
