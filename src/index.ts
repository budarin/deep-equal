function is(x: any, y: any) {
    return (
        (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
    );
}

export function deepEqual(objA: unknown, objB: unknown): boolean {
    if (is(objA, objB)) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    for (let i = 0; i < keysA.length; i++) {
        const currentKey = keysA[i];
        if (
            !Object.prototype.hasOwnProperty.call(objB, currentKey) ||
            // $FlowFixMe[incompatible-use] lost refinement of `objB`
            !is(objA[currentKey as keyof typeof objA], objB[currentKey as keyof typeof objB])
        ) {
            return false;
        }
    }

    return true;
}
