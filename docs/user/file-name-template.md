---
ignore_macros: true
---
# 文件名格式

录播姬的文件名模板使用了 [Liquid](https://shopify.github.io/liquid/basics/introduction/){target=_blank} ([第三方中文镜像](https://liquid.bootcss.com/basics/introduction/){target=_blank}) 语法，如果你用过下面这些工具的话这个语法应该会很熟悉。

- Jekyll
- Jinja (Python)
- Django (Python)
- pkg.go.dev/text/template (Go)

基础的语法请参考 [Liquid 原版文档](https://shopify.github.io/liquid/basics/introduction/){target=_blank} 或 [第三方翻译的中文镜像](https://liquid.bootcss.com/basics/introduction/){target=_blank}，这里就不再复制粘贴过来一份了。

录播姬默认的模板内容是

```jinja
{{ roomId }}-{{ name }}/录制-{{ roomId }}-{{ "now" | time_zone: "Asia/Shanghai" | format_date: "yyyyMMdd-HHmmss-fff" }}-{{ title }}.flv
```

生成的文件名格式是类似这样的

```txt
23058-3号直播间/录制-23058-20220505-225933-067-哔哩哔哩音悦台.flv
```

录播姬会自动过滤掉直播间标题、主播名字中不能用作文件名的特殊字符，并替换为 `_` 下划线。
在模板运行结束后会再过滤一次路径，保证输出的文件名里没有不能用的特殊字符。

如果设置的文件名模板中有语法错误，录播姬会使用默认的模板格式。

## 用法示例

!!! example "示例 1"
    ```jinja
    {{ roomId }}-{{ name }}/录制-{{ roomId }}-{{ "now" | time_zone: "Asia/Shanghai" | format_date: "yyyyMMdd-HHmmss-fff" }}-{{ title }}.flv
    ```
    ```txt
    23058-3号直播间/录制-23058-20220505-225933-067-哔哩哔哩音悦台.flv
    ```

    把 `"now"` 传入时间处理函数可以输出当前时间，先使用 `time_zone` 设置时区为中国时间，然后使用 `format_date` 格式化成文本。
    如果不设置时区，默认会使用系统当前时区。

!!! example "示例 2"
    ```jinja
    {{ roomId }}-{{ name }}/{{ "now" | time_zone: "Asia/Shanghai" | format_date: "yyyyMMdd-HHmmss" }}-{% random 4 %}-{{ title }}.flv
    ```
    ```txt
    23058-3号直播间/20220505-225933-2223-哔哩哔哩音悦台.flv
    ```

    使用 ```{% random 4 %}``` 生成了 4 位随机数。

!!! example "示例 3"
    ```jinja
    {{ roomId }} ({{ name }})/{{ "now" | time_zone: "Asia/Shanghai" | format_date: "yyyyMMdd" }}/{{ "now" | time_zone: "Asia/Shanghai" | format_date: "HHmmss-fff" }}-{{ title }}.flv
    ```
    ```txt
    23058 (3号直播间)/20220505/225933-067-哔哩哔哩音悦台.flv
    ```

    使用 `/` 表示一层文件夹。这个例子里每天都会新建一个名字是当前年月日的文件夹。

!!! example "示例 4"
    ```jinja
    {{ areaParent }}/{{ roomId }}-{{ name }}/录制-{{ roomId }}-{{ "now" | time_zone: "Asia/Shanghai" | format_date: "yyyyMMdd-HHmmss-fff" }}-{{ title }}.flv
    ```
    ```txt
    电台/23058-3号直播间/录制-23058-20220505-225933-067-哔哩哔哩音悦台.flv
    ```

    按直播间所在分区分文件夹。

!!! example "示例 5"
    ```jinja
    {{ roomId }}-{{ name }}/{{ qn | format_qn }}-{{ roomId }}-{{ "now" | time_zone: "Asia/Shanghai" | format_date: "yyyyMMdd-HHmmss-fff" }}-{{ title }}.flv
    ```
    ```txt
    23058-3号直播间/20220118-183426/原画-23058-20220505-225933-067-哔哩哔哩音悦台.flv
    ```

    使用画质 ID `qn` 转换成对应的画质名字 `format_qn`。

!!! example "示例 6"
    ```jinja
    {{ roomId }}-{{ name }}/{{ json.room_info.live_start_time | time_zone: 'Asia/Shanghai' | format_date: "yyyyMMdd-HHmmss" }}/录制-{{ roomId }}-{{ "now" | time_zone: "Asia/Shanghai" | format_date: "yyyyMMdd-HHmmss-fff" }}-{{ title }}.flv
    ```
    ```txt
    23058-3号直播间/20220118-183426/录制-23058-20220505-225933-067-哔哩哔哩音悦台.flv
    ```

    根据开播时间分文件夹，每次直播都新建一个名字为开播时间的文件夹。

!!! example "示例 7"
    ```jinja
    {{ roomId }}-{{ name }}/录制-{{ roomId }}-{{ "now" | time_zone: "Asia/Shanghai" | format_date: "yyyyMMdd-HHmmss-fff" }}-{{ title }}-{{ partIndex | format_number: "000" }}.flv
    ```
    ```txt
    23058-3号直播间/录制-23058-20220505-225933-067-哔哩哔哩音悦台-001.flv
    ```

    `partIndex` 是分段序号，使用 `format_number` 把它变成以 `0` 开头的 3 位数，方便文件名排序。

## 变量列表

### `roomId`

房间号。

!!! example "例子"
    ```txt
    23058
    ```

### `shortId`

房间短号，没有短号的为 `0`

!!! example "例子"
    ```txt
    3
    ```

### `name`

主播名字

!!! example "例子"
    ```txt
    3号直播间
    ```

### `title`

直播间标题

!!! example "例子"
    ```txt
    哔哩哔哩音悦台
    ```

### `areaParent`

直播间所在主分区

!!! example "例子"
    ```txt
    电台
    ```

### `areaChild`

直播间所在子分区

!!! example "例子"
    ```txt
    唱见电台
    ```

### `partIndex`

从 `1` 开始的分段序号，手动分段、根据视频时长或文件大小自动分段之后会 +1

!!! example "例子"
    ```txt
    1
    ```

### `qn`

当前录制的画质 ID

如果需要画质名字可以使用 `format_qn` filter, 见本页面下面的文档。

!!! example "例子"
    ```txt
    10000
    ```

### `json`

请求B站直播 API 返回的原始数据的 `data` 部分。

```jinja
https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom?room_id={{房间号}}
```

??? example "JSON 数据参考"
    ```json
    {
      "room_info": {
        "uid": 11153765,
        "room_id": 23058,
        "short_id": 3,
        "title": "哔哩哔哩音悦台",
        "cover": "",
        "tags": "",
        "background": "https://i0.hdslb.com/bfs/live/2836bb7b84c792e2c6aadfd4d1cce13484775fa3.jpg",
        "description": "\u003cp\u003e这里是哔哩哔哩官方音乐台喔！\u003c/p\u003e\u003cp\u003e一起来听音乐吧ε=ε=(ノ≧∇≦)ノ\u003c/p\u003e\u003cp\u003e没想到蒸汽配圣诞下装，意外的很暴露呢=3=\u003c/p\u003e\n",
        "live_status": 1,
        "live_start_time": 1642502066,
        "live_screen_type": 0,
        "lock_status": 0,
        "lock_time": 0,
        "hidden_status": 0,
        "hidden_time": 0,
        "area_id": 190,
        "area_name": "唱见电台",
        "parent_area_id": 5,
        "parent_area_name": "电台",
        "keyframe": "http://i0.hdslb.com/bfs/live-key-frame/keyframe05061651000000023058bkekzp.jpg",
        "special_type": 0,
        "up_session": "204681708782508562",
        "pk_status": 0,
        "is_studio": false,
        "pendants": {
          "frame": {
            "name": "",
            "value": "",
            "desc": ""
          }
        },
        "on_voice_join": 0,
        "online": 6697,
        "room_type": {
          "2-3": 0,
          "3-21": 0
        }
      },
      "anchor_info": {
        "base_info": {
          "uname": "3号直播间",
          "face": "http://i2.hdslb.com/bfs/face/5d35da6e93fbfb1a77ad6d1f1004b08413913f9a.jpg",
          "gender": "保密",
          "official_info": {
            "role": 1,
            "title": "哔哩哔哩直播 官方账号",
            "desc": "",
            "is_nft": 0,
            "nft_dmark": "https://i0.hdslb.com/bfs/live/9f176ff49d28c50e9c53ec1c3297bd1ee539b3d6.gif"
          }
        },
        "live_info": {
          "level": 40,
          "level_color": 16746162,
          "score": 255237648,
          "upgrade_score": 0,
          "current": [
            25000000,
            147013810
          ],
          "next": [],
          "rank": "\u003e10000"
        },
        "relation_info": {
          "attention": 248859
        },
        "medal_info": {
          "medal_name": "电音",
          "medal_id": 123,
          "fansclub": 1643
        }
      },
      "news_info": {
        "uid": 11153765,
        "ctime": "2021-09-24 12:49:50",
        "content": "3号大歌厅是音悦台特别推出的测试栏目，23日-25日11点-23点为期3天，希望大家支持！"
      },
      "rankdb_info": {
        "roomid": 23058,
        "rank_desc": "小时总榜",
        "color": "#FB7299",
        "h5_url": "https://live.bilibili.com/p/html/live-app-rankcurrent/index.html?is_live_half_webview=1\u0026hybrid_half_ui=1,5,85p,70p,FFE293,0,30,100,10;2,2,320,100p,FFE293,0,30,100,0;4,2,320,100p,FFE293,0,30,100,0;6,5,65p,60p,FFE293,0,30,100,10;5,5,55p,60p,FFE293,0,30,100,10;3,5,85p,70p,FFE293,0,30,100,10;7,5,65p,60p,FFE293,0,30,100,10;\u0026anchor_uid=11153765\u0026rank_type=master_realtime_hour_room\u0026area_hour=1\u0026area_v2_id=190\u0026area_v2_parent_id=5",
        "web_url": "https://live.bilibili.com/blackboard/room-current-rank.html?rank_type=master_realtime_hour_room\u0026area_hour=1\u0026area_v2_id=190\u0026area_v2_parent_id=5",
        "timestamp": 1651234567
      },
      "area_rank_info": {
        "areaRank": {
          "index": 0,
          "rank": "\u003e1000"
        },
        "liveRank": {
          "rank": "\u003e10000"
        }
      },
      "battle_rank_entry_info": {
        "first_rank_img_url": "",
        "rank_name": "尚无段位",
        "show_status": 1
      },
      "tab_info": {
        "list": [
          {
            "type": "seven-rank",
            "desc": "高能榜",
            "isFirst": 1,
            "isEvent": 0,
            "eventType": "",
            "listType": "",
            "apiPrefix": "",
            "rank_name": "room_7day"
          },
          {
            "type": "guard",
            "desc": "大航海",
            "isFirst": 0,
            "isEvent": 0,
            "eventType": "",
            "listType": "top-list",
            "apiPrefix": "",
            "rank_name": ""
          }
        ]
      },
      "activity_init_info": {
        "eventList": [],
        "weekInfo": {
          "bannerInfo": null,
          "giftName": null
        },
        "giftName": null,
        "lego": {
          "timestamp": 1651234567,
          "config": "[{\"name\":\"frame-mng\",\"url\":\"https:\\/\\/live.bilibili.com\\/p\\/html\\/live-web-mng\\/index.html?roomid=#roomid#\u0026arae_id=#area_id#\u0026parent_area_id=#parent_area_id#\u0026ruid=#ruid#\",\"startTime\":1559544736,\"endTime\":1877167950,\"type\":\"frame-mng\"},{\"name\":\"s10-fun\",\"target\":\"sidebar\",\"icon\":\"https:\\/\\/i0.hdslb.com\\/bfs\\/activity-plat\\/static\\/20200908\\/3435f7521efc759ae1f90eae5629a8f0\\/HpxrZ7SOT.png\",\"text\":\"\\u7545\\u73a9s10\",\"url\":\"https:\\/\\/live.bilibili.com\\/s10\\/fun\\/index.html?room_id=#roomid#\u0026width=376\u0026height=600\u0026source=sidebar\",\"color\":\"#2e6fc0\",\"startTime\":1600920000,\"endTime\":1604721600,\"parentAreaId\":2,\"areaId\":86},{\"name\":\"genshin-avatar\",\"target\":\"sidebar\",\"icon\":\"https:\\/\\/i0.hdslb.com\\/bfs\\/activity-plat\\/static\\/20210721\\/fa538c98e9e32dc98919db4f2527ad02\\/qWxN1d0ACu.jpg\",\"text\":\"\\u539f\\u77f3\\u798f\\u5229\",\"url\":\"https:\\/\\/live.bilibili.com\\/activity\\/live-activity-full\\/genshin_avatar\\/mobile.html?no-jump=1\u0026room_id=#roomid#\u0026width=376\u0026height=550#\\/\",\"color\":\"#2e6fc0\",\"frameAllowNoBg\":\"1\",\"frameAllowDrag\":\"1\",\"startTime\":1627012800,\"endTime\":1630425540,\"parentAreaId\":3,\"areaId\":321}]"
        }
      },
      "voice_join_info": {
        "status": {
          "open": 0,
          "anchor_open": 0,
          "status": 0,
          "uid": 0,
          "user_name": "",
          "head_pic": "",
          "guard": 0,
          "start_at": 0,
          "current_time": 1651234567
        },
        "icons": {
          "icon_close": "https://i0.hdslb.com/bfs/live/a176d879dffe8de1586a5eb54c2a08a0c7d31392.png",
          "icon_open": "https://i0.hdslb.com/bfs/live/70f0844c9a12d29db1e586485954290144534be9.png",
          "icon_wait": "https://i0.hdslb.com/bfs/live/1049bb88f1e7afd839cc1de80e13228ccd5807e8.png",
          "icon_starting": "https://i0.hdslb.com/bfs/live/948433d1647a0704f8216f017c406224f9fff518.gif"
        },
        "web_share_link": "https://live.bilibili.com/h5/23058"
      },
      "ad_banner_info": {
        "data": null
      },
      "skin_info": {
        "id": 0,
        "skin_name": "",
        "skin_config": "",
        "show_text": "",
        "skin_url": "",
        "start_time": 0,
        "end_time": 0,
        "current_time": 1651234567
      },
      "web_banner_info": {
        "id": 0,
        "title": "",
        "left": "",
        "right": "",
        "jump_url": "",
        "bg_color": "",
        "hover_color": "",
        "text_bg_color": "",
        "text_hover_color": "",
        "link_text": "",
        "link_color": "",
        "input_color": "",
        "input_text_color": "",
        "input_hover_color": "",
        "input_border_color": "",
        "input_search_color": ""
      },
      "lol_info": {
        "lol_activity": {
          "status": 0,
          "guess_cover": "http://i0.hdslb.com/bfs/live/61d1c4bcce470080a5408d6c03b7b48e0a0fa8d7.png",
          "vote_cover": "https://i0.hdslb.com/bfs/activity-plat/static/20190930/4ae8d4def1bbff9483154866490975c2/oWyasOpox.png",
          "vote_h5_url": "https://live.bilibili.com/p/html/live-app-wishhelp/index.html?is_live_half_webview=1\u0026hybrid_biz=live-app-wishhelp\u0026hybrid_rotate_d=1\u0026hybrid_half_ui=1,3,100p,360,0c1333,0,30,100;2,2,375,100p,0c1333,0,30,100;3,3,100p,360,0c1333,0,30,100;4,2,375,100p,0c1333,0,30,100;5,3,100p,360,0c1333,0,30,100;6,3,100p,360,0c1333,0,30,100;7,3,100p,360,0c1333,0,30,100;8,3,100p,360,0c1333,0,30,100;",
          "vote_use_h5": true
        }
      },
      "pk_info": null,
      "battle_info": null,
      "silent_room_info": {
        "type": "",
        "level": 0,
        "second": 0,
        "expire_time": 0
      },
      "switch_info": {
        "close_guard": false,
        "close_gift": false,
        "close_online": false,
        "close_danmaku": false
      },
      "record_switch_info": {
        "record_tab": false
      },
      "room_config_info": {
        "dm_text": "发个弹幕呗~"
      },
      "gift_memory_info": {
        "list": null
      },
      "new_switch_info": {
        "room-socket": 1,
        "room-prop-send": 1,
        "room-sailing": 1,
        "room-info-popularity": 1,
        "room-danmaku-editor": 1,
        "room-effect": 1,
        "room-fans_medal": 1,
        "room-report": 1,
        "room-feedback": 1,
        "room-player-watermark": 1,
        "room-recommend-live_off": 1,
        "room-activity": 1,
        "room-web_banner": 1,
        "room-silver_seeds-box": 1,
        "room-wishing_bottle": 1,
        "room-board": 1,
        "room-supplication": 1,
        "room-hour_rank": 1,
        "room-week_rank": 1,
        "room-anchor_rank": 1,
        "room-info-integral": 1,
        "room-super-chat": 1,
        "room-tab": 1,
        "room-hot-rank": 1,
        "fans-medal-progress": 1,
        "gift-bay-screen": 1,
        "room-enter": 1,
        "room-my-idol": 1,
        "room-topic": 1,
        "fans-club": 1
      },
      "super_chat_info": {
        "status": 1,
        "jump_url": "https://live.bilibili.com/p/html/live-app-superchat2/index.html?is_live_half_webview=1\u0026hybrid_half_ui=1,3,100p,70p,ffffff,0,30,100,12,0;2,2,375,100p,ffffff,0,30,100,0,0;3,3,100p,70p,ffffff,0,30,100,12,0;4,2,375,100p,ffffff,0,30,100,0,0;5,3,100p,60p,ffffff,0,30,100,12,0;6,3,100p,60p,ffffff,0,30,100,12,0;7,3,100p,60p,ffffff,0,30,100,12,0",
        "icon": "https://i0.hdslb.com/bfs/live/0a9ebd72c76e9cbede9547386dd453475d4af6fe.png",
        "ranked_mark": 0,
        "message_list": []
      },
      "online_gold_rank_info_v2": {
        "list": [
          {
            "uid": 20455817,
            "face": "http://i2.hdslb.com/bfs/face/85b49d96bd506c84831eca97c35534cfb696b578.jpg",
            "uname": "咕咕Q",
            "score": "114",
            "rank": 1,
            "guard_level": 0
          },
          {
            "uid": 6331378,
            "face": "http://i1.hdslb.com/bfs/face/95d0f044829772cfc871008b56a3e8543f6d846f.jpg",
            "uname": "伊卡萌神",
            "score": "109",
            "rank": 2,
            "guard_level": 0
          },
          {
            "uid": 85012323,
            "face": "http://i0.hdslb.com/bfs/face/9d29c2d8f760afbda101788e3562cbd35773edba.jpg",
            "uname": "我会咬打火机",
            "score": "109",
            "rank": 3,
            "guard_level": 0
          },
          {
            "uid": 8648034,
            "face": "http://i0.hdslb.com/bfs/face/0e18dd3f02c5e64fd280d48ac7c50a3f2fbe8e0f.jpg",
            "uname": "在异世界开泥头车",
            "score": "107",
            "rank": 4,
            "guard_level": 0
          },
          {
            "uid": 30377724,
            "face": "http://i0.hdslb.com/bfs/face/2e699d1d14c0d812800c8d503b7f769ad9a2b3e7.jpg",
            "uname": "五十五层皇堡",
            "score": "104",
            "rank": 5,
            "guard_level": 0
          },
          {
            "uid": 1613420120,
            "face": "http://i0.hdslb.com/bfs/face/member/noface.jpg",
            "uname": "xieoevtstx",
            "score": "99",
            "rank": 6,
            "guard_level": 0
          },
          {
            "uid": 10265491,
            "face": "http://i1.hdslb.com/bfs/face/fee62e15c3b79f0a645eb2c6d91dce1c45e27e04.jpg",
            "uname": "我还活着~",
            "score": "59",
            "rank": 7,
            "guard_level": 0
          }
        ]
      },
      "dm_emoticon_info": {
        "is_open_emoticon": 1,
        "is_shield_emoticon": 0
      },
      "dm_tag_info": {
        "dm_tag": 0,
        "platform": [],
        "extra": "",
        "dm_chronos_extra": "",
        "dm_mode": [],
        "dm_setting_switch": 0,
        "material_conf": null
      },
      "topic_info": {
        "topic_id": 0,
        "topic_name": ""
      },
      "game_info": {
        "game_status": 0
      },
      "watched_show": {
        "switch": true,
        "num": 1206,
        "text_small": "1206",
        "text_large": "1206人看过",
        "icon": "",
        "icon_location": 0,
        "icon_web": ""
      },
      "topic_room_info": {
        "interactive_h5_url": "",
        "watermark": 1
      },
      "show_reserve_status": false,
      "video_connection_info": null,
      "player_throttle_info": {
        "status": 1,
        "normal_sleep_time": 1800,
        "fullscreen_sleep_time": 3600,
        "tab_sleep_time": 1800,
        "prompt_time": 30
      },
      "guard_info": {
        "count": 0,
        "anchor_guard_achieve_level": 0
      },
      "hot_rank_info": null
    }
    ```

!!! example "示例 1"
    ```jinja
    {{ json.room_info.live_start_time }}
    ```
    ```txt
    1642502066
    ```
!!! example "示例 2"
    ```jinja
    {{ json.room_info.live_start_time | time_zone: 'Asia/Shanghai' | format_date: "yyyyMMdd-HHmmss" }}
    ```
    ```txt
    20220118-183426
    ```
!!! example "示例 3"
    ```jinja
    {{ json.room_info.uid }}
    ```
    ```txt
    11153765
    ```

## 语法说明

基础的语法请参考 [Liquid 原版文档](https://shopify.github.io/liquid/basics/introduction/){target=_blank} 或 [第三方翻译的中文镜像](https://liquid.bootcss.com/basics/introduction/){target=_blank}，这里就不再复制粘贴过来一份了。

在原版功能的基础上，录播姬的模板引擎多了一些功能：

### 生成随机数

!!! example "示例模板"
    ```jinja
    {% random 3 %}
    ```

!!! example "示例输出"
    ```txt
    941
    ```

传入的参数是一个 1 到 9 之间的数字，是生成的随机数的位数。

### 过滤器 Filters

#### format_qn

把画质 ID 转换成画质名字

!!! example "示例"
    ```jinja
    {{ qn | format_qn }}
    ```

    ```txt
    原画
    ```

#### format_date

用 .NET 的 [日期格式字符串](https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/custom-date-and-time-format-strings){target=_blank} 格式化日期。

!!! example "示例"
    ```jinja
    {{ "now" | format_date: "yyyyMMdd-HHmmss-fff" }}
    ```

    ```txt
    20220505-225933-067
    ```

??? quote "日期格式化字符表"
    本段内容是从[微软官方文档](https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/custom-date-and-time-format-strings){target=_blank}复制的, licensed under CC-BY.

    | 格式说明符 | 说明 | 示例 |
    | --- | --- | --- |
    | "d" | 一个月中的某一天（1 到 31）。| 2009-06-01T13:45:30 -> 1  <br>  <br>2009-06-15T13:45:30 -> 15 |
    | “dd” | 一个月中的某一天（01 到 31）。| 2009-06-01T13:45:30 -> 01  <br>  <br>2009-06-15T13:45:30 -> 15 |
    | “ddd” | 一周中某天的缩写名称。| 2009-06-15T13:45:30 -> Mon (en-US)  <br>  <br>2009-06-15T13:45:30 -> Пн (ru-RU)  <br>  <br>2009-06-15T13:45:30 -> lun. (fr-FR) |
    | “dddd” | 一周中某天的完整名称。| 2009-06-15T13:45:30 -> Monday (en-US)  <br>  <br>2009-06-15T13:45:30 -> понедельник (ru-RU)  <br>  <br>2009-06-15T13:45:30 -> lundi (fr-FR) |
    | “f” | 日期和时间值的十分之几秒。| 2009-06-15T13:45:30.6170000 -> 6  <br>  <br>2009-06-15T13:45:30.05 -> 0 |
    | “ff” | 日期和时间值的百分之几秒。| 2009-06-15T13:45:30.6170000 -> 61  <br>  <br>2009-06-15T13:45:30.0050000 -> 00 |
    | “fff” | 日期和时间值的千分之几秒。| 6/15/2009 13:45:30.617 -> 617  <br>  <br>6/15/2009 13:45:30.0005 -> 000 |
    | “ffff” | 日期和时间值的万分之几秒。| 2009-06-15T13:45:30.6175000 -> 6175  <br>  <br>2009-06-15T13:45:30.0000500 -> 0000 |
    | “fffff” | 日期和时间值的十万分之几秒。| 2009-06-15T13:45:30.6175400 -> 61754  <br>  <br>6/15/2009 13:45:30.000005 -> 00000 |
    | “ffffff” | 日期和时间值的百万分之几秒。| 2009-06-15T13:45:30.6175420 -> 617542  <br>  <br>2009-06-15T13:45:30.0000005 -> 000000 |
    | “fffffff” | 日期和时间值的千万分之几秒。| 2009-06-15T13:45:30.6175425 -> 6175425  <br>  <br>2009-06-15T13:45:30.0001150 -> 0001150 |
    | “F” | 如果非零，则为日期和时间值的十分之几秒。| 2009-06-15T13:45:30.6170000 -> 6  <br>  <br>2009-06-15T13:45:30.0500000 ->（无输出） |
    | “FF” | 如果非零，则为日期和时间值的百分之几秒。| 2009-06-15T13:45:30.6170000 -> 61  <br>  <br>2009-06-15T13:45:30.0050000 ->（无输出） |
    | “FFF” | 如果非零，则为日期和时间值的千分之几秒。| 2009-06-15T13:45:30.6170000 -> 617  <br>  <br>2009-06-15T13:45:30.0005000 ->（无输出） |
    | “FFFF” | 如果非零，则为日期和时间值的万分之几秒。| 2009-06-15T13:45:30.5275000 -> 5275  <br>  <br>2009-06-15T13:45:30.0000500 ->（无输出） |
    | “FFFFF” | 如果非零，则为日期和时间值的十万分之几秒。| 2009-06-15T13:45:30.6175400 -> 61754  <br>  <br>2009-06-15T13:45:30.0000050 ->（无输出） |
    | “FFFFFF” | 如果非零，则为日期和时间值的百万分之几秒。| 2009-06-15T13:45:30.6175420 -> 617542  <br>  <br>2009-06-15T13:45:30.0000005 ->（无输出） |
    | “FFFFFFF” | 如果非零，则为日期和时间值的千万分之几秒。| 2009-06-15T13:45:30.6175425 -> 6175425  <br>  <br>2009-06-15T13:45:30.0001150 -> 000115 |
    | “g”、“gg” | 时期或纪元。| 2009-06-15T13:45:30.6170000 -> A.D. |
    | “h” | 采用 12 小时制的小时（从 1 到 12）。| 2009-06-15T01:45:30 -> 1  <br>  <br>2009-06-15T13:45:30 -> 1 |
    | “hh” | 采用 12 小时制的小时（从 01 到 12）。| 2009-06-15T01:45:30 -> 01  <br>  <br>2009-06-15T13:45:30 -> 01 |
    | “H” | 采用 24 小时制的小时（从 0 到 23）。| 2009-06-15T01:45:30 -> 1  <br>  <br>2009-06-15T13:45:30 -> 13 |
    | “HH” | 采用 24 小时制的小时（从 00 到 23）。| 2009-06-15T01:45:30 -> 01  <br>  <br>2009-06-15T13:45:30 -> 13 |
    | “K” | 时区信息。| 2009-06-15T01:45:30-07:00 --> -07:00  <br>  <br>2009-06-15T08:45:30+00:00 --> +00:00 |
    | “m” | 分钟（0 到 59）。| 2009-06-15T01:09:30 -> 9  <br>  <br>2009-06-15T13:29:30 -> 29 |
    | “mm” | 分钟（00 到 59）。| 2009-06-15T01:09:30 -> 09  <br>  <br>2009-06-15T01:45:30 -> 45 |
    | “M” | 月份（1 到 12）。| 2009-06-15T13:45:30 -> 6 |
    | “MM” | 月份（1 到 12）。| 2009-06-15T13:45:30 -> 06 |
    | “MMM” | 月份的缩写名称。| 2009-06-15T13:45:30 -> Jun (en-US)  <br>  <br>2009-06-15T13:45:30 -> juin (fr-FR)  <br>  <br>2009-06-15T13:45:30 -> Jun (zu-ZA) |
    | “MMMM” | 月份的完整名称。| 2009-06-15T13:45:30 -> June (en-US)  <br>  <br>2009-06-15T13:45:30 -> juni (da-DK)  <br>  <br>2009-06-15T13:45:30 -> uJuni (zu-ZA) |
    | “s” | 秒（0 到 59）。| 2009-06-15T13:45:09 -> 9 |
    | “ss” | 秒（00 到 59）。| 2009-06-15T13:45:09 -> 09 |
    | “t” | AM/PM 指示符的第一个字符。| 2009-06-15T13:45:30 -> P (en-US)  <br>  <br>2009-06-15T13:45:30 -> 午 (ja-JP)  <br>  <br>2009-06-15T13:45:30 -> (fr-FR) |
    | “tt” | AM/PM 指示符。| 2009-06-15T13:45:30 -> PM (en-US)  <br>  <br>2009-06-15T13:45:30 -> 午後 (ja-JP)  <br>  <br>2009-06-15T13:45:30 -> (fr-FR) |
    | “y” | 年份（0 到 99）。| 0001-01-01T00:00:00 -> 1  <br>  <br>0900-01-01T00:00:00 -> 0  <br>  <br>1900-01-01T00:00:00 -> 0  <br>  <br>2009-06-15T13:45:30 -> 9  <br>  <br>2019-06-15T13:45:30 -> 19 |
    | “yy” | 年份（00 到 99）。| 0001-01-01T00:00:00 -> 01  <br>  <br>0900-01-01T00:00:00 -> 00  <br>  <br>1900-01-01T00:00:00 -> 00  <br>  <br>2019-06-15T13:45:30 -> 19 |
    | “yyy” | 年份（最少三位数字）。| 0001-01-01T00:00:00 -> 001  <br>  <br>0900-01-01T00:00:00 -> 900  <br>  <br>1900-01-01T00:00:00 -> 1900  <br>  <br>2009-06-15T13:45:30 -> 2009 |
    | “yyyy” | 由四位数字表示的年份。| 0001-01-01T00:00:00 -> 0001  <br>  <br>0900-01-01T00:00:00 -> 0900  <br>  <br>1900-01-01T00:00:00 -> 1900  <br>  <br>2009-06-15T13:45:30 -> 2009 |
    | “yyyyy” | 由五位数字表示的年份。| 0001-01-01T00:00:00 -> 00001  <br>  <br>2009-06-15T13:45:30 -> 02009 |
    | “z” | 相对于 UTC 的小时偏移量，无前导零。| 2009-06-15T13:45:30-07:00 -> -7 |
    | “zz” | 相对于 UTC 的小时偏移量，带有表示一位数值的前导零。| 2009-06-15T13:45:30-07:00 -> -07 |
    | “zzz” | 相对于 UTC 的小时和分钟偏移量。| 2009-06-15T13:45:30-07:00 -> -07:00 |
    | ":" | 时间分隔符。| 2009-06-15T13:45:30 -> : (en-US)  <br>  <br>2009-06-15T13:45:30 -> . (it-IT)  <br>  <br>2009-06-15T13:45:30 -> : (ja-JP) |
    | "/" | 日期分隔符。  <br>  <br>详细信息：[“/”自定义格式说明符](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#dateSeparator)。 | 2009-06-15T13:45:30 -> / (en-US)  <br>  <br>2009-06-15T13:45:30 -> - (ar-DZ)  <br>  <br>2009-06-15T13:45:30 -> . (tr-TR) |
    | "string"| 2009-06-15T13:45:30 ("arr:" h:m t) -> arr: 1:45 P  <br>  <br>2009-06-15T13:45:30 ('arr:' h:m t) -> arr: 1:45 P |
    | % | 将下面的字符定义为自定义格式说明符。  <br>  <br>有关详细信息，请参阅[使用单个自定义格式说明符](chrome-extension://pcmpcfapbekmbjjkdalcgopdkipoggdi/_generated_background_page.html#UsingSingleSpecifiers)。 | 2009-06-15T13:45:30 (%h) -> 1 |
    | \\ | 转义字符。| 2009-06-15T13:45:30 (h \\h) -> 1 h |
    | 任何其他字符 | 字符将复制到未更改的结果字符串。| 2009-06-15T01:45:30 (arr hh:mm t) -> arr 01:45 A |

#### format_number

用 .NET 的方法格式化数字。

文档：[标准数字格式字符串](https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/standard-numeric-format-strings){target=_blank}、[自定义数字格式字符串](https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/custom-numeric-format-strings){target=_blank}。

!!! example "示例模板"
    ```jinja
    {{ 1234.567 | format_number: "00000.00" }}
    ```

!!! example "示例输出"
    ```txt
    01234.57
    ```

#### format_string

用 .NET 的方法格式化文本。

[微软文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.string.format#Starting){target=_blank}

!!! example "示例模板"
    ```jinja
    {{ "hello {0} {1:0000}" | format_string: "world", 123 }}
    ```

!!! example "示例输出"
    ```txt
    hello world 0123
    ```
