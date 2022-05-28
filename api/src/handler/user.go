package handler

import (
	"api/client/dynamo"

	"github.com/gin-gonic/gin"
)

func UserGetHandler(ctx *gin.Context) {

	id := ctx.Param("id")

	entry, err := dynamo.Get(id)

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"id": entry.Partition, "value": entry.Value})
}

type UserForm struct {
	User     string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required"`
}

func UserPostHandler(ctx *gin.Context) {

	var json UserForm
	if err := ctx.ShouldBindJSON(&json); err != nil {
		println(err.Error())
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err := dynamo.PutJSON(dynamo.ID(), json)

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"id": dynamo.ID()})
}
