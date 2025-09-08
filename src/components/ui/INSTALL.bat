@echo off

echo Cartella dello script: %~dp0
echo.
echo Cartella corrente: %CD%

setlocal

SET OPTIONS=--overwrite
 
CALL npx shadcn@latest add sonner %OPTIONS%
CALL npx shadcn@latest add alert %OPTIONS%
CALL npx shadcn@latest add card %OPTIONS%
CALL npx shadcn@latest add button %OPTIONS%
CALL npx shadcn@latest add input %OPTIONS%
CALL npx shadcn@latest add label %OPTIONS%
CALL npx shadcn@latest add select %OPTIONS%
CALL npx shadcn@latest add separator %OPTIONS%
CALL npx shadcn@latest add sheet %OPTIONS%
CALL npx shadcn@latest add sidebar %OPTIONS%
CALL npx shadcn@latest add table %OPTIONS%
CALL npx shadcn@latest add skeleton %OPTIONS%
CALL npx shadcn@latest add dialog %OPTIONS%

echo Operazione completata.

endlocal
pause
