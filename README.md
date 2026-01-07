# Pokedex CLI

A command-line Pokedex application built with TypeScript 
This project is part of the path on [boot.dev](https://boot.dev), an online platform for learning backend development.
It demonstrates TypeScript fundamentals by building an interactive REPL (Read-Eval-Print Loop) application that interfaces with the [PokeAPI](https://pokeapi.co/) to explore locations, catch Pokemon, and manage your collection.

## Technologies Used

- **TypeScript**: Primary programming language
- **Node.js**: Runtime environment
- **PokeAPI**: RESTful Pokemon data source
- **Vitest**: Testing framework
- **Node.js readline**: For interactive CLI interface


## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Mode

Build and run the application:
```bash
npm run dev
```

### Production Mode

Build the TypeScript files:
```bash
npm run build
```

Run the compiled application:
```bash
npm start
```

### Running Tests

```bash
npm test
```

## Available Commands

Once the application is running, you can use the following commands:

- `help` - Display all available commands and their descriptions
- `exit` - Exit the Pokedex application
- `map` - Display the next 20 location areas
- `mapb` - Display the previous 20 location areas
- `explore <area_name>` - List all Pokemon found in a specific location area
- `catch <pokemon_name>` - Attempt to catch a Pokemon (success is probability-based)
- `inspect <pokemon_name>` - View detailed stats of a Pokemon in your collection
- `pokedex` - List all Pokemon you have caught



## Screenshot
<img width="580" height="804" alt="image" src="https://github.com/user-attachments/assets/e49fccfc-a505-4de2-b011-0e73224d21ed" />
<img width="372" height="381" alt="image" src="https://github.com/user-attachments/assets/dec02f04-ff68-4047-bbaa-4d254290e8bc" />


