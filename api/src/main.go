package main

import (
	"api/client/redis"

	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	// set to release mode
	if os.Getenv("MODE") == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}

	// create redis client (learn more: https://github.com/go-redis/redis)
	go redis.New()

	// create gin http server (learn more: https://github.com/gin-gonic/gin)
	r := gin.Default()

	// remove trusted proxies
	r.SetTrustedProxies([]string{})

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
