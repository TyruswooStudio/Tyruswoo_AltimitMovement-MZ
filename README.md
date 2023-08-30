# Tyruswoo Patched AltimitMovement for RPG Maker MZ

Tyruswoo’s modification of the open-source pixel movement plugin Altimit Movement!

This modified plugin provides a command to recalculate tile boundaries. This allows Tyruswoo Altimit Movement to be used with Tile Control MZ.

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

## Plugin Command

| Plugin Command                       | Description                        |
|--------------------------------------|------------------------------------|
| Recalculate Collision Mesh           | Informs AltimitMovement that it    |
|                                      | needs to recalculates the map's    |
|                                      | collision mesh. Use this script    |
|                                      | after completing any tile changes  |
|                                      | affecting passability, so that the |
|                                      | AltimitMovement plugin recognizes  |
|                                      | the changed tiles.                 |

## Script calls (Advanced)

| Script | Description |
|--------|-------------|
$gameMap.recalculateCollisionMesh(); | This is the script call run by the plugin command "Recalculate Collision Mesh". |

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

> **Remember, only you can build your dreams!**
>
> *Tyruswoo*