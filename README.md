# RESTful-API
RESTful API example built using the Express framework.

Ensure mongod is running with: **mongod** or **mongod --config /path/to/conf --fork**

Install dependencies with: **npm install**

To start API run: **npm start**

or

To start API in development mode run: **npm run dev**

A new mongo database will be created called 'restfulDB' with the collection 'articles'.

<hr />

Use an API development tool such as postman or curl to make the various HTTP requests.

<hr />

**GET** /articles returns all articles.

**GET** /articles<article title> returns the specified article.

**POST** /articles creates an inserts a new article document. (title: "Article title", content: "Article content")

**PUT** /articles/<article title> updates ALL fields in the article document. {title: "Value to update", content: "Value to update"} If either key is missing, its respective value will be set to null.

**PATCH** /articles/<article title> unlike PUT, PATCH will only update the field supplied. For Example if you want to make changes to the content only. {content: "Make changes"}. {title: "Value"} will not be affected and its orignal value will remain the same.

**DELETE** /articles will delete ALL articles in the database.

**DELETE** /articles/<article title> will delete the specified article ONLY.
