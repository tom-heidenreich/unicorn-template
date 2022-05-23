package handler

import (
	"api/client"

	"github.com/gin-gonic/gin"
)

type Login struct {
	User     string `json:"user" binding:"required"`
	Password string `json:"password" binding:"required"`
}

var LoginHandler gin.HandlerFunc = func(ctx *gin.Context) {
	var json Login
	if err := ctx.ShouldBindJSON(&json); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// create entry
	sessionId, err := client.CreateSession(client.Session{Username: json.User, Password: json.Password})

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return;
	}

	ctx.JSON(200, gin.H{
		"message": "logged in",
		"sessionId": sessionId,
	})
}
