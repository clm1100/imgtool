# 标签合格证处理程序

一个用于批量生成产品标签和合格证的自动化工具。

## 📋 项目信息

- **项目名称**：标签合格证处理程序
- **开发语言**：Node.js (JavaScript)
- **Web框架**：Express
- **当前版本**：1.0.0

## 🎯 核心功能

这是一个**产品标签/合格证自动生成系统**，用于批量生成包含产品信息的标签图片。

### 功能特点

- ✅ 支持多种标签尺寸规格（11种规格）
- ✅ 自动排版和水印功能
- ✅ 文本渲染和位置坐标精确控制
- ✅ 批量生成标签（如30x41规格可生成5×4=20个标签）
- ✅ 支持自定义字体和文本样式

## 📁 项目结构

```
imgtool/
├── index.js                    # Express服务器入口
├── utils.js                    # 模块导出，汇总所有处理函数
├── creatImg.js                 # 文本转SVG再转PNG的核心工具
├── deal30_41.js                # 30x41规格标签处理
├── deal54_33.js                # 54x33规格标签处理
├── deal54_33_jinling.js        # 54x33晋陵规格
├── deal68_42.js                # 68x42规格标签处理
├── deal100_30.js               # 100x30规格标签处理
├── dealhege.js                 # 核心规格标签处理
├── dealhege2.js                # 通用规格标签处理
├── dealjinling.js              # 晋陵规格标签处理
├── dealjnmhg.js                # 金牌规格标签处理
├── dealjnmbq.js                # 金牌系列标签处理
├── newTag.js                   # 新标签规格处理
├── package.json                # 项目依赖配置
├── assets/                     # 前端页面资源
│   ├── index.html
│   ├── bg2/
│   └── css/
│       └── style.css
├── bg/                         # 预览用背景样例
├── bg2/                        # 备用背景文件
├── bg3/                        # 标签背景模板
├── font/                       # 字体文件
│   └── simsun.ttc
└── utils/                      # 工具函数集合
    ├── getLength.js
    ├── splice2name.js
    └── splice2nameV2.js
```

## 🔧 技术依赖

| 依赖库 | 用途 | 版本 |
|-------|------|------|
| `express` | Web框架 | ^4.17.1 |
| `images` | 图片拼接和合成 | ^3.2.3 |
| `sharp` | 图片转码处理 | ^0.27.0 |
| `text-to-svg` | 文本转SVG | ^3.1.5 |
| `svg2png` | SVG转PNG | ^4.1.1 |

## 🌐 API 接口

### 水印生成接口

**端点**：`GET /water`

**请求参数**：

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `size` | string | ✓ | 标签规格（见下表） |
| `productname` | string | ✓ | 产品名称 |
| `producttype` | string | ✓ | 产品型号 |
| `productdate` | string | ✓ | 生产日期 |
| `productpeople` | string | ✗ | 生产人员 |

**支持的规格** (11种)：

- `deal30x41` - 30×41规格
- `deal54x33` - 54×33规格
- `deal54_33_jinling` - 54×33晋陵版本
- `deal68x42` - 68×42规格
- `deal100x30` - 100×30规格
- `dealhege` - 核心规格
- `dealhege2` - 通用规格
- `dealjinling` - 晋陵规格
- `dealjnmhg` - 金牌系列
- `dealjnmbq` - 金牌特殊版本
- `newTag` - 新标签规格

**请求示例**：

```
http://localhost:3001/water?size=deal30x41&productname=彼岸准时钟&producttype=HYCX-YU-110&productdate=2020-12-12&productpeople=王小明
```

**响应**：返回重定向到生成的 `/output.jpg` 图片

## ⚡ 工作流程

1. **前端操作**：用户选择标签规格 + 输入产品信息
2. **后端处理**：调用对应的 `deal*.js` 处理函数
3. **文本生成**：使用字体库生成文本PNG图片
4. **图片合成**：将文本PNG拼接到背景模板上
5. **输出返回**：生成 `output.jpg` 并返回给用户

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或使用 yarn
yarn install
```

### 启动服务

```bash
npm start
```

启动后访问：`http://localhost:3001`

