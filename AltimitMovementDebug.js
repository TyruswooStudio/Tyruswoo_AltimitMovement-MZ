/*
 * MIT License
 *
 * Copyright (c) 2017 Altimit Community Contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
//=============================================================================
// AltimitMovementDebug.js
// Based on https://github.com/AltimitSystems/mv-plugins/tree/master/movement-debug
//=============================================================================
// Ve Lee
// Compatibility with mz
// Add plugin command and F11 to switch debug layer
/*:
 * @target MZ
 * @plugindesc Debug display layer for AltimitMovement
 * @author Altimit Community Contributors
 *
 * @param default_display
 * @text Default display
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * Usage:
 *  Requires Altimit Movement (https://github.com/AltimitSystems/mv-plugins/tree/master/movement).
 *  Plugin will automatically apply when ON.
 *
 * @command switchDebug
 * @text Show/hide debug layer
 * @desc Show/hide debug layer
 *
 * About:
 *  Version 0.01 Alpha
 *  Website https://github.com/AltimitSystems/mv-plugins/tree/master/movement-debug
 */
(function () {
	const pluginName = 'AltimitMovementDebug';
	const default_display = PluginManager.parameters(pluginName)['default_display'];
	let DEBUG_DISPLAY = default_display !== 'false';
	function swithDebug() {
		if (!(SceneManager._scene instanceof Scene_Map))
			return;
		if (!$gameTemp._vectorDebugVisible) {
			const sceneMap = SceneManager._scene;
			sceneMap._spriteset.addChild(sceneMap._spriteset._vectorDebugLayer);
			$gameTemp._vectorDebugVisible = true;
		}
		else {
			const sceneMap = SceneManager._scene;
			sceneMap._spriteset.removeChild(sceneMap._spriteset._vectorDebugLayer);
			$gameTemp._vectorDebugVisible = false;
		}
	}
	/**
	 * Game_CharacterBase
	 */
	Game_CharacterBase.prototype.screenOriginX = function () {
		const tw = $gameMap.tileWidth();
		return Math.round(this.scrolledX() * tw);
	};
	Game_CharacterBase.prototype.screenOriginY = function () {
		const th = $gameMap.tileHeight();
		return Math.round(this.scrolledY() * th);
	};
	/**
	 * Spriteset_Map
	 */
	/**
	 * Overrides
	 */
	const Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
	Spriteset_Map.prototype.createUpperLayer = function () {
		Spriteset_Map_createUpperLayer.call(this);
		this.createVectorDebugLayer();
	};
	const SceneManager_onKeyDown = SceneManager.onKeyDown;
	SceneManager.onKeyDown = function (event) {
		if (!event.ctrlKey && !event.altKey) {
			switch (event.keyCode) {
				case 122: // F11
					swithDebug();
					break;
			}
		}
		SceneManager_onKeyDown.call(this, event);
	};
	/**
	 * Debug_Layer
	 */
	class VectorDebugLayer extends Sprite {
		constructor() {
			super();
			Sprite.prototype.initialize.call(this);
			this.bitmap = new Bitmap(Graphics.width, Graphics.height);
			this.opacity = 192;
		}
		update() {
			this.bitmap.clearRect(0, 0, this.bitmap.width, this.bitmap.height);
			if (!$gameMap.collisionMesh) {
				return;
			}
			const tileWidth = $gameMap.tileWidth();
			const tileHeight = $gameMap.tileHeight();
			const bitmap = this.bitmap;
			let mapX = $gameMap.adjustX(0) * tileWidth;
			let mapY = $gameMap.adjustY(0) * tileHeight;
			mapX = Math.floor(mapX);
			mapY = Math.floor(mapY);
			bitmap.drawCollider(mapX + 0.5, mapY + 0.5, $gameMap.collisionMesh($gamePlayer._collisionType));
			bitmap.drawCollider(mapX - $gameMap.width() * tileWidth + 0.5, mapY + 0.5, $gameMap.collisionMesh($gamePlayer._collisionType));
			bitmap.drawCollider(mapX + 0.5, mapY - $gameMap.height() * tileHeight + 0.5, $gameMap.collisionMesh($gamePlayer._collisionType));
			bitmap.drawCollider(mapX - $gameMap.width() * tileWidth + 0.5, mapY - $gameMap.height() * tileHeight + 0.5, $gameMap.collisionMesh($gamePlayer._collisionType));
			$gameMap.characters().forEach(function (character) {
				if (!character ||
					character._transparent ||
					(character.isVisible &&
						!character.isVisible())) {
					return;
				}
				bitmap.drawCollider(character.screenOriginX() + 0.5, character.screenOriginY() + 0.5, character.collider());
			});
		}
	}
	Spriteset_Map.prototype.createVectorDebugLayer = function () {
		this._vectorDebugLayer = new VectorDebugLayer();
		this._vectorDebugLayer.opacity = 128;
		if (DEBUG_DISPLAY && !$gameTemp._vectorDebugVisible) {
			$gameTemp._vectorDebugVisible = true;
			DEBUG_DISPLAY = false;
		}
		if ($gameTemp._vectorDebugVisible) {
			this.addChild(this._vectorDebugLayer);
		}
	};
	/**
	 * Bitmap
	 */
	/**
	 * Extension
	 */
	Bitmap.prototype.drawCollider = function (x, y, collider) {
		if (!(collider && collider.aabbox))
			return;
		const tw = $gameMap.tileWidth();
		const th = $gameMap.tileHeight();
		if (x + collider.aabbox.right * tw < 0) {
			return;
		}
		if (y + collider.aabbox.bottom * th < 0) {
			return;
		}
		if (x + collider.aabbox.left * tw > Graphics.width) {
			return;
		}
		if (y + collider.aabbox.top * th > Graphics.height) {
			return;
		}
		const context = this.context;
		//if Collider.LIST
		if (collider.type == 2) {
			if (!collider.colliders)
				return;
			context.save();
			context.lineWidth = 1;
			context.strokeStyle = 'yellow';
			context.strokeRect(x + collider.aabbox.left * tw, y + collider.aabbox.top * th, (collider.aabbox.right - collider.aabbox.left) * tw, (collider.aabbox.bottom - collider.aabbox.top) * th);
			context.restore();
			collider.colliders.forEach((collider) => {
				this.drawCollider(x, y, collider);
			});
			return;
		}
		context.save();
		context.lineWidth = 1;
		context.strokeStyle = 'green';
		context.strokeRect(x + collider.aabbox.left * tw, y + collider.aabbox.top * th, (collider.aabbox.right - collider.aabbox.left) * tw, (collider.aabbox.bottom - collider.aabbox.top) * th);
		context.restore();
		context.save();
		context.lineWidth = 1;
		context.strokeStyle = 'blue';
		context.beginPath();
		//Collider.CIRCLE
		if (collider.type == 0) {
			if (!(collider.x && collider.y && collider.radius))
				return;
			// Circle type
			context.arc(x + collider.x * tw, y + collider.y * th, (collider.radius * (tw + th)) / 2, 0, Math.PI * 2, false);
		}
		else if (collider.type == 1) {
			//Collider.POLYGON
			if (!collider.vertices)
				return;
			context.moveTo(x + collider.vertices[0][0] * tw, y + collider.vertices[0][1] * th);
			for (let ii = 1; ii < collider.vertices.length; ii++) {
				context.lineTo(x + collider.vertices[ii][0] * tw, y + collider.vertices[ii][1] * th);
			}
			context.lineTo(x + collider.vertices[0][0] * tw, y + collider.vertices[0][1] * th);
		}
		context.stroke();
		context.restore();
		//Collider.POLYGON
		if (collider.type == 1) {
			if (!collider.vertices)
				return;
			let jj;
			for (let ii = 0; ii < collider.vertices.length; ii++) {
				jj = ii + 1;
				if (jj == collider.vertices.length) {
					jj = 0;
				}
				let nx = collider.vertices[jj][1] - collider.vertices[ii][1]; // -DY
				let ny = collider.vertices[ii][0] - collider.vertices[jj][0]; // +DX
				const length = Math.sqrt(nx * nx + ny * ny);
				nx /= length;
				ny /= length;
				let ox = (collider.vertices[jj][0] + collider.vertices[ii][0]) / 2;
				let oy = (collider.vertices[jj][1] + collider.vertices[ii][1]) / 2;
				context.save();
				context.lineWidth = 1;
				context.strokeStyle = 'red';
				context.beginPath();
				context.moveTo(x + ox * tw, y + oy * th);
				ox += nx * 0.25;
				oy += ny * 0.25;
				context.lineTo(x + ox * tw, y + oy * th);
				context.stroke();
				context.restore();
			}
		}
		//   this._setDirty();
	};
	PluginManager.registerCommand(pluginName, 'switchDebug', swithDebug);
})();
//# sourceMappingURL=AltimitMovementDebug.js.map