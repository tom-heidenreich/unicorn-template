FROM golang:1.18

COPY . /app

WORKDIR /app/src

ENV MODE=prod

RUN go mod vendor

RUN go build .

CMD ["./api"]