
/**-----------------------------------------------------------
    GameVariable Values
    By Adventurer_inc
    Game Data is saved in $gameVariables. This uses the engine's 
    default system of always saving and storing in-game variables.
    This means custom data will be saved within the game save files.
    When the game loads data loads and when game saves data saves.
    
     * @help
     * How to create:
     * let gameVariableNumber = 2;
     * this.data = new GameData(gameVariableNumber);
     * this.data._caravan = [];
     * this.data._caravanGoal = [];
     * this.data._selectedCaravan = null;
     * 
     * How to use:
     * this.data._caravan.push(carts);
     * 
     * How to call:
     * const caravan = this.data._caravan;
     * 
--------------------------------------------------------------*/
function GameData() {
    this.initialize.apply(this, arguments);
};

GameData.prototype.initialize = function(variableId){
    this.variableId = variableId;
    if($gameVariables.value(variableId)) console.log('GameData Warning: Variable '+variableId+' is not empty');
    $gameVariables.setValue(variableId,this);
};

GameData.prototype.addProperty = function(property){
    let value = $gameVariables.value(this.variableId)[property];
    Object.defineProperty(this, property, {
        get: function () {
            return value;
        },
        set: function (x) {
            value = x;
            $gameVariables.setValue(this.variableId,this);
        },
        configurable: true
    });
};