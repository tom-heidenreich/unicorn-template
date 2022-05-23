package main

import (
	"api/handler" // shows error but there is none

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
}
