package dynamo

import (
	"encoding/json"

	"github.com/google/uuid"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
)

type Entry struct {
	Partition string

	Value string
}

var table dynamo.Table

func ID() string {
	return uuid.New().String()
}

func New(tableId string) {
	NewConfig(tableId, aws.Config{Region: aws.String("us-west-2")})
}

func NewConfig(tableId string, config aws.Config) {
	sess := session.Must(session.NewSession())
	db := dynamo.New(sess, &config)
	table = db.Table(tableId)
}

func Put(key string, value string) error {
	return table.Put(Entry{Partition: key, Value: value}).Run()
}

func PutJSON(key string, value interface{}) error {

	json, err := json.Marshal(value)

	if err != nil {
		return err
	}

	return Put(key, string(json))
}

func Get(key string) (Entry, error) {
	var result Entry
	err := table.Get("UserID", key).One(&result)
	return result, err
}
