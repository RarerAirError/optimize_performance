// Learn more at developers.reddit.com/docs
import "./createPost.js";
import ParallelRequests from "./Examples/parallelRequests.js";
import CacheData from "./Examples/cacheData.js";
import LeaderboardWithRealtime from "./Examples/leaderboard.js";

import { Devvit, useState, useAsync } from "@devvit/public-api";

Devvit.configure({
  redis: true,
  http: true,
  redditAPI: true,
  realtime: true,
});
const exampleCount = 3;

const exampleNames = [
  "Parallel Requests",
  "Cache Data",
  "Leaderboard using Realtime",
];

// Add a post type definition
Devvit.addCustomPostType({
  name: "Experience Post",
  height: "regular",
  render: (_context) => {
    const [performanceStartRender] = useState(Date.now()); // a reference point for the render start

    const [subscriberCount] = useState<number>(async () => {
      const startSubscribersRequest = Date.now(); // a reference point for the request start
      const devvitSubredditInfo = await _context.reddit.getSubredditInfoByName(
        "devvit"
      );

      return devvitSubredditInfo.subscribersCount || 0;
    });

    const [exampleIndex, setExample] = useState(0);

    const handleCounterChange = (value: Number) => {
      if (value === 1) {
        if (exampleIndex < exampleCount - 1) {
          setExample(exampleIndex + 1); // Increment the counter
        } else {
          setExample(0); // Reset to 0 when counter reaches exampleCount
        }
      } else {
        if (exampleIndex > 0) {
          setExample(exampleIndex - 1); // Decrement the counter
        } else {
          setExample(exampleCount - 1);
        }
      }
    };

    const examples = [
      <ParallelRequests context={_context} />,
      <CacheData context={_context} />,
      <LeaderboardWithRealtime context={_context} />,
    ];

    return (
      <vstack height="100%" width="100%" gap="medium" alignment="center top">
        <hstack
          gap="large"
          padding="medium"
          backgroundColor="#ff4500"
          cornerRadius="small"
        >
          <button
            appearance="secondary"
            onPress={() => handleCounterChange(-1)}
          >
            Previous Example!
          </button>
          <text style="heading" size="xxlarge" alignment="center middle">
            {exampleNames[exampleIndex]}
          </text>
          <button appearance="primary" onPress={() => handleCounterChange(1)}>
            Next Example!
          </button>
        </hstack>

        {examples[exampleIndex]}
      </vstack>
    );
  },
});
export default Devvit;
