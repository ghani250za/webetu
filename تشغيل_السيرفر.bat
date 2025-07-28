@echo off
title 🚀 تشغيل بوابة الطالب PROGRES
echo.
echo ✅ جاري تشغيل الخادم الخلفي (Flask)...
start cmd /k "python app.py"

timeout /t 2 >nul

echo ✅ جاري تشغيل الخادم الأمامي (HTML) على http://localhost:8000 ...
start cmd /k "python -m http.server 8000"

echo.
echo 📂 افتح المتصفح على:
echo     http://localhost:8000/login.html
echo.
pause
