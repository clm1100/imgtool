@echo off
REM 终极修复脚本 - 用于解决npm install卡住问题

echo ====== NPM 终极修复 ======

REM 1. 清理npm缓存
echo [1/4] 正在清理npm缓存...
call npm cache clean --force

REM 2. 清理全局npm缓存
echo [2/4] 正在清理全局缓存...
npm config set registry https://registry.npmmirror.com
npm config set sharp_binary_host_mirror https://npmmirror.com

REM 3. 删除旧的lockfile强制重新生成
echo [3/4] 正在重新生成package-lock.json...
if exist package-lock.json (
    del package-lock.json
)

REM 4. 使用最激进的参数安装
echo [4/4] 正在安装依赖（这可能需要5-10分钟）...
call npm install --force --prefer-offline --no-optional --no-audit --no-fund --legacy-peer-deps --network-timeout=120000 --fetch-timeout=120000 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000

echo.
echo ====== 修复完成 ======
echo 如果仍然失败，请检查网络连接或尝试以下命令：
echo npm install --save sharp@0.32.0
echo.
pause
