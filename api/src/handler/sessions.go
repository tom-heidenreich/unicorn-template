package handler

import (
	"api/client/redis"

	"github.com/gin-gonic/gin"
)

func SessionGetHandler(ctx *gin.Context) {

	sessionId := ctx.Param("sessionId")

	session, err := redis.GetSession(sessionId)

	if err != nil {
		ctx.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(200, session)
}

func SessionPostHandler(ctx *gin.Context) {

	var session redis.Session

	if err := ctx.ShouldBindJSON(&session); err != nil {
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	sessionId, err := redis.CreateSession(session)

	if err != nil {
		ctx.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"sessionId": sessionId,
	})
}
