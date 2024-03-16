# boo-mini-server

## Run in local
1. copy `.env.example` to `.env` file and fill the value
2. `npm install`
2. `npm run start`

## Run test in local
1. `npm install`
2. `npm run test`

## Routes
1. POST `/profiles` to create profile

request
```
   curl --location 'localhost:3000/profiles' \
--header 'Content-Type: application/json' \
--data '{
    "name": "john dell",
    "description": "John dell is popular singer. Lorem ipsum"
}'
```
response
```
{
    "name": "john dell",
    "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    "description": "John dell is popular singer. Lorem ipsum",
    "_id": "65f56baa5de093e2d28bcaa7",
    "createdAt": "2024-03-16T09:51:38.303Z",
    "updatedAt": "2024-03-16T09:51:38.303Z",
    "__v": 0
}
```
2. GET `/profiles/:profileId` to get profile

request
```
curl --location --request GET 'localhost:3000/profiles/65f56baa5de093e2d28bcaa7'
```
response
```
{
    "_id": "65f56baa5de093e2d28bcaa7",
    "name": "john dell",
    "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    "description": "John dell is popular singer. Lorem ipsum",
    "createdAt": "2024-03-16T09:51:38.303Z",
    "updatedAt": "2024-03-16T09:51:38.303Z",
    "__v": 0
}
```
3. POST `/comments` to vote/comment a profile

request
```
curl --location 'localhost:3000/comments/65f3d7742fab56e04524ec65' \
--header 'Content-Type: application/json' \
--data '{
    "commentatorId": "65f56baa5de093e2d28bcaa7",
    "description": "lorep ipsum",
    "title": "cool",
    "mbti": "INTP",
    "enneagram": "8w9",
    "zodiac": "Cancer"
}'
```
response
```
{
    "commentatorId": "65f56baa5de093e2d28bcaa7",
    "profileId": "65f3d7742fab56e04524ec65",
    "title": "cool",
    "description": "lorep ipsum",
    "mbti": "INTP",
    "enneagram": "8w9",
    "zodiac": "Cancer",
    "_id": "65f56d1a5de093e2d28bcaac",
    "createdAt": "2024-03-16T09:57:46.025Z",
    "updatedAt": "2024-03-16T09:57:46.025Z",
    "__v": 0
}
```
4. GET `/comments/:profileId` to get all comments for particular profileId. By default sort by most recent

request
```
curl --location 'localhost:3000/comments/65f3d7742fab56e04524ec65' 
```
response
```
[
    {
        "_id": "65f56d1a5de093e2d28bcaac",
        "commentatorId": "65f56baa5de093e2d28bcaa7",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "cool",
        "description": "lorep ipsum",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T09:57:46.025Z",
        "updatedAt": "2024-03-16T09:57:46.025Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f56baa5de093e2d28bcaa7",
                "name": "john dell",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "John dell is popular singer. Lorem ipsum",
                "createdAt": "2024-03-16T09:51:38.303Z",
                "updatedAt": "2024-03-16T09:51:38.303Z",
                "__v": 0
            }
        ],
        "likes": []
    },
    {
        "_id": "65f4f61bf50355e2e172d5a2",
        "commentatorId": "65f3d8482fab56e04524ec6e",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "anything",
        "description": "lorem ipsum dolor",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T01:30:03.638Z",
        "updatedAt": "2024-03-16T01:30:03.638Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f3d8482fab56e04524ec6e",
                "name": "john mayor",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "best",
                "createdAt": "2024-03-15T05:10:32.636Z",
                "updatedAt": "2024-03-15T05:10:32.636Z",
                "__v": 0
            }
        ],
        "likes": []
    },
    {
        "_id": "65f3d85b2fab56e04524ec71",
        "commentatorId": "65f3d8482fab56e04524ec6e",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "any title",
        "description": "any description",
        "createdAt": "2024-03-15T05:10:51.056Z",
        "updatedAt": "2024-03-15T05:10:51.056Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f3d8482fab56e04524ec6e",
                "name": "john mayor",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "best",
                "createdAt": "2024-03-15T05:10:32.636Z",
                "updatedAt": "2024-03-15T05:10:32.636Z",
                "__v": 0
            }
        ],
        "likes": []
    },
    {
        "_id": "65f3d8152fab56e04524ec6c",
        "commentatorId": "65f3d7d02fab56e04524ec68",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "abcd",
        "description": "any sample description",
        "createdAt": "2024-03-15T05:09:41.922Z",
        "updatedAt": "2024-03-15T05:09:41.922Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f3d7d02fab56e04524ec68",
                "name": "john doe",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "best",
                "createdAt": "2024-03-15T05:08:32.046Z",
                "updatedAt": "2024-03-15T05:08:32.046Z",
                "__v": 0
            }
        ],
        "likes": [
            {
                "_id": "65f4fb7f5446fe57832f3e56",
                "commentId": "65f3d8152fab56e04524ec6c",
                "likerId": "65f3d8482fab56e04524ec6e",
                "createdAt": "2024-03-16T01:53:03.991Z",
                "updatedAt": "2024-03-16T01:53:03.991Z",
                "__v": 0
            }
        ]
    }
]
```
5. GET `/comments/:profileId?sort=like` to get all comments for particular profileId with most like first

