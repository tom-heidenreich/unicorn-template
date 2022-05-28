package handler

import (

	"github.com/gin-gonic/gin"
)

func UserGetHandler(ctx *gin.Context) {
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
}
