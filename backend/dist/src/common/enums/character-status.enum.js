"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var CharacterStatus;
(function (CharacterStatus) {
    CharacterStatus["ALIVE"] = "ALIVE";
    CharacterStatus["DEAD"] = "DEAD";
    CharacterStatus["UNKNOWN"] = "UNKNOWN";
})(CharacterStatus || (exports.CharacterStatus = CharacterStatus = {}));
(0, graphql_1.registerEnumType)(CharacterStatus, {
    name: 'CharacterStatus',
});
//# sourceMappingURL=character-status.enum.js.map