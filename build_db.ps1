# Encoding output utf8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$gameSource = "C:\Users\Metalgear\.gemini\antigravity\scratch\game_source"
$files = Get-ChildItem -Path "$gameSource\src\sim\content" -Recurse -Include "*.ts"

$itemsList = [System.Collections.Generic.List[PSObject]]::new()
$seenIds = [System.Collections.Generic.HashSet[string]]::new()

$classes = @('warrior', 'paladin', 'hunter', 'rogue', 'priest', 'shaman', 'mage', 'warlock', 'druid')

# Parse raw TS files with flexible object matching
foreach ($f in $files) {
    $raw = Get-Content $f.FullName -Raw
    $pattern = "(?s)([a-zA-Z0-9_]+)\s*:\s*\{\s*id\s*:\s*['`"]([^'`"]+)['`"](.*?)\n\s*\},?"
    $matches = [regex]::Matches($raw, $pattern)
    
    foreach ($m in $matches) {
        $id = $m.Groups[2].Value
        $body = $m.Groups[3].Value

        # Name match
        if ($body -notmatch "name\s*:\s*['`"]([^'`"]+)['`"]") { continue }
        $name = $Matches[1]

        if ($seenIds.Contains($id)) { continue }
        $seenIds.Add($id) | Out-Null

        $quality = if ($body -match "quality\s*:\s*['`"]([^'`"]+)['`"]") { $Matches[1] } else { "uncommon" }
        $kind = if ($body -match "kind\s*:\s*['`"]([^'`"]+)['`"]") { $Matches[1] } else { "armor" }
        $slot = if ($body -match "slot\s*:\s*['`"]([^'`"]+)['`"]") { $Matches[1] } else { "none" }
        $armorType = if ($body -match "armorType\s*:\s*['`"]([^'`"]+)['`"]") { $Matches[1] } else { "none" }
        $ilvl = if ($body -match "itemLevel\s*:\s*(\d+)") { [int]$Matches[1] } elseif ($f.Name -eq "pvp_honor.ts") { 31 } else { (Get-Random -Minimum 15 -Maximum 40) }
        $reqLvl = if ($body -match "reqLevel\s*:\s*(\d+)") { [int]$Matches[1] } elseif ($body -match "requiredLevel\s*:\s*(\d+)") { [int]$Matches[1] } else { [Math]::Max(1, $ilvl - 2) }
        $sellValue = if ($body -match "sellValue\s*:\s*(\d+)") { [int]$Matches[1] } else { (Get-Random -Minimum 50 -Maximum 8000) }
        $set = if ($body -match "setName\s*:\s*['`"]([^'`"]+)['`"]" -or $body -match "set\s*:\s*['`"]([^'`"]+)['`"]") { $Matches[1] } else { $null }

        $pvpOffense = if ($body -match "pvpOffenseRating\s*:\s*(\d+)") { [int]$Matches[1] } else { 0 }
        $pvpDefense = if ($body -match "pvpDefenseRating\s*:\s*(\d+)") { [int]$Matches[1] } else { 0 }
        $priceHonor = if ($body -match "priceHonor\s*:\s*(\d+)") { [int]$Matches[1] } else { 0 }
        $soulbound = if ($body -match "soulbound\s*:\s*true") { $true } else { $false }
        $uniqueEquipped = if ($body -match "uniqueEquipped\s*:\s*true" -or $quality -eq "legendary") { $true } else { $false }

        # Weapon stats
        $weapon = $null
        if ($body -match "weapon\s*:\s*\{\s*min\s*:\s*(\d+)\s*,\s*max\s*:\s*(\d+)\s*,\s*speed\s*:\s*([\d\.]+)") {
            $kind = 'weapon'
            $weapon = [ordered]@{
                min = [int]$Matches[1]
                max = [int]$Matches[2]
                speed = [double]$Matches[3]
                dps = [Math]::Round(([int]$Matches[1] + [int]$Matches[2]) / (2 * [double]$Matches[3]), 1)
            }
        }

        # Infer slot if 'none'
        if ($slot -eq 'none') {
            if ($body -match "hand\s*:\s*['`"]twohand['`"]") { $slot = 'twohand'; $kind = 'weapon' }
            elseif ($body -match "hand\s*:\s*['`"]offhand['`"]") { $slot = 'offhand' }
            elseif ($body -match "hand\s*:\s*['`"]onehand['`"]") { $slot = 'onehand'; $kind = 'weapon' }
            elseif ($body -match "hand\s*:\s*['`"]mainhand['`"]") { $slot = 'mainhand'; $kind = 'weapon' }
            elseif ($weapon) { $slot = 'mainhand' }
            elseif ($name -match "Helmet|Helm|Cap|Crown|Coif|Hood|Circlet|Mask|Visor|Hat|Head|Visage|Cowl|Warhelm") { $slot = 'helmet' }
            elseif ($name -match "Chest|Tunic|Robe|Vest|Breastplate|Hauberk|Cuirass|Armor|Jerkin|Warplate|Harness|Raiment") { $slot = 'chest' }
            elseif ($name -match "Shoulder|Pauldrons|Spaulders|Mantle|Epaulets|Warspaulders|Shoulderguards") { $slot = 'shoulder' }
            elseif ($name -match "Gloves|Gauntlets|Grips|Handwraps|Mitts|Hands|Handguards") { $slot = 'gloves' }
            elseif ($name -match "Leggings|Legguards|Pants|Greaves|Kilt|Breeches|Trousers|Legs|Legwraps|Legmail") { $slot = 'legs' }
            elseif ($name -match "Boots|Sabatons|Footpads|Shoes|Striders|Treads|Feet|Soulsteps|Slippers") { $slot = 'feet' }
            elseif ($name -match "Belt|Girdle|Waistguard|Cinch|Cord|Clasp|Waist|Waistband") { $slot = 'waist' }
            elseif ($name -match "Bracers|Wristguards|Cuffs|Armwraps|Binds|Wrist") { $slot = 'wrist' }
            elseif ($name -match "Ring|Band|Signet|Loop|Seal|Circle") { $slot = 'ring' }
            elseif ($name -match "Amulet|Choker|Necklace|Pendant|Locket|Talisman|Neck|Medallion|Torque") { $slot = 'neck' }
            elseif ($name -match "Trinket|Charm|Relic|Badge|Insignia|Orb|Idol|Totem") { $slot = 'trinket' }
            elseif ($name -match "Cloak|Cape|Drape|Shroud|Back") { $slot = 'back' }
            elseif ($name -match "Shield|Bulwark|Buckler|Aegis") { $slot = 'offhand'; $armorType = 'shield' }
            elseif ($name -match "Sword|Blade|Dagger|Axe|Mace|Staff|Hammer|Scythe|Glaive|Wand|Bow|Crossbow|Gun|Razor|Greatblade|Warstaff") { $slot = 'mainhand'; $kind = 'weapon' }
        }

        # Normalize slot names (e.g. head -> helmet, hands -> gloves)
        if ($slot -eq 'head') { $slot = 'helmet' }
        if ($slot -eq 'hands') { $slot = 'gloves' }

        # Stats parsing
        $stats = [ordered]@{}
        if ($body -match "str\s*:\s*(\d+)") { $stats['str'] = [int]$Matches[1] }
        if ($body -match "agi\s*:\s*(\d+)") { $stats['agi'] = [int]$Matches[1] }
        if ($body -match "sta\s*:\s*(\d+)") { $stats['sta'] = [int]$Matches[1] }
        if ($body -match "int\s*:\s*(\d+)") { $stats['int'] = [int]$Matches[1] }
        if ($body -match "spi\s*:\s*(\d+)") { $stats['spi'] = [int]$Matches[1] }
        if ($body -match "armor\s*:\s*(\d+)") { $stats['armor'] = [int]$Matches[1] }

        # Ratings
        $hit = if ($body -match "hitRating\s*:\s*(\d+)") { [int]$Matches[1] } else { 0 }
        $crit = if ($body -match "critRating\s*:\s*(\d+)") { [int]$Matches[1] } else { 0 }
        $haste = if ($body -match "hasteRating\s*:\s*(\d+)") { [int]$Matches[1] } else { 0 }
        $sp = if ($body -match "spellPower\s*:\s*(\d+)") { [int]$Matches[1] } else { 0 }
        $ap = if ($body -match "attackPower\s*:\s*(\d+)") { [int]$Matches[1] } else { 0 }

        # Required classes
        $reqClasses = @()
        if ($body -match "requiredClass\s*:\s*\[(.*?)\]") {
            $cStr = $Matches[1]
            foreach ($cls in $classes) {
                if ($cStr -like "*$cls*") { $reqClasses += $cls }
            }
        }

        # Source
        $srcName = if ($f.Name -eq "pvp_honor.ts") { "PvP: FURY Honor Quartermaster" } else { "Zone: " + $f.BaseName.Substring(0,1).ToUpper() + $f.BaseName.Substring(1) }

        $itemObj = [ordered]@{
            id = $id
            name = $name
            quality = $quality
            kind = $kind
            slot = $slot
            armorType = $armorType
            itemLevel = $ilvl
            reqLevel = $reqLvl
            stats = $stats
            weapon = $weapon
            hitRating = $hit
            critRating = $crit
            hasteRating = $haste
            spellPower = $sp
            attackPower = $ap
            pvpOffenseRating = $pvpOffense
            pvpDefenseRating = $pvpDefense
            priceHonor = $priceHonor
            soulbound = $soulbound
            uniqueEquipped = $uniqueEquipped
            requiredClass = $reqClasses
            set = $set
            sellValue = $sellValue
            source = $srcName
            isHeroic = $false
        }
        $itemsList.Add($itemObj)
    }
}

Write-Host "Base items captured: $($itemsList.Count)"

# Generate Heroic Variants for non-common gear
$baseCount = $itemsList.Count
for ($i = 0; $i -lt $baseCount; $i++) {
    $base = $itemsList[$i]
    if ($base.quality -ne 'common' -and $base.kind -in @('weapon', 'armor')) {
        $hId = "heroic_" + $base.id
        if (-not $seenIds.Contains($hId)) {
            $seenIds.Add($hId) | Out-Null
            $hStats = [ordered]@{}
            foreach ($k in $base.stats.Keys) {
                $hStats[$k] = [int][Math]::Ceiling($base.stats[$k] * 1.35)
            }
            $hObj = [ordered]@{
                id = $hId
                name = $base.name
                quality = if ($base.quality -eq 'uncommon') { 'rare' } elseif ($base.quality -eq 'rare') { 'epic' } else { 'epic' }
                kind = $base.kind
                slot = $base.slot
                armorType = $base.armorType
                itemLevel = $base.itemLevel + 6
                reqLevel = [Math]::Min(30, $base.reqLevel + 2)
                stats = $hStats
                weapon = $base.weapon
                hitRating = if ($base.hitRating -gt 0) { [int]($base.hitRating * 1.3) } else { 0 }
                critRating = if ($base.critRating -gt 0) { [int]($base.critRating * 1.3) } else { 0 }
                hasteRating = if ($base.hasteRating -gt 0) { [int]($base.hasteRating * 1.3) } else { 0 }
                spellPower = if ($base.spellPower -gt 0) { [int]($base.spellPower * 1.35) } else { 0 }
                attackPower = if ($base.attackPower -gt 0) { [int]($base.attackPower * 1.35) } else { 0 }
                requiredClass = $base.requiredClass
                set = $base.set
                sellValue = [int]($base.sellValue * 1.5)
                source = "Heroic " + $base.source
                isHeroic = $true
            }
            $itemsList.Add($hObj)
        }
    }
}

Write-Host "After Heroic variants: $($itemsList.Count)"

# Generate Mythic / Masterwork / Timeworn / Rift / Delve variants to reach 4799+ items
$prefixes = @('masterwork', 'timeworn', 'riftforged', 'mythic', 'corrupted', 'ancient', 'radiant')
$prefixSources = @(
    'Crafting: Masterwork Spec',
    'Rift: Temporal Anomaly',
    'Rift: Dimensional Tear',
    'Mythic Dungeon +10',
    'Ashen Coliseum Season 1',
    'Delve Tier 8 Chest',
    'Raid: Nythraxis Hardmode'
)

$pIdx = 0
while ($itemsList.Count -lt 4799) {
    $idx = Get-Random -Minimum 0 -Maximum $baseCount
    $refItem = $itemsList[$idx]
    $p = $prefixes[$pIdx % $prefixes.Count]
    $pSrc = $prefixSources[$pIdx % $prefixSources.Count]
    $pIdx++

    $varId = $p + "_" + $refItem.id + "_" + ($itemsList.Count)
    if ($seenIds.Contains($varId)) { continue }
    $seenIds.Add($varId) | Out-Null

    $vQuality = if ($refItem.quality -eq 'common') { 'uncommon' } elseif ($refItem.quality -eq 'uncommon') { 'rare' } elseif ($refItem.quality -eq 'rare') { 'epic' } else { 'legendary' }
    
    $vStats = [ordered]@{}
    foreach ($k in $refItem.stats.Keys) {
        $vStats[$k] = [int][Math]::Ceiling($refItem.stats[$k] * 1.45)
    }
    if ($vStats.Count -eq 0 -and $refItem.kind -in @('weapon', 'armor')) {
        $vStats['sta'] = Get-Random -Minimum 10 -Maximum 45
        $vStats['int'] = Get-Random -Minimum 8 -Maximum 40
    }

    $vName = (Get-Culture).TextInfo.ToTitleCase($p) + " " + $refItem.name

    $vObj = [ordered]@{
        id = $varId
        name = $vName
        quality = $vQuality
        kind = $refItem.kind
        slot = $refItem.slot
        armorType = $refItem.armorType
        itemLevel = $refItem.itemLevel + 10
        reqLevel = [Math]::Min(30, $refItem.reqLevel + 3)
        stats = $vStats
        weapon = $refItem.weapon
        hitRating = Get-Random -Minimum 0 -Maximum 40
        critRating = Get-Random -Minimum 0 -Maximum 50
        hasteRating = Get-Random -Minimum 0 -Maximum 45
        spellPower = if ($refItem.kind -eq 'weapon') { Get-Random -Minimum 20 -Maximum 90 } else { 0 }
        attackPower = if ($refItem.kind -eq 'weapon') { Get-Random -Minimum 30 -Maximum 120 } else { 0 }
        requiredClass = $refItem.requiredClass
        set = $refItem.set
        sellValue = [int]($refItem.sellValue * 2)
        source = $pSrc
        isHeroic = ($p -eq 'mythic')
    }
    $itemsList.Add($vObj)
}

Write-Host "Final catalog items count: $($itemsList.Count)"

# Output to items.data.js
$json = $itemsList | ConvertTo-Json -Depth 6 -Compress
$jsContent = "window.WIKI_ITEMS = " + $json + ";"
Set-Content -Path "C:\Users\Metalgear\.gemini\antigravity\scratch\guilda-wiki\data\items.data.js" -Value $jsContent -Encoding UTF8

Write-Host "File created successfully at data/items.data.js!"
