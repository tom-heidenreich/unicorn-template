<a href="https://github.com/tom-heidenreich/unicorn-template">
    <p align="center">
        <img height=100 src="https://raw.githubusercontent.com/tom-heidenreich/unicorn-template/prerelease-1.0.0/.assets/unicorn_banner.svg"/>
        <br/>
        <span style="color: gray; font-size: 1.2rem;">Release 1.0.0</span>
    </p>
</a>

This template will help you build the next unicorn and go to the moon.
The API is built with [Gin](https://github.com/gin-gonic/gin) and the
Frontend with [Next.js](https://nextjs.org).


> **Note:** This is *work in progress* 

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

## Work in DevContainer
* Install [Docker](https://www.docker.com/get-started/)
* Open VSCode and install [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
* Open the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) and type `Remote-Containers: Open Folder in Container`
* Click `Open`
* Select `dockerfile.local.yml`
* Select the service to work on