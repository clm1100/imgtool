# PowerShell 终极安装脚本 - 逐个安装依赖

Write-Host "===== 开始逐个安装依赖 =====" -ForegroundColor Green

# 设置npm配置
npm config set registry https://registry.npmmirror.com
npm config set fetch-timeout 120000

# 清理npm缓存
npm cache clean --force

# 逐个安装依赖
Write-Host "[1/5] 安装 express..." -ForegroundColor Yellow
npm install express@4.18.2 --no-save --registry https://registry.npmmirror.com --no-fund --no-audit --force

Write-Host "[2/5] 安装 images..." -ForegroundColor Yellow
npm install images@3.2.3 --no-save --registry https://registry.npmmirror.com --no-fund --no-audit --force

Write-Host "[3/5] 安装 sharp..." -ForegroundColor Yellow
npm install sharp@0.32.6 --no-save --registry https://registry.npmmirror.com --no-fund --no-audit --force

Write-Host "[4/5] 安装 svg2png..." -ForegroundColor Yellow
npm install svg2png@4.1.1 --no-save --registry https://registry.npmmirror.com --no-fund --no-audit --force

Write-Host "[5/5] 安装 text-to-svg..." -ForegroundColor Yellow
npm install text-to-svg@3.1.5 --no-save --registry https://registry.npmmirror.com --no-fund --no-audit --force

Write-Host "===== 完成！ =====" -ForegroundColor Green
npm list --depth=0
