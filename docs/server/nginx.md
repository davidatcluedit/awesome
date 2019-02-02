# Nginx

Nginx(엔진엑스!)는 웹서버 소프트웨어입니다.

## Nginx 기능

[출처](https://ko.wikipedia.org/wiki/Nginx)

### HTTP 프록시와 웹 서버 기능

1. 정적 파일과 인덱스 파일 표현, 자동 인덱싱 기능.
2. 캐싱을 통한 리버스 프록시
3. 로드 밸런싱
4. 고장 진단
5. SSL 지원
6. 캐싱을 통한 FastCGI 지원
7. Name-, IP-기반 가상서버
8. FLV 스트리밍
9. MP4 스트리밍 모듈을 이용한 MP4 스트리밍
10. 웹페이지 접근 인증
11. gzip 압축
12. 10000개의 동시 접속을 처리할 수 있는 능력
13. URL 다시쓰기 (URL rewriting)
14. 맞춤 로깅
15. 서버 사이드 기능 포함
16. WebDAV

### 메일 프록시 기능

1. SMTP, POP3, IMAP 프록시
2. STARTTLS 지원
3. SSL 지원

## Nginx 설정 예

### Node.js

일반적인 경우.

```nginx
server {
    listen 80;
    server_name {example.com};
    root /home/{id}/www;

    client_max_body_size 10M;

    location ^~ /.well-known/acme-challenge/ {
        allow all;
    }

    location ~ /\. {
        deny all;
    }

    location ~* \.(log|binary|pem|enc|crt|conf|cnf|sql|sh|key)$ {
        deny all;
    }

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        log_not_found off;
        access_log off;
    }

    location / {
        proxy_pass http://localhost:{port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

ssl 적용 (letsencrypt 활용)

```nginx
server {
    listen 80;
    server_name {example.com};
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name {example.com};
    root /home/{id}/www;

    client_max_body_size 10M;

    ssl_certificate "/etc/letsencrypt/live/{example.com}/fullchain.pem";
    ssl_certificate_key "/etc/letsencrypt/live/{example.com}/privkey.pem";
    ssl_dhparam "/etc/ssl/certs/dhparam.pem";

    add_header Strict-Transport-Security "max-age=31536000";

    ssl_session_cache shared:SSL:20m;
    ssl_session_timeout 10m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5';

    access_log /var/log/nginx/{example.com}.access.log;
    error_log /var/log/nginx/{example.com}.error.log warn;

    location ^~ /.well-known/acme-challenge/ {
        allow all;
    }

    location ~ /\. {
        deny all;
    }

    location ~* \.(log|binary|pem|enc|crt|conf|cnf|sql|sh|key)$ {
        deny all;
    }

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        log_not_found off;
        access_log off;
    }

    location / {
        proxy_pass http://localhost:{port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SPA (Single Page Application)

```nginx
server {
    listen 80;
    server_name {example.com};
    root /home/{id}/www;

    client_max_body_size 10M;

    location ^~ /.well-known/acme-challenge/ {
        allow all;
    }

    location ~ /\. {
        deny all;
    }

    location ~* \.(log|binary|pem|enc|crt|conf|cnf|sql|sh|key)$ {
        deny all;
    }

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        log_not_found off;
        access_log off;
    }

    location / {
        rewrite .* /index.html break;
    }
}
```

```nginx
server {
    listen 80;
    server_name {example.com};
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name {example.com};
    root /home/{id}/www;

    client_max_body_size 10M;

    ssl_certificate "/etc/letsencrypt/live/{example.com}/fullchain.pem";
    ssl_certificate_key "/etc/letsencrypt/live/{example.com}/privkey.pem";
    ssl_dhparam "/etc/ssl/certs/dhparam.pem";

    add_header Strict-Transport-Security "max-age=31536000";

    ssl_session_cache shared:SSL:20m;
    ssl_session_timeout 10m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5';

    access_log /var/log/nginx/{example.com}.access.log;
    error_log /var/log/nginx/{example.com}.error.log warn;

    location ^~ /.well-known/acme-challenge/ {
        allow all;
    }

    location ~ /\. {
        deny all;
    }

    location ~* \.(log|binary|pem|enc|crt|conf|cnf|sql|sh|key)$ {
        deny all;
    }

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        log_not_found off;
        access_log off;
    }

    location / {
        rewrite .* /index.html break;
    }
}
```
