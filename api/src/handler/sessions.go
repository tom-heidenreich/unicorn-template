package handler

import (
	"api/client"

	"github.com/gin-gonic/gin"
)

var SessionHandler gin.HandlerFunc = func(ctx *gin.Context) {

	sessionId := ctx.Param("sessionId")

	session, err := client.GetSession(sessionId)

	if err != nil {
		ctx.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"username": session.Username,
		"password": session.Password,
	})
}
