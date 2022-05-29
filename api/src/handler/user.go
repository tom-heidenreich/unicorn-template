package handler

import (
	"api/client/mongodb"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	User     string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func UserGetHandler(ctx *gin.Context) {

	id := ctx.Param("id")
	objectId, _ := primitive.ObjectIDFromHex(id)

	// find user by id
	var result User
	err := mongodb.Database.Collection("users").FindOne(ctx, bson.M{"_id": objectId}).Decode(&result)

	if err == mongo.ErrNoDocuments {

		ctx.JSON(404, gin.H{"error": "user not found"})
		return

	} else if err != nil {

		println(err.Error())
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, result)
}

func UserPostHandler(ctx *gin.Context) {

	var json User
	if err := ctx.ShouldBindJSON(&json); err != nil {
		println(err.Error())
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// insert user
	res, err := mongodb.Database.Collection("users").InsertOne(ctx, json)

	if err != nil {
		println(err.Error())
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	id := res.InsertedID

	ctx.JSON(200, gin.H{"id": id})
}
