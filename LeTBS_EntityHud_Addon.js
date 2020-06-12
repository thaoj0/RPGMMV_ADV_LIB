/*-------------------------------------------------------------------------
    GameVariable Values
    By Adventurer_inc
    Addon to LeTBS for RPGMaker MV.
* Mouse Hover replaced by Fire Emblem-like health bar on battlers
 - I recommend placing this at the very bottom of LeTBS_EntityHud.js so if it updates it removes this
 - Battler names will show on hover
 - Bars only hide on death
-------------------------------------------------------------------------*/
Window_TBSEntityHud.prototype.initialize = function (entity) {
    this._entity = entity;
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    //this.contentsOpacity = 0;
    this.refresh();
    this.updatePosition();
};
// Battler names will show only on hover
Window_TBSEntityHud.prototype.refresh = function () {
    this.contents.clear();
    this.resetFontSettings();
    var battler = this._entity.battler();
    //- Name
    var x = 0;
    var y = 0;
    var w = 46;
    this.contents.fontSize -= 4;
    this.changeTextColor(this.systemColor());
    this.leU_drawText(this.showName||"", "center", y);
    //y += this.contents.fontSize;
    x = this.contentsWidth() / 2 - w / 2;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y, w, battler.hpRate(), color1, color2);
};
// Bars only hide on death
TBSEntity.prototype.showMiniHud = function () {
    if(this.battler().rpgObject().TagsLetbs.hideHudWindow) return;
    this._miniHud.showName = this._battler.name();
    this._miniHud.contentsOpacity = 255;
    this._miniHud.refresh();
};
TBSEntity.prototype.hideMiniHud = function () {
    this._miniHud.showName = "";
    if(this._dead) this._miniHud.contentsOpacity = 0;
    this._miniHud.refresh();
};
Lecode.S_TBS.EntityHud.oldTBSEntity_onDamage = TBSEntity.prototype.onDamage;
TBSEntity.prototype.onDamage = function (user) {
    Lecode.S_TBS.EntityHud.oldTBSEntity_onDamage.call(this, user);
    this._miniHud.refresh();
};