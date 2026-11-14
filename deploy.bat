@echo off
REM ============================================================
REM  ডুয়েট ভর্তি প্রস্তুতি - সাইট ডিপ্লয় স্ক্রিপ্ট
REM  ডাবল-ক্লিক করলেই: commit -> GitHub push -> Firebase deploy
REM ============================================================

echo.
echo ============================================
echo   ডুয়েট ভর্তি প্রস্তুতি - ডিপ্লয় শুরু
echo ============================================
echo.

REM --- ১. পরিবর্তন আছে কিনা দেখা ---
echo [১/৪] পরিবর্তন দেখা হচ্ছে...
git status --short
echo.

REM --- ২. commit ---
echo [২/৪] Commit করা হচ্ছে...
git add -A
git commit -m "Update: %date% %time%"
if errorlevel 1 (
    echo.
    echo [!] কোনো পরিবর্তন ছিল না, শুধু push ও deploy হবে।
    echo.
) else (
    echo [OK] Commit সফল।
)
echo.

REM --- ৩. GitHub push ---
echo [৩/৪] GitHub-এ পাঠানো হচ্ছে...
git push origin main
if errorlevel 1 (
    echo.
    echo [X] PUSH ব্যর্থ! GitHub-এ পৌঁছায়নি।
    echo     ইন্টারনেট সংযোগ দেখুন।
    pause
    exit /b 1
)
echo [OK] GitHub-এ পৌঁছেছে।
echo.

REM --- ৪. Firebase deploy ---
echo [৪/৪] Firebase Hosting-এ ডিপ্লয় হচ্ছে...
echo       (৬ MB ফাইল, ১-২ মিনিট লাগতে পারে)
echo.
firebase.cmd deploy --only hosting
if errorlevel 1 (
    echo.
    echo [X] DEPLOY ব্যর্থ! লগইন আছে কিনা দেখুন:
    echo     firebase.cmd login
    pause
    exit /b 1
)

echo.
echo ============================================
echo   [OK] ডিপ্লয় সফল!
echo   সাইট: https://diploma-to-duet.web.app
echo ============================================
echo.
pause
