package handler

import "github.com/gin-gonic/gin"

var PingHandler gin.HandlerFunc = func(ctx *gin.Context) {
	ctx.JSON(200, gin.H{"message": "pong"})
}
