# Tyruswoo Patched AltimitMovement for RPG Maker MZ

Tyruswoo’s modification of the open-source pixel movement plugin Altimit Movement!

This modified plugin provides a command to recalculate tile boundaries.
This allows Tyruswoo Altimit Movement to be used with Tile Control MZ.

## Usage

Plugin will automatically apply when ON.

## About

- Modified from AltimitMovement Version 0.50 Beta
- Website: https://github.com/AltimitSystems/mv-plugins/tree/master/movement

## Basics of how to use this plugin

This plugin does not require Tile Control to run. The plugin is a modified
version of AltimitMovement, with an added feature of being able to use a
plugin command (or script) to recalculate the map collision mesh. This is
useful if Tile Control changed any tiles from passable to impassible, or
vice versa.

To use this plugin, you can use a plugin command each time you want the
map's collision mesh to be recalculated.

## Collider Definitions

A collider is the shape with which an object in the game bumps into other objects.
This plugin allows you to define colliders of the following types of shapes:
Rectangle, Circle, Line, Polygon, and Regular Polygon.

### Rectangle

A rectangle has offsets `x` and `y`, and `width` and `height` expressed in tile-sized units.
Below is an example of a square that's example one tile in size.

    <rect x='0.0' y='0.0' width='1.0' height='1.0' />

### Circle

This example makes a tile-sized circle:

    <circle cx='0.5' cy='0.5' r='0.5' />

### Line

This example makes a line from top-left to bottom-right of a single tile:

    <line x1='0' y1='0' x2='1' y2='1' />

### Polygon

A polygon collider must be convex and clock-wise-winding.
The example below makes a triangle.

    <polygon points='0.0,1.0 0.5,0.0 1.0,1.0' />

### Regular polygon

A regular polygon has all angles equal and all sides equal.
The example below makes a 5-pointed polygon, i.e. a pentagon.

    <regular cx='0.5' cy='0.5' rx='0.5' ry='0.5' p='5' />

## Plugin Parameters

### Player Collider

### Normalize Player Movement?

### Follow Distance

### Followers Collider

### Normalize Follower Movement?

### Boat Collider

### Ship Collider

### Airship Collider

### Character Collider

### Tile Collider

### Collider Presets

### Align Move Routes to Grid?

### Use Touch/Mouse?

### Gamepad Mode

## Plugin Commands

### Change Player Collider

### Change This Collider

### Change Event Collider

### Change Vehicle Collider

### Change Follower Collider

### Change Followers Distance

### Set Followers Can Follow

### Change Move Route Alignment

### Move

### Change Touch/Mouse Input

### Recalculate Collision Mesh

This command informs AltimitMovement that it needs to recalculate the map's
collision mesh. Use it after completing any tile changes affecting passability,
so that the AltimitMovement plugin recognizes the changed tiles.

## Script calls (Advanced)

    $gameMap.recalculateCollisionMesh();

This is the script call run by the plugin command "Recalculate Collision Mesh";
the script and the plugin command have the same effect.

## Debug Overlay

AltimitMovementDebug.js is an optional supplementary plugin developed by VeLee and packaged with Tyruswoo Altimit Movement. When AltimitMovementDebug.js is added to the plugin list and turned ON, it shows a color-coded wireframe overlay of the map's collision mesh and all characters' colliders. To hide the overlay, use Plugin Manager to turn AltimitMovevementDebug.js OFF.

### For more help using this plugin, see [Tyruswoo.com](https://www.tyruswoo.com).

## Version History

**v0.5**  10/18/2021
- This modified version of AltimitMovement 0.50 Beta provides a
  script call for compatibility with Tyruswoo_TileControl.

**v0.6**  3/11/2023
- Fixed a bug in which a Show Choices command could happen twice when
  preceded by a Show Text command. (Ensured a command101 alias method
  returns a boolean value as expected by the current MZ corescript.)

**v0.6.1** - 8/30/2023
- This plugin is now free and open source under the [MIT license](https://opensource.org/license/mit/).

**v0.7.0** - 3/8/2024
- Fixed issue where two events sometimes triggered at once and
play out one after the other even when it didn't make sense.
Now the second event only runs if it's still in range and
on the correct page when the first event finishes running.

**v0.8.0** - 3/13/2024
- Removed caching, as it was causing crashes and conferring no benefit.

**v0.9.0** - 3/27/2024
- Added VeLee's optional debug overlay, AltimitMovementDebug.js

> **Remember, only you can build your dreams!**
>
> *Tyruswoo*
