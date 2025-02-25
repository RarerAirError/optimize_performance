// Example1.tsx
import { Devvit, useAsync, useState } from "@devvit/public-api";

const ParallelRequests = ({ context }) => {
  //const [performanceStartRender] = useState(Date.now()); // a reference point for the render start
  const [startOfRequestTime1] = useState(Date.now());
  const [totalRequestTime1, setTotalRequestTime1] = useState(0);

  // UseASync will not block the application or subsequent requests and should
  // be used whenever possible to speed up load time for your app.
  // Alternatively, you can use useState to guarentee the data is available
  // before the application continues.

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useAsync(
    async () => {
      const user = await context.reddit.getCurrentUser();
      return user ?? null;
    },
    {
      finally: (data, error) => {
        if (error) {
          console.error("Failed with Error: " + error);
        } else {
          setTotalRequestTime1((x) => Date.now() - startOfRequestTime1);
        }
      },
    }
  );
  const [startOfRequestTime2] = useState(Date.now());
  const [totalRequestTime2, setTotalRequestTime2] = useState(0);

  const {
    data: subredditName,
    loading: loadingSubName,
    error: subNameError,
  } = useAsync(
    async () => {
      const subName = await context.reddit.getCurrentSubredditName();

      return subName;
    },
    {
      finally: (data, error) => {
        if (error) {
          console.error("Failed with Error: " + error);
        } else {
          setTotalRequestTime2((x) => Date.now() - startOfRequestTime2);
        }
      },
    }
  );

  return (
    <vstack width="80%" alignment="center">
      <text wrap={true} alignment="center">
        This example showcases how to utilize the useAsync hook to make data
        requests without blocking your requiring these values to return before
        continuing (blocking).
      </text>
      <spacer size="medium"></spacer>
      <hstack cornerRadius="small" gap="medium" alignment="center">
        <vstack
          borderColor="global-black"
          border="thick"
          padding="medium"
          cornerRadius="small"
        >
          {userLoading && <text>Loading user...</text>}
          {userError && <text>Error fetching user</text>}
          {user && (
            <text alignment="center top" style="heading" weight="bold">
              Username: {user.username}
            </text>
          )}
          <spacer></spacer>
          <text style="body" color="global-online">
            Request Duration: {totalRequestTime1} ms
          </text>
        </vstack>
        <spacer></spacer>
        <vstack
          borderColor="global-black"
          border="thick"
          padding="medium"
          cornerRadius="small"
        >
          {loadingSubName && <text>Loading Sub name...</text>}
          {subNameError && <text>Error fetching Name</text>}
          {subredditName && (
            <text alignment="center top" style="heading" weight="bold">
              Subreddit: {subredditName}
            </text>
          )}
          <spacer></spacer>

          <text style="body" color="global-online">
            Request Duration: {totalRequestTime2} ms
          </text>
        </vstack>
      </hstack>

      <spacer size="medium"></spacer>

      <vstack
        backgroundColor="neutral-background-selected"
        borderColor="global-black"
        border="thick"
        padding="small"
        cornerRadius="small"
        width={"60%"}
      >
        <hstack alignment="center">
          {totalRequestTime1 >= totalRequestTime2 && (
            <text style="body" color="global-online">
              Total Duration: {totalRequestTime1} ms
            </text>
          )}
          {totalRequestTime1 < totalRequestTime2 && (
            <text style="body" color="global-online">
              {" "}
              Total Duration: {totalRequestTime2} ms
            </text>
          )}
        </hstack>
      </vstack>
    </vstack>
  );
};

export default ParallelRequests;
