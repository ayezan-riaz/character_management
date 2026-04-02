"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterGender = void 0;
const graphql_1 = require("@nestjs/graphql");
var CharacterGender;
(function (CharacterGender) {
    CharacterGender["MALE"] = "MALE";
    CharacterGender["FEMALE"] = "FEMALE";
    CharacterGender["UNKNOWN"] = "UNKNOWN";
})(CharacterGender || (exports.CharacterGender = CharacterGender = {}));
(0, graphql_1.registerEnumType)(CharacterGender, {
    name: 'CharacterGender',
});
//# sourceMappingURL=character-gender.enum.js.map