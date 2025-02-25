## Devvit Optimize Performance 
This example Devvit project showcases the recommendations from [Optimize Performance](https://developers.reddit.com/docs/optimize_performance)

![Screen Recording 2025-02-25 at 12 56 57 PM](https://github.com/user-attachments/assets/3fe67bff-36c3-4349-ac88-5956b0aa2b7f)

In this app there are three separate examples which showcase best practices with using the cache, making async requests to external services, and using realtime to share data when events occur. 
### Parallel Requests:
This example showcases how to utilize the useAsync hook to make data requests without blocking your requiring these values to return before continuing (blocking).

### Cache Data
This example showcases how to utilize a cache helper to make one request for data, save the response, and provide this response to all users requesting the same data. The cache lives at the Reddit level (not the app level). A random user will be selected to make the request and the data will be shared with others.
### Realtime Service 
 This example showcases how to share data efficiently between users using realtime. This allows you to subscribe to updates to data changes rather than needing to poll for data changes in an interval.
## Getting started

```sh
git clone ....

cd ...

npm install
```

Continue by following along with the Quick Start guide on the [Devvit documentation site](https://developers.reddit.com/docs/quickstart#step-by-step-guide)
