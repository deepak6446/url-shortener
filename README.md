# URL Shortening Service

## Installation

```
$ npm install
```

## Running the app
# development
```
$ npm run start
```
# watch mode
```
$ npm run start:dev
```
# production mode
$ npm run start:prod

# Testing the URL Shortening Service
1. POST Request to Shorten URL
This endpoint accepts a URL and initiates the process to shorten it. It responds with a 202 status code to indicate that the request has been accepted but not yet completed, as the shortening process is asynchronous.

```
curl -X POST http://localhost:3000/url -H "Content-Type: application/json" -d '{"url": "http://example.com"}' -i
Status Code: 202 Accepted
```

2. Long Polling Request to Retrieve Shortened URL
This GET request is used for long polling, allowing the client to check if the URL has been shortened. If not yet processed, it returns a 204 status code. Once processed, the shortened URL is returned.
```
curl -X GET http://localhost:3000/url/poll?url=http://example.com -i

Expected Response When Not Processed Yet:
Status Code: 204 No Content

Expected Response When Successfully Processed:
Status Code: 200 OK
{
  "shortenedURL": "http://localhost:3000/a2b345w68s"
}
```

3. GET Request to Retrieve Original URL
This endpoint retrieves the original URL from a shortened code. It validates the shortened code and if found, returns the original URL (replace code form above)
```
curl -X GET http://localhost:3000/a2b345w68s -i
Expected Response:
Status Code: 200 OK
{
  "url": "http://example.com"
}
```
