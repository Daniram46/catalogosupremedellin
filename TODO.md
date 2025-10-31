# TODO: Clean Up Catalog Website

## Step 1: Standardize Category Names
- Change all instances of "gorrash" to "gorrasH" in data-category attributes in HTML.

## Step 2: Remove Incomplete/Placeholder Product Cards
- Identify and remove product cards with empty titles (e.g., <h3></h3>) or placeholder prices (e.g., "$.000 COP").
- Remove duplicate entries if any.

## Step 3: Add Subcategory Buttons for MUJER
- Add buttons for TOPS, CROPS, ACCESORIOS in the sub-mujer div.
- Assign appropriate data-category values (e.g., topsM, cropM, accesoriosM).

## Step 4: Add Subcategory Buttons for UNISEX
- Add buttons for BUZOS, CAMISETAS in the sub-unisex div.
- Assign appropriate data-category values (e.g., buzosU, camisetasU).

## Step 5: Fix Typos in Product Names
- Change "Dimin" to "Denim" in product titles.

## Step 6: Update JS Filter Logic
- Ensure JS filterProducts function matches the new categories.
- Add any missing category checks if needed.

## Step 7: Ensure Correct Data-Category Attributes
- Verify all products have correct data-category attributes matching the subcategories.
- Add products to MUJER and UNISEX categories if applicable (though none seem to exist yet).
