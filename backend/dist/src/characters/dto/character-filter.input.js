"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterFilterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const character_gender_enum_1 = require("../../common/enums/character-gender.enum");
const character_status_enum_1 = require("../../common/enums/character-status.enum");
let CharacterFilterInput = class CharacterFilterInput {
    status;
    gender;
    search;
};
exports.CharacterFilterInput = CharacterFilterInput;
__decorate([
    (0, graphql_1.Field)(() => character_status_enum_1.CharacterStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(character_status_enum_1.CharacterStatus),
    __metadata("design:type", String)
], CharacterFilterInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => character_gender_enum_1.CharacterGender, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(character_gender_enum_1.CharacterGender),
    __metadata("design:type", String)
], CharacterFilterInput.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CharacterFilterInput.prototype, "search", void 0);
exports.CharacterFilterInput = CharacterFilterInput = __decorate([
    (0, graphql_1.InputType)()
], CharacterFilterInput);
//# sourceMappingURL=character-filter.input.js.map