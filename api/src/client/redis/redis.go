package redis

import (
	"context"
	"encoding/json"

	"github.com/go-redis/redis/v8"
	"github.com/google/uuid"
)

var ctx = context.Background()
var client *redis.Client

func New() {
	client = redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})
}

type Session struct {
	User string
	Todo []Todo
}

type Todo struct {
	Id   string
	Todo string
}

func CreateSession(session Session) (string, error) {

	// generate session id
	sessionId := uuid.New().String()

	// session as json string
	data, err := json.Marshal(session)

	if err != nil {
		return "", err
	}

	redis_err := client.Set(ctx, sessionId, string(data), 0).Err()

	if err != nil {
		return "", redis_err
	}

	return sessionId, nil
}

func GetSession(sessionId string) (Session, error) {

	value, redis_err := client.Get(ctx, sessionId).Result()

	if redis_err != nil {
		return Session{}, redis_err
	}

	// json string to session
	session := Session{}
	err := json.Unmarshal([]byte(value), &session)

	if err != nil {
		return Session{}, err
	}

	return session, nil
}
