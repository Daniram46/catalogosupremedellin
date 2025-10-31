$content = Get-Content "index.html" -Raw
$matches = [regex]::Matches($content, '<img class="carousel-image[^"]*" src="FOTOS_CATALOGO/images/([^"]*)" alt="([^"]*)"')
foreach ($match in $matches) {
    $filename = $match.Groups[1].Value
    $alt = $match.Groups[2].Value
    $filenameForMove = $filename -replace '%20', ' '
    if ($filename -eq "IMG_1365.jpeg") {
        $subfolder = "ZAPATOS"
    } elseif ($alt -like "Mini Bag*") {
        $subfolder = "MINI_BAG_SUPREME"
    } elseif ($alt -like "Hoodie Hombre*") {
        $subfolder = "HOODIE_HOMBRE"
    } elseif ($alt -like "Cap Supreme*") {
        $subfolder = "CAP_SUPREME_SPLATTER"
    } elseif ($alt -like "Buzo Unisex*") {
        $subfolder = "BUZO_UNISEX"
    } else {
        $subfolder = "OTHER"
    }
    $source = "FOTOS_CATALOGO/images/$filenameForMove"
    $dest = "FOTOS_CATALOGO/FOTOS_CATALOGO/$subfolder/$filenameForMove"
    if (Test-Path $source) {
        New-Item -ItemType Directory -Force -Path "FOTOS_CATALOGO/FOTOS_CATALOGO/$subfolder"
        Move-Item $source $dest
    }
    $oldsrc = 'src="FOTOS_CATALOGO/images/' + $filename + '"'
    $newsrc = 'src="file:///C:/Users/usuario/Documents/CATALOGO SUPREME/FOTOS_CATALOGO/FOTOS_CATALOGO/' + $subfolder + '/' + $filename + '"'
    $content = $content -replace [regex]::Escape($oldsrc), $newsrc
}
Set-Content "index.html" $content
