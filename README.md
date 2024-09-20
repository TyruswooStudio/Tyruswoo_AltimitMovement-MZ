# Tyruswoo Patched AltimitMovement for RPG Maker MZ

Tyruswoo’s modification of the open-source pixel movement plugin Altimit Movement!

## Usage

Plugin will automatically apply when ON.

## About

- Modified from AltimitMovement Version 0.50 Beta
- Website: https://github.com/AltimitSystems/mv-plugins/tree/master/movement

## Compatibility Note

This edition of Tyruswoo Altimit Movement for RPG Maker MZ is expressly
designed to be compatible with Tyruswoo Tile Control, Tyruswoo Map
Properties, and MZ3D.

Compatibility with some plugins requires extra steps:
* If MZ3D is present, place Tyruswoo Altimit Movement above MZ3D in the
  plugin list.
* If you're using Tyruswoo Tile Control, use Tyruswoo Altimit Movement's
  plugin command "Recalculate Collision Mesh" after using Tile Control to
  change tiles during runtime.

Tyruswoo Altimit Movement aims to be compatible with most other plugins.
Since it changes RMMZ's core engine more radically than most plugins do,
we advise putting Tyruswoo Altimit Movement at the top of the plugin list.

If you encounter any compatibility issues, please contact us
at [Tyruswoo.com](https://www.tyruswoo.com) and we'll do our best to work out a fix.

## Player X and Y

Tyruswoo Altimit Movement may interfere with scripts or event commands that
expect an exact value for `$gamePlayer.x` or `$gamePlayer.y`. This is
because Altimit Movement sets `$gamePlayer.x` and `$gamePlayer.y` to a
fractional (floating point) value that represents the player's exact position.
To get the nearest integer values to the player's coordinates, you can use
`Math.round($gamePlayer.x)` and `Math.round($gamePlayer.y)`.

## Collider Definitions

A collider is the shape with which an object in the game bumps into other objects.
This plugin allows you to define colliders of the following types of shapes:
Rectangle, Circle, Line, Polygon, and Regular Polygon.

### Rectangle

A rectangle has offsets `x` and `y`, and `width` and `height` expressed in tile-sized units.
Below is an example of a square that's example one tile in size.

    <rect x='0.0' y='0.0' width='1.0' height='1.0' />

### Circle

A circle has offsets `cx` and `cy`, and a radius `r`. This example makes a tile-sized circle:

    <circle cx='0.5' cy='0.5' r='0.5' />

### Line

A line runs from the coordinates (`x1`,`y1`) to (`x2`,`y2`).
The example below makes a line from top-left to bottom-right of a single tile:

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

This collider determines what shape the player "bumps into" events and walls with.

The default player collider is a tile-sized circle centered low, written like this:

    <circle cx='0.5' cy='0.7' r='0.25' />

### Normalize Player Movement?

If this parameter has `Yes` selected (as it has by default), diagonal movement speed accounts for Euclidean distance covered.

If `No` is selected, diagonal movement has the same speed in the X dimension as going straight east or west, and the same speed in the Y dimension as going straight north or south. Therefore, diagonal movement is faster if Normalize Player Movement has `No` selected.

### Follow Distance

This specifies how far apart followers should be as the player moves forward in a straight line. A distance of 1 results in a tight chain; a distance of 2 doubles the spacing. Default follow distance is 1.5.

### Follower Collider

This collider is used for each of the player's followers. The default follower collider is a tile-sized, low-centered circle:

    <circle cx='0.5' cy='0.7' r='0.25' />

### Normalize Follower Movement?

This is like Normalize Player Movement, except that it applies to the player's followers.
Select `Yes` for more realistic diagonal movement, or `No` for faster diagonal movement.

### Boat Collider

This collider is used for the party's boat. Its default collider is a small circle, written like this:

    <circle cx='0.5' cy='0.5' r='0.333' />
    
### Ship Collider

This collider is used for the party's ship. Its default collider is a tile-sized circle:

    <circle cx='0.5' cy='0.5' r='0.5' />

### Airship Collider

This is the collider used for the party's airship. Its default collider is a small circle:

    <circle cx='0.5' cy='0.5' r='0.25' />

### Character Collider

This is the collider used for all non-player characters, except for those whose collider is manually set to something else. The default value is a tile-sized, low-centered circle, as written below:

    <circle cx='0.5' cy='0.7' r='0.25' />

### Tile Collider

This is the collider used for all tile events: that is, all events that have their appearance set to a tile, to a sprite whose filename starts with "!", or to no appearance. By default this collider is a tile-sized square, as written below:

    <rect x='0' y='0' width='1' height='1' />

### Collider Presets

In this list you can define as many collider shapes as you like. To set a character or event to use this collider, use one of the Change Collider plugin commands, and enter the number of the collider you want used. To use the first collider in the Collider Presets list, put 1, or to use the second collider in the list, put 2, and so on.

### Align Move Routes to Grid?

If `yes` is selected, a character will always align to the tile they're standing on before they step through a move route. This is set to `yes` by default; to disable it, select `no`.

### Use Touch/Mouse?

When Use Touch/Mouse has `Yes` selected, the player can click on the screen to choose where to move, and the party will start walking there. To turn off this feature and require movement to be done by controller or arrow keys, select `No`.

### Gamepad Mode

This changes what the gamepad's analog stick does. Gamepad mode can be `Movement + Facing` (default), `Movement Only`, `Facing Only` or `Disabled`.

## Plugin Commands

### The Change Collider Commands

The following plugin commands change the collider of a character, event, or vehicle:
- **Change Player Collider** - Change the collider of the player (i.e. the party leader).
- **Change This Collider** - Change the collider of the active event.
- **Change Event Collider** - Enter the Event ID of any event on the map.
- **Change Vehicle Collider** - Change the collider of the Boat, Ship, or Airship.
- **Change Follower Collider** - Pick a follower from the lineup.

In the command's `Change To` argument, enter the number of the collider preset you want the character, event, or vehicle to start using. For instance, if you want to use the second collider in the Collider Presets list, enter a 2.

### Change Followers Distance

Use this to change the followers' distance during gameplay. It works like the Follow Distance plugin parameter: larger number makes followers walk farther apart.

### Set Followers Can Follow

Pick a specific follower, or all followers. You can make the followers stop following, or resume following, the party leader. (For more options for controlling follower movement, we recommend [Tyruswoo Follower Control](https://www.tyruswoo.com/downloads/rpg-maker-plugin-downloads/#follower-control-mz).)

### Change Move Route Alignment

Use this plugin command to change whether characters must align to the grid before they begin a move route.

### Move

Use this plugin command to assign advanced movement commands. Its Move Command argument has the following sub-arguments:
- **Mover** - The entity that should move. You can assign a Move command to this event, the player, any event on the map, or even to a follower or vehicle.
- **Direction** - This can be random, any cardinal or diagonal direction you choose, forward, backward, toward other, or away from other.
- **Distance** - This is the move distance in tiles.
- **Other** - The other character, event, or vehicle that the mover is moving toward or away from. This only needs to be set if the Direction is "toward other" or "away from other"; otherwise its value doesn't matter.
- **Mover Event Id** - If the mover is an event other than this event, specify its Event ID here. Otherwise, you can leave this blank.
- **Other Event Id** - If the mover is moving toward or away from an event that isn't this event, put the other event's ID here. Otherwise, you can leave this blank.

In addition to defining the Move Command, you can choose whether the active event should **Wait For Completion** of this move, and whether this command should **Skip If Cannot Move**.

### Change Touch/Mouse Input

You can use this to turn touch/mouse input on or off during gameplay.

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

### Visit [Tyruswoo.com](https://www.tyruswoo.com) to [ask for help](https://www.tyruswoo.com/contact-us/), [donate](https://www.tyruswoo.com/donate/), or browse more of our [plugins](https://www.tyruswoo.com/downloads/rpg-maker-plugin-downloads/).

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

**v0.9.1** - 4/15/2024
- Documented all plugin parameters and commands.

**v0.9.2** - 8/9/2024
- Made Tyruswoo Altimit Movement compatible with Tyruswoo Map Properties v2.1.0 and up.

**v0.9.3** - 8/13/2024
- Fixed a bug where the touch target wasn't clearing at the start of
  a foreground event.

**v0.9.4** - 8/27/2024
- Made compatible with MZ3D, as long as MZ3D is placed BELOW
  Tyruswoo_AltimitMovement in the plugin list.
  Credit to Cutievirus for this compatibility fix.
- Fixed a rare crash that said "Assignment to constant variable."
- Made plugin visible to plugins that look for "AltimitMovement"
  in PluginManager's list of scripts.

**v0.9.5** - 9/20/2024
- Added note on how this plugin affects player X and Y coordinates.

> **Remember, only you can build your dreams!**
>
> *Tyruswoo*
