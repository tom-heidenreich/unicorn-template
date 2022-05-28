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
	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)

	var err error

	client, err = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://"+host).SetAuth(credentials))

	if err != nil {
		panic(err)
	}

	if err = client.Ping(ctx, nil); err != nil {
		panic(err)
	}

	Database = client.Database(database)
}
