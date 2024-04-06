# GitHub Explorer (Backend)
## Objective
Create a backend service using Node.js and Express.js that interfaces with the GitHub API to fetch and persist user data. This service will support operations such as storing user details, identifying mutual followers, searching, updating, and soft deleting records in a database.
Features and Specifications

### 1. GitHub User Data Storage
* Endpoint: /save-user/:username
* Method: GET
* Functionality: Fetch user details from the GitHub API (https://api.github.com/users/:username) and save them in the database. If the user's data already exists, do not fetch from the API again.
Data to Store: Username, ID, avatar URL, type, name, company, blog, location, email, bio, number of public repos, followers, following, created_at, and updated_at.

### 2. Mutual Followers as Friends
* Endpoint: /find-mutual-followers/:username
* Method: GET
* Functionality: For a given user, find all users they follow who also follow them back. Save these relationships as 'friends' in the database.
Requirements: Use GitHub followers/following API to determine mutual followers.

### 3. Search Functionality
* Endpoint: /search-users
* Method: GET
* Functionality: Search for users in the database based on criteria such as username, location, etc. Support multiple search parameters.
Parameters: username, location, and any other relevant user details.

### 4. Soft Delete User Records
* Endpoint: /delete-user/:username
* Method: DELETE
* Functionality: Mark a user record as deleted without actually removing it from the database. This is a soft delete operation.
  
### 5. Update User Details
* Endpoint: /update-user/:username
* Method: PATCH
* Functionality: Update user details such as location, blog, and bio for a specific user in the database.
  
### 6. List Users with Sorting
* Endpoint: /list-users
* Method: GET
* Functionality: Return a list of all users from the database. Support sorting by fields like public_repos, followers, etc.
