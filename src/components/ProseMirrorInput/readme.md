# 按照官方文档和 privoce-editor 代码示例集成，目前遗留问题：

- 有没有便捷方式拿到用户输入的文本（保留换行符），目前想到的通过 json 对象去组装，有些麻烦，prosemirror 有没有现成的 API 或插件？
- 回车发送，通过 keymap 能正确监听到，还需要一个 soft break 效果，即：shift + enter，是回车
- mention 集成进来了（完全照搬 privoce-editor）里的源码，如何将数据源替换为用户列表（需不需要动字段），而且得考虑数据量大的情况（目前最多有 1k 条数据），还有 popup 位置的优化，还有交互？
