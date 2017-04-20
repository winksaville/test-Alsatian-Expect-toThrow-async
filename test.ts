/**
 * Test Expect.toThrow for async functions
 */
import {
    AsyncTest,
    Expect,
    Test,
    TestCase,
    TestFixture,
} from "alsatian";

function debug(s: string) {
    console.log(s);
}

@TestFixture("Test async toThrow")
export class AsyncToThrowTests {
    // Synchronous throw
    public throwError() {
        throw new Error("an error");
    }

    @Test("test alsatian toThrow")
    public testToThrow() {
        debug("testToThrow:+");
        Expect(() => this.throwError()).toThrow();
        debug("testToThrow:-");
    }

    // Asynchronous throw
    private asyncThrowError(delayMs: number): Promise<void> {
        return new Promise<void>((_, reject) => {
            debug(`asyncThrowError:+ delayMs=${delayMs}`);
            setTimeout(() => {
                debug(`asyncThrowError.setTimeoutFunc:+ delayMs=${delayMs} rejecting`);
                reject(new Error("Timeout then reject")),
                debug(`asyncThrowError.setTimeoutFunc:- delayMs=${delayMs} rejected`);
            }, delayMs);
            debug(`asyncThrowError:- delayMs=${delayMs}`);
        });
    }

    @TestCase(1800)
    @AsyncTest("test alsatian async")
    public async testAsync(delayMs: number) {
        debug(`testAsync:+ ${delayMs}`);
        try {
            await this.asyncThrowError(delayMs);
            Expect("No error thrown, fail").not.toBeTruthy();
        } catch(err) {
            Expect(err).toBeTruthy();
        }
        debug(`testAsync:- ${delayMs}`);
    }

    @TestCase(1750)
    @AsyncTest("test alsatian async toThrow")
    public async testAsyncToThrow(delayMs: number) {
        debug(`testAsyncToThrow:+ ${delayMs}`);
        await Expect(() => this.asyncThrowError(delayMs)).toThrowAsync();
        debug(`testAsyncToThrow:- ${delayMs}`);
    }
}
