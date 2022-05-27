package handler

import (
	"api/client/redis"

	"github.com/gin-gonic/gin"
)

type Login struct {
	User     string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

var LoginHandler gin.HandlerFunc = func(ctx *gin.Context) {
	var json Login
	if err := ctx.ShouldBindJSON(&json); err != nil {
		println(err.Error())
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// create entry
	sessionId, err := redis.CreateSession(redis.Session{Username: json.User, Password: json.Password})

	if err != nil {
		println(err.Error())
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{
		"message":   "logged in",
		"sessionId": sessionId,
	})
}
