# RESTful-API
RESTful API example built using the Express framework.
API is used to CRUD simple articles consiting of a title and content.

Ensure mongod is running with: **mongod** or **mongod --config /path/to/conf --fork**

Install dependencies with: **npm install**

To start API run: **npm start**

or

To start API in development mode run: **npm run dev**

A new mongo database will be created called 'restfulDB' with the collection 'articles'.

<hr />

Use an API development tool such as postman or curl to make the various HTTP requests to CRUD articles.

<hr />

**GET** /api/ returns all articles.

**GET** /api/&lt;article title&gt;returns the specified article.

**POST** /api/ creates an inserts a new article document. (title: "Article title", content: "Article content")

**PUT** /api/&lt;article title&gt; updates ALL fields in the article document. {title: "Value to update", content: "Value to update"} If either key is missing, its respective value will be set to null.

**PATCH** /api/&lt;article title&gt; unlike PUT, PATCH will only update the field supplied. For Example if you want to make changes to the content only. {content: "Make changes"}. {title: "Value"} will not be affected and its orignal value will remain the same.

**DELETE** /api/ will delete ALL articles in the database.

**DELETE** /api/&lt;article title&gt; will delete the specified article ONLY.
