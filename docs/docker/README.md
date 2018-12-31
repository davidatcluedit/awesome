# Docker 시작하기

Docker는 애플리케이션을 신속하게 구축, 테스트 및 배포할 수 있는 소프트웨어 플랫폼입니다. Docker는 소프트웨어를 컨테이너라는 표준화된 유닛으로 패키징하며, 이 컨테이너에는 라이브러리, 시스템 도구, 코드, 런타임 등 소프트웨어를 실행하는 데 필요한 모든 것이 포함되어 있습니다. Docker를 사용하면 환경에 구애받지 않고 애플리케이션을 신속하게 배포 및 확장할 수 있으며 코드가 문제없이 실행될 것임을 확신할 수 있습니다!

::: tip
**Docker를 사용해야 하는 이유?**
Docker를 사용하면 코드를 더 빨리 전달하고, 애플리케이션 운영을 표준화하고, 코드를 원활하게 이동하고, 리소스 사용률을 높여 비용을 절감할 수 있습니다. Docker를 사용하면 어디서나 안정적으로 실행할 수 있는 단일 객체를 확보하게 됩니다. Docker의 간단한 구문을 사용해 완벽하게 제어할 수 있습니다. 폭넓게 도입되었다는 것은 Docker를 사용할 수 있는 도구 및 상용 애플리케이션의 에코시스템이 강력하다는 의미입니다.
:::

## Docker Container 만들기

::: tip
**컨테이너?**
도커 컨테이너란 일종의 소프트웨어를 이 소프트웨어의 실행에 필요한 모든 것을 포함하는 완전한 파일 시스템 안에 감싼 형태를 말합니다. OS 레벨의 가상화를 지원하는 것이라고 할 수 있습니다. 이 컨테이너는 코드, 런타임, 시스템 도구, 시스템 라이브러리 등 서버에 설치되는 무엇이든 아우르고 있습니다! 이는 실행 중인 환경에 관계 없이 언제나 동일하게 실행될 것을 보증합니다.
:::

먼저, Dockerfile을 작성해, container를 만들어봅시다.

### Dockerfile 작성하기

::: tip
더 자세한 instruction의 사용법은 [공식문서](https://docs.docker.com/engine/reference/builder/)에서 확인하세요!
:::

Dockerfile의 기본적인 format입니다.

```Dockerfile
# Comment
INSTRUCTION arguments
```

먼저, Dockerfile을 만들어봅시다.

```bash
touch ./Dockerfile
# 또는
vi ./Dockerfile
```

#### FROM

FROM instruction을 이용해, 컨테이너의 base가 될 image를 선택합니다.

```Dockerfile
# Dockerfile
FROM <image>[:<tag>] [AS <name>]
# 또는
FROM <image>[@<digest>] [AS <name>]
```

#### WORKDIR

Dockerfile에 작성한 instruction을 실행할 경로를 입력합니다.

::: tip
**RUN cd path**로 경로를 변경하더라도,
다음 instruction을 실행하는 시점에 경로가 초기화되므로 반드시 작성해야합니다.
:::

```Dockerfile
# Dockerfile
WORKDIR <path>
```

#### COPY

파일이나 디렉토리를 도커 컨테이너로 복사합니다.

```Dockerfile
# Dockerfile
COPY [--chown=<user>:<group>] <src>... <dest>
# 만약 경로에 whitespace가 포함되어 있다면, 이러한 형태로 작성해야합니다.
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

#### ADD

COPY와 비슷하지만, url 경로를 입력해서 파일을 가져오는 것이 가능하고,
압축 파일인 경우, 압축을 해제해 도커 컨테이너 내부로 복사합니다.

```Dockerfile
# Dockerfile
ADD [--chown=<user>:<group>] <src>... <dest>
# 만약 경로에 whitespace가 포함되어 있다면, 이러한 형태로 작성해야합니다.
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

```Dockerfile
# Dockerfile

# 도커 컨테이너의 base가 될 이미지를 선택합니다.
FROM <image>[:<tag>] [AS <name>]
FROM <image>[@<digest>] [AS <name>]

# Dockerfile에 작성한 instruction을 실행할 경로를 입력합니다.
# RUN cd <path> 커맨드를 사용해 경로를 변경하더라도,
# 다음 instruction을 실행하는 시점에 경로가 초기화되므로 반드시 작성해야합니다.
WORKDIR <path>

# 파일이나 디렉토리를 도커 컨테이너로 복사합니다.
COPY [--chown=<user>:<group>] <src>... <dest>
# 만약 경로에 whitespace가 포함되어 있다면, 이러한 형태로 작성해야합니다.
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]

# COPY와 비슷하지만, url 경로를 입력해서 파일을 가져오는 것이 가능하고,
# 압축 파일인 경우, 압축을 해제해 도커 컨테이너 내부로 복사합니다.
ADD [--chown=<user>:<group>] <src>... <dest>
# 만약 경로에 whitespace가 포함되어 있다면, 이러한 형태로 작성해야합니다.
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]

#
ENTRYPOINT

# /bin/sh -c
RUN <command>

# /bin/sh -c
CMD <command>

# 외부로
EXPOSE <port> [<port>...]

#
VOLUME <path> [<path>...]

# ENV 값을 설정하는 instruction입니다.
ENV <key> <value>
ENV <key>=<value>
```

### ARG instruction 활용법

```bash
docker build --build-arg <varname>=<value>
```

```Dockerfile
# Dockerfile

ARG <name>[=<default value>]
```

예제

```Dockerfile
# Dockerfile

ARG VERSION=latest
FROM busybox:$VERSION
ARG VERSION
RUN echo $VERSION > image_version
```

### ENV 값의 활용 예제

ENV instruction을 사용해서, 값을 정해두고, ${key}로 값을 사용할 수 있습니다!

```Dockerfile
# Dockerfile

FROM busybox
ENV foo /bar
WORKDIR ${foo}   # WORKDIR /bar
ADD . $foo       # ADD . /bar
COPY \$foo /quux # COPY $foo /quux
```

### Build Cache

## Docker build 하기

```bash
# Dockerfile로 도커 이미지를 빌드합니다. context는 디렉토리 경로나 url을 입력해줍니다.

# . 경로를 context로 설정해, 도커 이미지를 빌드합니다.
docker build .

# Dockerfile 경로를 직접 설정해줄 수 있습니다.
docker build -f /path/to/a/Dockerfile .

# 도커 이미지를 빌드하면서, repository에 저장될 태그를 설정할 수 있습니다.
docker build -t shykes/myapp .

# 여러개의 태그를 동시에 지정할 수도 있습니다.
docker build -t shykes/myapp:1.0.2 -t shykes/myapp:latest .
```

## docker compose 활용하기

## .dockerignore

.gitignore를 사용할 때처럼, Dockerfile에서 COPY, ADD instruction을 사용할 때, 특정 파일이나 디렉토리를 무시할 수 있습니다. 아래는 .dockerignore의 예제입니다.

```.dockerignore
# .dockerignore

# comment
*/temp*
*/*/temp*
temp?
```
