package main

import (
	"github.com/gin-gonic/gin"
	"api/client"
)

func main() {
	// create redis client (learn more: https://github.com/go-redis/redis)
	client.InitRedisClient()

	// create gin http server (learn more: https://github.com/gin-gonic/gin)
	r := gin.Default()

	for _, route := range routes {
		switch route.method {
		case "get":
			r.GET(route.path, route.handler)
		case "post":
			r.POST(route.path, route.handler)
		case "put":
			r.PUT(route.path, route.handler)
		case "delete":
			r.DELETE(route.path, route.handler)
		case "patch":
			r.PATCH(route.path, route.handler)
		case "head":
			r.HEAD(route.path, route.handler)
		case "options":
			r.OPTIONS(route.path, route.handler)
		default:
			panic("http method" + route.method + " not found!")
		}
	}

	r.Run(":3000")
}
