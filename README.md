<h1 align="center">
    Welcome to the next Unicorn
</h1>

This template will help you build the next unicorn and go to the moon.
The API is built with [Gin](https://github.com/gin-gonic/gin) and the
Frontend with [Next.js](https://nextjs.org).


> **Note:** This is *work in progress* 

<br/>

## Run local
* Clone the project
```shell
$ git clone https://github.com/tom-heidenreich/unicorn-template.git
```
* Start [Docker](https://www.docker.com/get-started/)
```shell
$ sh run.sh prod up --build
```
or (_for Windows_):
```shell
$ docker-compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

<br/>

## Work in DevContainer
* Install [Docker](https://www.docker.com/get-started/)
* Open VSCode and install [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
* Open the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) and type `Remote-Containers: Open Folder in Container`
* Click `Open`
* Select `dockerfile.local.yml`
* Select the service to work on