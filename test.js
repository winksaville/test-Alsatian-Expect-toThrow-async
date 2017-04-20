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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Test Expect.toThrow for async functions
 */
const alsatian_1 = require("alsatian");
function debug(s) {
    console.log(s);
}
let AsyncToThrowTests = class AsyncToThrowTests {
    // Synchronous throw
    throwError() {
        throw new Error("an error");
    }
    testToThrow() {
        debug("testToThrow:+");
        alsatian_1.Expect(() => this.throwError()).toThrow();
        debug("testToThrow:-");
    }
    // Asynchronous throw
    asyncThrowError(delayMs) {
        return new Promise((_, reject) => {
            debug(`asyncThrowError:+ delayMs=${delayMs}`);
            setTimeout(() => {
                debug(`asyncThrowError.setTimeoutFunc:+ delayMs=${delayMs} rejecting`);
                reject(new Error("Timeout then reject")),
                    debug(`asyncThrowError.setTimeoutFunc:- delayMs=${delayMs} rejected`);
            }, delayMs);
            debug(`asyncThrowError:- delayMs=${delayMs}`);
        });
    }
    testAsync(delayMs) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`testAsync:+ ${delayMs}`);
            try {
                yield this.asyncThrowError(delayMs);
                alsatian_1.Expect("No error thrown, fail").not.toBeTruthy();
            }
            catch (err) {
                alsatian_1.Expect(err).toBeTruthy();
            }
            debug(`testAsync:- ${delayMs}`);
        });
    }
    testAsyncToThrow(delayMs) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`testAsyncToThrow:+ ${delayMs}`);
            yield alsatian_1.Expect(() => this.asyncThrowError(delayMs)).toThrowAsync();
            debug(`testAsyncToThrow:- ${delayMs}`);
        });
    }
};
__decorate([
    alsatian_1.Test("test alsatian toThrow"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AsyncToThrowTests.prototype, "testToThrow", null);
__decorate([
    alsatian_1.TestCase(1800),
    alsatian_1.AsyncTest("test alsatian async"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AsyncToThrowTests.prototype, "testAsync", null);
__decorate([
    alsatian_1.TestCase(1750),
    alsatian_1.AsyncTest("test alsatian async toThrow"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AsyncToThrowTests.prototype, "testAsyncToThrow", null);
AsyncToThrowTests = __decorate([
    alsatian_1.TestFixture("Test async toThrow")
], AsyncToThrowTests);
exports.AsyncToThrowTests = AsyncToThrowTests;
//# sourceMappingURL=test.js.map