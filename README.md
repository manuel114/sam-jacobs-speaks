# Sam Jacobs Speaks 🧙‍♂️

A GTM oracle game inspired by Zoltar in *Big (1988)* — but powered by hard-won wisdom from Sam Jacobs, the Pavilion founder and truth-teller for startup leaders.

Ask your GTM question. Drop the coin. Get a truth bomb. The future is in your hands.

## How to Play

- On the landing page, ask your GTM question (e.g. "Should I focus on product or sales?"). 
- Click the coin slot to insert a coin.
- Guide your coin through the machine using keyboard arrow keys, or D-pad (only shown on touchscreens). 
  - Spiral: spins the gameboard.
  - Double arrows: reverses control. Up -> down, left -> right, vice versa.
  - Mushroom: grows the coin to super big.
  - Black holes: teleport the coin to somewhere else.
- Once you reach the exit (a golden crystal ball around the bottom right), a card will appear. Click on the card to read Sam's GTM wisdom.

## Live Link

[Vercel Hosting](https://sam-jacobs-speaks.vercel.app/)

## TODO

- Replace character image with custom Sam Jacobs illustration

## Setup for OpenAI Integration

1. Create a `.env` file in the root directory
2. Add your OpenAI API key: `OPENAI_API_KEY=your_actual_api_key_here`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

This will start both the React frontend (port 3000) and the Express backend (port 3001) that securely handles OpenAI API calls.
