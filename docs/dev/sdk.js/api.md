# 纯 API 封装

如果你需要一个工具来操作录播姬，[面向对象的SDK](./sdk.md)可能会更易用一些

## 安装

```shell
yarn add @bililive/rec-sdk@v2-alpha axios
npm i @bililive/rec-sdk@v2-alpha axios
```

## 使用

```ts
import axios from "axios"
import { Api } from "@bililive/rec-sdk"

const api = new ApiInstance(axios.create({ ... }));
```

### API 对应关系

具体参数可以追踪 ts 类型定义

| API Name | API Path | 说明 |
| -------- | -------- | ---- |
{% for api in js_sdk_maps.api_map -%}
|{{ api.name }}|{{ api.path }}|{{ api.summary }}|
{% endfor %}
