const {Model} = require('objection');

class sudoku extends Model{
    static get jsonSchema(){
        return{
            type: "object",
            properties: {
                row1: {type: "array"},
                row2: {type: "array"},
                row3: {type: "array"},
                row4: {type: "array"},
                row5: {type: "array"},
                row6: {type: "array"},
                row7: {type: "array"},
                row8: {type: "array"},
                row9: {type: "array"}
            }
        }
    }
}

module.exports = sudoku;