export declare class AsyncToThrowTests {
    throwError(): void;
    testToThrow(): void;
    private asyncThrowError(delayMs);
    testAsync(delayMs: number): Promise<void>;
    testAsyncToThrow(delayMs: number): Promise<void>;
}
