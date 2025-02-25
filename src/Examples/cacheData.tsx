import { Devvit, useState } from "@devvit/public-api";

// Example of fetching data from an endpoint as one user then adding it to the
// cache so it can be shared with others without the need to make additional
// external requests.

const CacheData = ({ context }) => {
  const [externalData] = useState(async () => {
    return context.cache(
      async () => {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/Pikachu"
        );

        return await response.json();
      },
      {
        key: `pikachu_data`,
        ttl: 60 * 60 * 1000, // 1 hours in milliseconds
      }
    );
  });

  // Pick a random move from the moves array
  const randomMove = externalData.moves
    ? externalData.moves[Math.floor(Math.random() * externalData.moves.length)]
    : null;

  return (
    <vstack width="80%" alignment="center">
      <text wrap={true} alignment="center">
        This example showcases how to utilize a cache helper to make one request
        for data, save the response, and provide this response to all users
        requesting the same data. The cache lives at the subreddit level (not
        the app level). A random user will be selected to make the request and
        the data will be shared with others.
      </text>

      <spacer size="medium"></spacer>

      <vstack
        borderColor="global-black"
        border="thick"
        padding="medium"
        cornerRadius="small"
      >
        <text> Here is a random move that Pikachu is able to learn: </text>
        {randomMove ? (
          <text weight="bold">{` ${randomMove.move.name}`}</text>
        ) : (
          <text>{`Move not loaded yet`}</text>
        )}
      </vstack>
    </vstack>
  );
};

export default CacheData;