request
```
curl --location 'localhost:3000/comments/65f3d7742fab56e04524ec65?sort=like'
```
response
```
[
    {
        "_id": "65f3d8152fab56e04524ec6c",
        "commentatorId": "65f3d7d02fab56e04524ec68",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "abcd",
        "description": "any sample description",
        "createdAt": "2024-03-15T05:09:41.922Z",
        "updatedAt": "2024-03-15T05:09:41.922Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f3d7d02fab56e04524ec68",
                "name": "john doe",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "best",
                "createdAt": "2024-03-15T05:08:32.046Z",
                "updatedAt": "2024-03-15T05:08:32.046Z",
                "__v": 0
            }
        ],
        "likes": [
            {
                "_id": "65f4fb7f5446fe57832f3e56",
                "commentId": "65f3d8152fab56e04524ec6c",
                "likerId": "65f3d8482fab56e04524ec6e",
                "createdAt": "2024-03-16T01:53:03.991Z",
                "updatedAt": "2024-03-16T01:53:03.991Z",
                "__v": 0
            }
        ]
    },
    {
        "_id": "65f3d85b2fab56e04524ec71",
        "commentatorId": "65f3d8482fab56e04524ec6e",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "any title",
        "description": "any description",
        "createdAt": "2024-03-15T05:10:51.056Z",
        "updatedAt": "2024-03-15T05:10:51.056Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f3d8482fab56e04524ec6e",
                "name": "john mayor",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "best",
                "createdAt": "2024-03-15T05:10:32.636Z",
                "updatedAt": "2024-03-15T05:10:32.636Z",
                "__v": 0
            }
        ],
        "likes": []
    },
    {
        "_id": "65f4f61bf50355e2e172d5a2",
        "commentatorId": "65f3d8482fab56e04524ec6e",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "anything",
        "description": "lorem ipsum dolor",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T01:30:03.638Z",
        "updatedAt": "2024-03-16T01:30:03.638Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f3d8482fab56e04524ec6e",
                "name": "john mayor",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "best",
                "createdAt": "2024-03-15T05:10:32.636Z",
                "updatedAt": "2024-03-15T05:10:32.636Z",
                "__v": 0
            }
        ],
        "likes": []
    },
    {
        "_id": "65f56d1a5de093e2d28bcaac",
        "commentatorId": "65f56baa5de093e2d28bcaa7",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "cool",
        "description": "lorep ipsum",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T09:57:46.025Z",
        "updatedAt": "2024-03-16T09:57:46.025Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f56baa5de093e2d28bcaa7",
                "name": "john dell",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "John dell is popular singer. Lorem ipsum",
                "createdAt": "2024-03-16T09:51:38.303Z",
                "updatedAt": "2024-03-16T09:51:38.303Z",
                "__v": 0
            }
        ],
        "likes": []
    }
]
```
6. GET `/comments/:profileId?mbti=` to get all comments for particular profileId and mbti

request
```
curl --location 'localhost:3000/comments/65f3d7742fab56e04524ec65?mbti=INTP'
```
response
```
[
    {
        "_id": "65f56d1a5de093e2d28bcaac",
        "commentatorId": "65f56baa5de093e2d28bcaa7",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "cool",
        "description": "lorep ipsum",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T09:57:46.025Z",
        "updatedAt": "2024-03-16T09:57:46.025Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f56baa5de093e2d28bcaa7",
                "name": "john dell",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "John dell is popular singer. Lorem ipsum",
                "createdAt": "2024-03-16T09:51:38.303Z",
                "updatedAt": "2024-03-16T09:51:38.303Z",
                "__v": 0
            }
        ],
        "likes": []
    },
    {
        "_id": "65f4f61bf50355e2e172d5a2",
        "commentatorId": "65f3d8482fab56e04524ec6e",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "anything",
        "description": "lorem ipsum dolor",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T01:30:03.638Z",
        "updatedAt": "2024-03-16T01:30:03.638Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f3d8482fab56e04524ec6e",
                "name": "john mayor",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "best",
                "createdAt": "2024-03-15T05:10:32.636Z",
                "updatedAt": "2024-03-15T05:10:32.636Z",
                "__v": 0
            }
        ],
        "likes": []
    }
]
```
7. GET `/comments/:profileId?zodiac=` to get all comments for particular profileId and zodiac

