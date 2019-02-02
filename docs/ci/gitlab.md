# to 유찬형

.gitlab-ci.yml을 프로젝트 루트 경로에 넣어주시면 됩니다 ㅋㅋ
아래는 파일 내용이에요

```yaml
# .gitlab-ci.yml

# 일단 php용 도커 이미지를 선택하고요.
image: tetraweb/php

# 실제 스크립트를 실행하기 전에 사전준비를 해요.
before_script:
  # 이건 뭐 아실테고 ㅋㅋㅋ
  - apt-get update
  # 이것도 잘 알고 계시죠!
  - apt-get install zip unzip
  # 이거는 이제 컴포져 설치!
  - php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
  - php composer-setup.php
  - php -r "unlink('composer-setup.php');"
  # 그리고 디펜던시 설치
  - php composer.phar install
  # 그리고 vendor 같은 경우에는 pipeline에서 설치하면서 만들어낼 수 있으니까, git repo내에 포함시킬 필요는 없을거같아요!
  # ssh 준비!
  - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
  - mkdir -p ~/.ssh
  - eval $(ssh-agent -s)
  - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'

# pipeline에 들어갈 job 이름이에요.
deploy-to-server:
  stage: deploy
  # 이거는 이제, 여기 보시면 빠르실거에요!
  # https://docs.gitlab.com/ee/user/project/pipelines/job_artifacts.html
  artifacts:
    paths:
    - build/
  only:
    # 마스터 브랜치에 푸시가 들어오는 경우로 제한하는거에요.
    - master
  script:
    # 여기서부터 이제 실제 스크립트
    # ssh key 넣어주구요
    - ssh-add <(echo "$STAGING_PRIVATE_KEY")
    # ssh 붙은 다음 임시 디렉토리 하나 만들어줍니다!
    - ssh -p22 server_user@server_host "mkdir /임시/디렉토리"
    # 요 커맨드가 이제 ssh를 이용해서, 파일을 이동하는 커맨드!
    # 임시 디렉토리에 저장했다가, 라이브 파일들을 또다른 임시 디렉토리로 옮기고 임시 디렉토리에 올려놓은 새버전을
    # 라이브 경로에 옮겨놓습니다. 그리고 이전 버전은 삭제하시면 끝이에요!
    - scp -P22 -r 옮길파일경로 server_user@server_host:/임시/디렉토리
    - ssh -p22 server_user@server_host "mv /현재/live /현재/live/임시 && mv /임시/디렉토리 /현재/live"
    - ssh -p22 server_user@server_host "rm -rf /현재/live/임시"
```
