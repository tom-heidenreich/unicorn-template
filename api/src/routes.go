package main

import (
	"api/handler"

	"github.com/gin-gonic/gin"
)

type Route struct {
	method  string // maybe enum
	path    string
	handler gin.HandlerFunc
}

var routes = []Route{
	{method: "get", path: "/ping", handler: handler.PingHandler},
	{method: "post", path: "/login", handler: handler.LoginHandler},
	{method: "get", path: "/sessions/:sessionId", handler: handler.SessionHandler},
	{method: "get", path: "/user/:id", handler: handler.UserGetHandler},
	{method: "post", path: "/user", handler: handler.UserPostHandler},
}