request
```
curl --location 'localhost:3000/comments/65f3d7742fab56e04524ec65?zodiac=Cancer'
```
response
```
[
    {
        "_id": "65f56d1a5de093e2d28bcaac",
        "commentatorId": "65f56baa5de093e2d28bcaa7",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "cool",
        "description": "lorep ipsum",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T09:57:46.025Z",
        "updatedAt": "2024-03-16T09:57:46.025Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f56baa5de093e2d28bcaa7",
                "name": "john dell",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "John dell is popular singer. Lorem ipsum",
                "createdAt": "2024-03-16T09:51:38.303Z",
                "updatedAt": "2024-03-16T09:51:38.303Z",
                "__v": 0
            }
        ],
        "likes": []
    },
    {
        "_id": "65f4f61bf50355e2e172d5a2",
        "commentatorId": "65f3d8482fab56e04524ec6e",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "anything",
        "description": "lorem ipsum dolor",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T01:30:03.638Z",
        "updatedAt": "2024-03-16T01:30:03.638Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f3d8482fab56e04524ec6e",
                "name": "john mayor",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "best",
                "createdAt": "2024-03-15T05:10:32.636Z",
                "updatedAt": "2024-03-15T05:10:32.636Z",
                "__v": 0
            }
        ],
        "likes": []
    }
]
```
8. GET `/comments/:profileId?enneagram=` to get all comments for particular profileId and zodiac

request
```
curl --location 'localhost:3000/comments/65f3d7742fab56e04524ec65?enneagram=8w9'
```
response
```
[
    {
        "_id": "65f56d1a5de093e2d28bcaac",
        "commentatorId": "65f56baa5de093e2d28bcaa7",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "cool",
        "description": "lorep ipsum",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T09:57:46.025Z",
        "updatedAt": "2024-03-16T09:57:46.025Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f56baa5de093e2d28bcaa7",
                "name": "john dell",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "John dell is popular singer. Lorem ipsum",
                "createdAt": "2024-03-16T09:51:38.303Z",
                "updatedAt": "2024-03-16T09:51:38.303Z",
                "__v": 0
            }
        ],
        "likes": []
    },
    {
        "_id": "65f4f61bf50355e2e172d5a2",
        "commentatorId": "65f3d8482fab56e04524ec6e",
        "profileId": "65f3d7742fab56e04524ec65",
        "title": "anything",
        "description": "lorem ipsum dolor",
        "mbti": "INTP",
        "enneagram": "8w9",
        "zodiac": "Cancer",
        "createdAt": "2024-03-16T01:30:03.638Z",
        "updatedAt": "2024-03-16T01:30:03.638Z",
        "__v": 0,
        "commentator": [
            {
                "_id": "65f3d8482fab56e04524ec6e",
                "name": "john mayor",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "description": "best",
                "createdAt": "2024-03-15T05:10:32.636Z",
                "updatedAt": "2024-03-15T05:10:32.636Z",
                "__v": 0
            }
        ],
        "likes": []
    }
]
```
9. POST `/likes` to like a comment

request
```
curl --location 'localhost:3000/likes/65f3d8152fab56e04524ec6c' \
--header 'Content-Type: application/json' \
--data '{
    "likerId": "65f3d8482fab56e04524ec6e"
}'
```
response
```
{
    "commentId": "65f3d8152fab56e04524ec6c",
    "likerId": "65f3d8482fab56e04524ec6e",
    "_id": "65f5705d5de093e2d28bcab5",
    "createdAt": "2024-03-16T10:11:41.948Z",
    "updatedAt": "2024-03-16T10:11:41.948Z",
    "__v": 0
}
```
10. DELETE `/likes` to unlike a comment
request
```
curl --location --request DELETE 'localhost:3000/likes/65f3d8152fab56e04524ec6c' \
--header 'Content-Type: application/json' \
--data '{
    "likerId": "65f3d8482fab56e04524ec6e"
}'
```
response
```
{
    "acknowledged": true,
    "deletedCount": 1
}
```