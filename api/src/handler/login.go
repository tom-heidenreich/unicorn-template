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
	client.createSession(client.Session{username: json.User, password: json.Password})

	ctx.JSON(200, gin.H{
		"message": "logged in",
	})
}
