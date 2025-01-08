@echo off
chcp 65001

setlocal enabledelayedexpansion
set ipAddress=

:: 获取第 24 行 IP 地址
for /f "skip=23 tokens=*" %%A in ('ipconfig') do (
    set ipAddress=%%A
    goto :found
)

:found
echo 第 24 行：!ipAddress!
adb connect !ipAddress!:6666

"E:\study\bash\adb\scrcpy-win64-v3.1\scrcpy.exe" --pause-on-exit=if-error --audio-source=playback --audio-dup --keyboard=uhid

pause