默认监听端口：**3001**

## 📝 使用说明

### 添加新的标签规格

按照以下步骤添加新的标签规格：

#### 步骤1：准备背景图片

- 将背景图片放到 `bg3/` 文件夹
- 文件命名格式：`b{规格}.png`（如 `b30x41.png`）

#### 步骤2：准备预览图

- 将背景预览示例放到 `bg/` 文件夹（用于前端radio切换展示）

#### 步骤3：创建处理文件

在项目根目录创建对应的处理文件（如 `deal{规格}.js`）：

```javascript
var images = require("images");

async function dealNewTag({ productname = "默认产品名", producttype = "默认型号", productdate = "2020-12-12" }={}, res) {
    const src = './bg3/bnew_spec.png';  // 背景图路径
    const output = './assets/output.jpg';
    const out = images(src);
    
    // 定义文本位置
    const nameLeft = 100;
    const nameTop = 100;
    // ... 其他位置定义
    
    // 生成文本PNG
    const createImg = require('./creatImg');
    await createImg({ name: productname, outputname: 'name', fontSize: 24 });
    
    // 合成图片
    out.draw(images("./name.png"), nameLeft, nameTop);
    
    out.save(output, { quality: 100 });
    res && res.redirect("/output.jpg");
}

module.exports = dealNewTag;
```

#### 步骤4：前端页面修改

在 `assets/index.html` 中：

1. 新增 radio 选项，修改 `value` 值为处理函数名
2. 在页面 JS 图片数组中添加背景演示示例路径

#### 步骤5：后端模块注册

在 `utils.js` 中添加导入和导出：

```javascript
const dealNewTag = require('./dealNewTag');

module.exports = {
    // ... 现有导出
    dealNewTag
}
```

## 🔍 代码示例

### 基础处理函数结构

```javascript
var images = require("images");

async function dealTemplate({ productname = "默认", producttype = "默认", productdate = "2020-12-12" }={}, res) {
    const src = './bg3/btemplate.png';      // 背景源文件
    const output = './assets/output.jpg';   // 输出文件
    const out = images(src);
    
    // 定义布局坐标
    const Left = 470;
    const Top = 230;
    const offsetLeft = 385;   // 水平间距
    const offsetTop = 514;    // 竖直间距
    
    // 生成文本图片
    const createImg = require('./creatImg');
    await Promise.all([
        createImg({ name: productname, outputname: 'name', fontSize: 24 }),
        createImg({ name: producttype, outputname: 'type', fontSize: 28 }),
        createImg({ name: productdate, outputname: 'date', fontSize: 28 })
    ]);
    
    // 批量绘制（5行4列=20个标签）
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 4; i++) {
            out.draw(images("./name.png"), Left + offsetLeft * i, Top + j * offsetTop);
            out.draw(images("./type.png"), Left + offsetLeft * i, Top + 70 + j * offsetTop);
            out.draw(images("./date.png"), Left + offsetLeft * i, Top + 150 + j * offsetTop);
        }
    }
    
    out.save(output, { quality: 100 });
    res && res.redirect("/output.jpg");
}

module.exports = dealTemplate;
```

## 💡 改进建议

### 当前存在的问题

1. **代码重复**
   - 11个 `deal*.js` 文件代码相似度高
   - 建议用配置表+工厂模式优化

2. **错误处理**
   - 缺少参数验证和异常捕获
   - 建议添加完整的错误处理机制

3. **性能优化**
   - 每次请求都生成PNG，可考虑缓存机制
   - 建议实现生成结果缓存

4. **文档完善**
   - 缺少详细接口文档
   - 建议使用 Swagger/OpenAPI 工具

5. **测试覆盖**
   - 没有单元测试
   - 建议添加测试套件

### 优化方向

- [ ] 使用工厂模式统一处理不同规格
- [ ] 添加请求参数验证中间件
- [ ] 实现图片生成结果缓存
- [ ] 添加错误处理和日志记录
- [ ] 编写单元测试和集成测试
- [ ] 使用数据库存储规格配置
- [ ] 添加 API 文档（Swagger）
- [ ] 实现上传自定义背景功能

## 📄 许可证

ISC
