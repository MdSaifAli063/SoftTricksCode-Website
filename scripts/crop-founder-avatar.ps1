Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot '..\public\founder-saif.png'
$outPath = Join-Path $PSScriptRoot '..\public\founder-saif-avatar.png'

$img = [System.Drawing.Image]::FromFile((Resolve-Path $srcPath))
$w = $img.Width
$h = $img.Height

# Tight square crop with face at geometric center (below large headroom in source)
$cropSize = [int]($w * 0.36)
$faceCenterX = [int]($w * 0.44)
$faceCenterY = [int]($h * 0.442)
$cropX = [int]($faceCenterX - ($cropSize / 2))
$cropY = [int]($faceCenterY - ($cropSize / 2))
if ($cropY -lt 0) { $cropY = 0 }
if ($cropY + $cropSize -gt $h) { $cropY = $h - $cropSize }

$dest = New-Object System.Drawing.Bitmap $cropSize, $cropSize
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage(
  $img,
  (New-Object System.Drawing.Rectangle 0, 0, $cropSize, $cropSize),
  (New-Object System.Drawing.Rectangle $cropX, $cropY, $cropSize, $cropSize),
  [System.Drawing.GraphicsUnit]::Pixel
)

$dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$dest.Dispose()
$img.Dispose()

Write-Host "Created avatar ${cropSize}x${cropSize} from ${w}x${h} at offset ($cropX, $cropY)"
