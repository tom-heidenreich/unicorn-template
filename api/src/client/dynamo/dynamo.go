package dynamo

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
)

type Entry struct {
	partition string

	value string
}

var table dynamo.Table

func New(tableId string) {
	NewConfig(tableId, aws.Config{Region: aws.String("us-west-2")})
}

func NewConfig(tableId string, config aws.Config) {
	sess := session.Must(session.NewSession())
	db := dynamo.New(sess, &config)
	table = db.Table(tableId)
}

func Put(key, value string) error {
	return table.Put(Entry{}).Run()
}

func Get(key string) (Entry, error) {
	var result Entry
	err := table.Get("UserID", key).One(&result)
	return result, err
}
