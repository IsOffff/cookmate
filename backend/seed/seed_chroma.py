from pymongo import MongoClient

client = MongoClient("mongodb://mongo:27017")
db = client["cookmate"]
comments = db["comments"]

comments.delete_many({})

comments.insert_many([
    {
        "recipeId": 1,
        "comments": [
            {"user": "Alex", "message": "Très bonne recette", "rating": 5},
            {"user": "Samuel", "message": "Simple et efficace", "rating": 4}
        ]
    },
    {
        "recipeId": 2,
        "comments": [
            {"user": "khadi", "message": "J’ai adoré", "rating": 5}
        ]
    }
])

print("mongo seed est fonctionnel")
