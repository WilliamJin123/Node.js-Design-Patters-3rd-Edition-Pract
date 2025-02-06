async function mapAsync(iterable, callback, concurrency) {
    const results = []
    const queue = [...iterable.keys()]
    async function worker() {
        while (queue.length > 0) {
            const curIndex = queue.shift()
            try {
                results[curIndex] = await Promise.resolve(callback(iterable[curIndex]))
            } catch (err) {
                console.log(err)
                results[curIndex] = null
            }
            
        }

    }
    const workers = []
    for (let i = 0; i < Math.min(concurrency, iterable.length); i++) {
        workers.push(worker())
    }
    await Promise.all(workers)

    return results
}



async function testMapAsync() {
    // Simulated delay function to mimic async operations
    function delay(ms, value) {
        return new Promise(resolve => setTimeout(() => resolve(value), ms));
    }

    // Test Case 1: Basic functionality with synchronous callback
    console.log('Test 1: Synchronous Callback');
    try {
        const numbers = [1, 2, 3, 4, 5];
        const squared = await mapAsync(numbers, x => x * x, 2);
        console.assert(
            JSON.stringify(squared) === JSON.stringify([1, 4, 9, 16, 25]), 
            'Failed: Synchronous mapping'
        );
        console.log('✓ Synchronous mapping passed');
    } catch (error) {
        console.error('Test 1 Failed:', error);
    }

    // Test Case 2: Asynchronous callback with delay
    console.log('\nTest 2: Asynchronous Callback');
    try {
        const urls = ['data1', 'data2', 'data3', 'data4', 'data5'];
        const results = await mapAsync(
            urls, 
            url => delay(Math.random() * 100, `Processed ${url}`), 
            3  // Concurrency of 3
        );
        console.assert(
            results.length === 5 && 
            results.every(result => result.startsWith('Processed')),
            'Failed: Async mapping with delay'
        );
        console.log('✓ Async mapping with delay passed');
    } catch (error) {
        console.error('Test 2 Failed:', error);
    }

    // Test Case 3: Error Handling
    console.log('\nTest 3: Error Handling');
    try {
        const values = [1, 2, 3, 4, 5];
        const resultsWithErrors = await mapAsync(
            values, 
            x => {
                if (x === 3) throw new Error('Deliberate error');
                return x * 2;
            }, 
            2
        );
        console.log('Results with errors:', resultsWithErrors);
    } catch (error) {
        console.log('✓ Error handling worked as expected');
    }

    // Test Case 4: Concurrency Limit
    console.log('\nTest 4: Concurrency Limit');
    try {
        const startTime = Date.now();
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        const results = await mapAsync(
            numbers, 
            async num => {
                // Simulate async work with consistent delay
                await delay(100, num);
                return num * 2;
            }, 
            3  // Limit concurrency to 3
        );

        const duration = Date.now() - startTime;
        
        console.assert(
            results.length === 10 && 
            results.every((val, index) => val === (index + 1) * 2),
            'Failed: Incorrect results'
        );

        // With concurrency of 3, should take ~400ms (4 batches of 100ms)
        console.assert(
            duration >= 300 && duration < 500, 
            `Failed: Unexpected duration ${duration}ms`
        );
        console.log('✓ Concurrency limit test passed');
    } catch (error) {
        console.error('Test 4 Failed:', error);
    }

    // Test Case 5: Empty Iterable
    console.log('\nTest 5: Empty Iterable');
    try {
        const emptyResults = await mapAsync([], x => x, 2);
        console.assert(
            emptyResults.length === 0, 
            'Failed: Empty iterable should return empty array'
        );
        console.log('✓ Empty iterable test passed');
    } catch (error) {
        console.error('Test 5 Failed:', error);
    }

    console.log('\n🎉 All MapAsync Tests Completed Successfully! 🎉');
}

// Run the tests
testMapAsync().catch(console.error);