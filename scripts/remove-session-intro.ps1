# PowerShell script to remove session_introduction from all problem seed files

$files = @(
    "seed-problem-22.ts",
    "seed-problem-23.ts",
    "seed-problem-24.ts",
    "seed-problem-25.ts",
    "seed-problem-26.ts",
    "seed-problem-27.ts",
    "seed-problem-28.ts",
    "seed-problem-29.ts",
    "seed-problem-30.ts",
    "seed-problem-31.ts",
    "seed-problem-32.ts",
    "seed-problem-33.ts",
    "seed-problem-34.ts",
    "seed-problem-35.ts",
    "seed-problem-36.ts",
    "seed-problem-37.ts",
    "seed-problem-38.ts",
    "seed-problem-39.ts",
    "seed-problem-40.ts",
    "seed-problem-41.ts",
    "seed-problem-42.ts",
    "seed-problem-43.ts",
    "seed-problem-44.ts",
    "seed-problem-45.ts",
    "seed-problem-46.ts",
    "seed-problem-47.ts"
)

foreach ($file in $files) {
    $filePath = "d:\LOF\PROJECTS\LOF\Code_Runner-main\scripts\$file"

    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw

        # Remove session_introduction field and its content
        # Pattern matches: session_introduction: `...`,
        $pattern = "session_introduction: ``[^``]*``,\s*"
        $newContent = $content -replace $pattern, ""

        Set-Content $filePath $newContent
        Write-Host "✓ Removed session_introduction from $file"
    }
}

Write-Host "`n✅ Completed removing session_introduction from all files"
