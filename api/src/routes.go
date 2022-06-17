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
	{method: "get", path: "/session/:sessionId", handler: handler.SessionGetHandler},
	{method: "post", path: "/session/:sessionId", handler: handler.SessionPostHandler},
	{method: "get", path: "/user/:id", handler: handler.UserGetHandler},
	{method: "post", path: "/user", handler: handler.UserPostHandler},
}
