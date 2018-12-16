# nginx
- [反向代理配置](#反向代理配置)
- [负载均衡配置](#负载均衡配置)
- [搭建文件服务器](#搭建文件服务器)
- [跨域解决方案](#跨域解决方案)
- [其他](#其他)
    - [root配置](#root配置)
    - [location匹配规则](#location匹配规则)

## 反向代理配置
```conf
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    #设定实际的服务器列表
    upstream zp_server1{
        server 127.0.0.1:3000;
    }

    server {
        listen       443;
        server_name  localhost;
        #root   F:/nas/SilverBulletRails/Backend/public;
        charset utf-8;
        access_log  logs/host.access.log main;
        #通用请求配置
        location / {
            #root   /app/views/silver_bullets;
            #index  index.jsp index.html index.htm index.html.erb;
            #反向服务器地址
            proxy_pass        http://zp_server1;  
            #proxy_pass        http://127.0.0.1:3000;   
            proxy_redirect off;
            # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;  
            proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;

        }
        #首页请求配置
        location = / {
            proxy_pass        http://127.0.0.1:3000/silver_bullets;
            #root   F:/nas/SilverBulletRails/Backend/public;
            #index  index.jsp index.html index.htm index.html.erb;
        }
        #静态文件配置，nginx自己处理，不去backend请求
        #可以匹配后缀
        #location ~ .*\.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$   
        #location ~* \.(gif|jpg|jpeg|bmp|png|js|css)$
        #{   
            #root F:/nas/SilverBulletRails/Backend/public;
            #expires      7d; 
        #}
        #可以匹配目录
        #严格匹配static，不是正则匹配
        #location ^~ /static/ {
        #是正则匹配
        location ~ ^/(static)/ {
            root F:/nas/SilverBulletRails/Backend/public;
            expires      7d;
        }
        #设定查看Nginx状态的地址
        location /nginx_status {
            stub_status on;
            access_log off;
            allow 192.168.10.0/24;
            #deny all;
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        #错误页面
        location = /50x.html {
            root   html;
        }
    }

}
```
## 负载均衡配置
```conf
#负载均衡配置
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    #设定实际的服务器列表
    #提供负载均衡的服务器
    upstream zp_server1{
        server 127.0.0.1:3000   weight=5;
        server 127.0.0.2:3000   weight=1;
        server 127.0.0.3:3000   weight=6;
    }

    server {
        listen       443;
        server_name  localhost;
        #root   F:/nas/SilverBulletRails/Backend/public;
        charset utf-8;
        access_log  logs/host.access.log main;
        #通用请求配置
        location / {
            #root   /app/views/silver_bullets;
            #index  index.jsp index.html index.htm index.html.erb;
            proxy_pass        http://zp_server1;  
            #proxy_pass        http://127.0.0.1:3000;   
            proxy_redirect off;
            # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;  
            proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;

        }
        #首页请求配置
        location = / {
            proxy_pass        http://127.0.0.1:3000/silver_bullets;
            #root   F:/nas/SilverBulletRails/Backend/public;
            #index  index.jsp index.html index.htm index.html.erb;
        }
        #静态文件配置，nginx自己处理，不去backend请求
        #可以匹配后缀
        #location ~ .*\.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$   
        #location ~* \.(gif|jpg|jpeg|bmp|png|js|css)$
        #{   
            #root F:/nas/SilverBulletRails/Backend/public;
            #expires      7d; 
        #}
        #可以匹配目录
        #严格匹配static，不是正则匹配
        #location ^~ /static/ {
        #是正则匹配
        location ~ ^/(static)/ {
            root F:/nas/SilverBulletRails/Backend/public;
            expires      7d;
        }
        #设定查看Nginx状态的地址
        location /nginx_status {
            stub_status on;
            access_log off;
            allow 192.168.10.0/24;
            #deny all;
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        #错误页面
        location = /50x.html {
            root   html;
        }
    }
}

```
## 搭建文件服务器
```conf
#文件服务器
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    #设定实际的服务器列表
    upstream zp_server1{
        server 127.0.0.1:3000;
    }

    #autoindex on;
    #autoindex_exact_size off;
    #autoindex_localtime on;

    #文件服务器设置
    autoindex on;# 显示目录
    autoindex_exact_size on;# 显示文件大小
    autoindex_localtime on;# 显示文件时间

    server {
        listen       443;
        server_name  localhost;
        access_log  logs/host.access.log main;
        charset      utf-8,gbk; # windows 服务器下设置后，依然乱码，暂时无解
        root         F:/nas/SilverBulletRails/Backend/public;
    }
}
```
## 跨域解决方案
```conf
#跨域解决方案
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    #设定实际的服务器列表
    #前端范围
    upstream front_server{
        server 127.0.0.1:8080;
    }
    #后端服务
    upstream api_server{
        server 127.0.0.1:3000;
    }

    server {
        listen       443;
        server_name  localhost;
        charset utf-8;
        access_log  logs/host.access.log main;
        #后端请求配置
        location ~ ^/api/ {
            #include enable-cors.conf;
            proxy_pass http://api_server;
            rewrite "^/api/(.*)$" /$1 break;
        }
        #首页请求配置
        location ~ ^/ {
            proxy_pass http://front_server;
        }
        #静态文件配置，nginx自己处理，不去backend请求
        #可以匹配后缀
        #location ~ .*\.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$   
        #location ~* \.(gif|jpg|jpeg|bmp|png|js|css)$
        #{   
            #root F:/nas/SilverBulletRails/Backend/public;
            #expires      7d; 
        #}
        #可以匹配目录
        #严格匹配static，不是正则匹配
        #location ^~ /static/ {
        #是正则匹配
        #location ~ ^/(static)/ {
            #root F:/nas/SilverBulletRails/Backend/public;
            #expires      7d;
        #}
        #设定查看Nginx状态的地址
        location /nginx_status {
            stub_status on;
            access_log off;
            allow 192.168.10.0/24;
            #deny all;
        }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        #错误页面
        location = /50x.html {
            root   html;
        }
    }
}

```
## 其他
### root配置
- 如果是设置反向代理，root不需要配置
- 如果处理静态资源，则root指定资源路径，nginx处理静态文件的root必须为nginx能有效识别的地址
### location匹配规则
- 以=开头表示精确匹配
- ^~ 开头表示uri以某个常规字符串开头，不是正则匹配
- ~ 开头表示区分大小写的正则匹配;
- ~* 开头表示不区分大小写的正则匹配
- / 通用匹配, 如果没有其它匹配,任何请求都会匹配到