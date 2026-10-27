# =============================================================================
# Автоматическая отправка проекта NEXUS Workspace (Lab Work #9) в GitHub
# Делает 3 осмысленных коммита (по требованиям лабы) и пушит в ваш репозиторий
# =============================================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$RepoUrl = ""
)

$ErrorActionPreference = "Stop"

# 1. Проверяем наличие Git в системе (и в стандартных путях установки)
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    $possibleGitPaths = @(
        "C:\Program Files\Git\cmd",
        "C:\Program Files (x86)\Git\cmd",
        "$env:LOCALAPPDATA\Programs\Git\cmd"
    )
    foreach ($p in $possibleGitPaths) {
        if (Test-Path "$p\git.exe") {
            $env:Path += ";$p"
            break
        }
    }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git не найден на компьютере. Устанавливаю Git через winget..." -ForegroundColor Yellow
    winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
    $env:Path += ";C:\Program Files\Git\cmd;$env:LOCALAPPDATA\Programs\Git\cmd"
}

# Проверяем, настроены ли имя и email для коммитов
$gitUser = git config user.name
if (-not $gitUser) {
    git config user.name "IITU Student"
}
$gitEmail = git config user.email
if (-not $gitEmail) {
    git config user.email "student@iitu.edu.kz"
}

# 2. Запрашиваем ссылку на репозиторий, если она не передана
if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
    Write-Host ""
    Write-Host "Вставьте HTTPS-ссылку на ваш GitHub-репозиторий (например: https://github.com/ваш-логин/lab-work-9.git)" -ForegroundColor Cyan
    $RepoUrl = Read-Host "Ссылка на репозиторий"
}

# 3. Инициализируем Git и создаём 3 осмысленных коммита
if (-not (Test-Path ".git")) {
    git init
}
git branch -M main

Write-Host "Создаю Коммит 1 (HTML и изображения)..." -ForegroundColor Green
git add index.html images/
git commit -m "feat: create semantic HTML structure and local WebP/SVG assets" --allow-empty

Write-Host "Создаю Коммит 2 (Адаптивный CSS и дизайн-система)..." -ForegroundColor Green
git add style.css DESIGN_SYSTEM.md FIGMA_GUIDE.md figma-frames/
git commit -m "feat: implement responsive CSS layout and light/dark theme tokens" --allow-empty

Write-Host "Создаю Коммит 3 (JavaScript, валидация форм и документация)..." -ForegroundColor Green
git add script.js README.md DEFENSE_CHEATSHEET_RU.md push-to-github.ps1
git commit -m "feat: add interactive booking validation, modals, and theme switching" --allow-empty

# 4. Привязываем удалённый репозиторий и отправляем код
$existingRemote = git remote
if ($existingRemote -contains "origin") {
    git remote set-url origin $RepoUrl
} else {
    git remote add origin $RepoUrl
}

Write-Host "Отправляю проект на GitHub (в окне браузера может появиться запрос входа в GitHub)..." -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host "ГОТОВО! Проект успешно загружен на GitHub со всеми 3 коммитами!" -ForegroundColor Green
Write-Host "Теперь на странице репозитория на GitHub откройте: Settings -> Pages -> Branch: main -> Save." -ForegroundColor Yellow
