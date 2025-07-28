
@echo off

REM 🟢 تحديد المجلد الصحيح
set "project=C:\Users\HSN\Downloads\progress"

REM 🟢 الدخول إلى المجلد
pushd "%project%" || (
  echo ❌ المجلد غير موجود! تأكد من الاسم: progress
  pause
  exit /b
)

REM ✅ تشغيل الخادم المحلي
python -m http.server

pause
