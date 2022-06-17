package mongodb

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var cancel context.CancelFunc
var client *mongo.Client

var Database *mongo.Database

func New(host string, database string, username string, password string) {

	credentials := options.Credential{
		Username: username,
		Password: password,
	}

	var ctx context.Context
	ctx, cancel = context.WithTimeout(context.Background(), 20*time.Second)

	var err error

	client, err = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://"+host).SetAuth(credentials))

	if err != nil {
		println("Error connecting to mongodb: " + err.Error())
		time.Sleep(time.Second)
		New(host, database, username, password)
		return
	}

	if err = client.Ping(ctx, nil); err != nil {
		panic(err)
	}

	println("Connected to mongodb")

	Database = client.Database(database)
}
