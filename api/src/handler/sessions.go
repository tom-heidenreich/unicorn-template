package handler

import "github.com/gin-gonic/gin"



var SessionHandler gin.HandlerFunc = func(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "cannot get sessions",
	})
}
