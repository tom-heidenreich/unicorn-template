FROM golang:1.18

COPY . /app

WORKDIR /app/src

RUN go mod vendor

RUN go build .

CMD ["./api"]