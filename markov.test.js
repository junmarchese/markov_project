const { MarkovMachine } = require('./markov');

describe('Markov Machine', () => {

    // Test 1:
    test('should build correct Markov chains', () => {
        const mm = new MarkovMachine("the cat in the hat");
        const expectedChains = {
            "the": ["cat", "hat"],
            "cat": ["in"],
            "in": ["the"],
            "hat": [null]
        };
        expect(mm.chains).toEqual(expectedChains);
    });

    // Test 2:
    test('should generate text of correct length/number of words, but fewer is acceptable', () => {
        const mm = new MarkovMachine("the cat in the hat");
        const text = mm.makeText(50);
        const words = text.split(/[ \r\n]+/);
        expect(words.length).toBeLessThanOrEqual(50);
    });

    // Test 3:
    test('should generate valid words from input', () => {
        const mm = new MarkovMachine("the cat in the hat");
        const text = mm.makeText(50);
        const words = text.split(/[ \r\n]+/);
        const validWords = new Set(["the", "cat", "in", "hat"]);

        words.forEach(word => {
            expect(validWords.has(word)).toBe(true);
        });
    });

    // Test 4:
    test('should stop generating text when `null` is reached', () => {
        const mm = new MarkovMachine("the cat in the hat");
        const text = mm.makeText(10);
        const words = text.split(/[ \r\n]+/);

        expect(words.includes(null)).toBe(false);
    })

    // Test 5:
    test('should generate fewer than requested words if `null` is reached', () => {
        const mm = new MarkovMachine("the cat in the hat");
        const text = mm.makeText(100);
        const words = text.split(/[ \r\n]+/);
        expect(words.length).toBeLessThanOrEqual(100);
    });

    // Test 6:
    test('should handle empty input', () => {
        const mm = new MarkovMachine("");
        const text = mm.makeText(50);
        expect(text).toBe("");
    });
});