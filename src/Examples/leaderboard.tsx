// Example1.tsx
import { Devvit, useChannel, useState } from "@devvit/public-api";

const LeaderboardWithRealtime = ({ context }) => {
  const [score, setScore] = useState(0);
  const [username] = useState(async () => {
    return (await context.reddit.getCurrentUsername()) ?? "anon";
  });

  // Get top 5 from leaderboard
  const getLeaderboard = async () =>
    await context.redis.zRange("leaderboard", 0, 5, {
      reverse: true,
      by: "rank",
    });

  const [leaderboard, setLeaderboard] = useState(async () => {
    return await getLeaderboard();
  });

  const channel = useChannel({
    name: "leaderboard_updates",
    onMessage: (newLeaderboardEntry) => {
      const newLeaderBoard = [...leaderboard, newLeaderboardEntry] // append new entry
        .sort((a, b) => b.score - a.score) // sort by score
        .slice(0, 5); // leave top 5

      setLeaderboard(newLeaderBoard); // update the state
    },
  });

  async function submitScore() {
    // stays as is
    await context.redis.zAdd("leaderboard", {
      member: username,
      score: score,
    });

    // new code
    context.realtime.send("leaderboard_updates", {
      member: username,
      score: score,
    });
  }

  channel.subscribe();

  return (
    <vstack width="80%" alignment="center">
      <text wrap={true} alignment="center">
        This example showcases how to share data efficiently between users using
        realtime. This allows you to subscribe to updates to data changes rather
        than needing to poll for data changes in an interval.
      </text>
      <spacer size="medium"></spacer>

      <hstack cornerRadius="small" gap="medium" alignment="center">
        <vstack
          borderColor="global-black"
          border="thick"
          padding="medium"
          cornerRadius="small"
          maxHeight={"100px"}
        >
          <text
            alignment="center"
            size="large"
          >{`Current Score: ${score}`}</text>
          <hstack gap="small">
            <button
              appearance="secondary"
              onPress={() => setScore((score) => score - 1)}
            >
              -1
            </button>
            <button appearance="success" onPress={() => submitScore()}>
              Submit Score!
            </button>{" "}
            <button
              appearance="primary"
              onPress={() => setScore((score) => score + 1)}
            >
              +1
            </button>
          </hstack>
          <spacer></spacer>
        </vstack>
        <spacer></spacer>

        <vstack
          borderColor="global-black"
          border="thick"
          padding="small"
          cornerRadius="small"
        >
          <text weight="bold"> Leaderboard: </text>

          <spacer size="xsmall"></spacer>
          {leaderboard.slice(0, 5).map((entry, index) => (
            <hstack key={index} gap="small" alignment="center">
              <text style="body" color="global-online">
                {`${index + 1}. ${entry.member}: ${entry.score}`}
              </text>
            </hstack>
          ))}
        </vstack>
      </hstack>
    </vstack>
  );
};

export default LeaderboardWithRealtime;
