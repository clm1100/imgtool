const path = require('path');
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync(path.join(__dirname, 'font/msyh.ttf'));

// 测试不同 anchor
['top left', 'left top', 'baseline left'].forEach(anchor => {
    try {
        const pathData = textToSVG.getD('测', { fontSize: 36, anchor });
        console.log(`\n=== Anchor: ${anchor} ===`);
        console.log('Path preview:', pathData.substring(0, 100));

        // 解析 Y 坐标
        const yCoords = [];
        const regex = /[\d.-]+/g;
        const nums = pathData.match(regex)?.map(parseFloat) || [];
        for (let i = 1; i < nums.length; i += 2) {
            yCoords.push(nums[i]);
        }
        if (yCoords.length > 0) {
            console.log('Y range:', Math.min(...yCoords), '-', Math.max(...yCoords));
        }
    } catch (e) {
        console.log(`Anchor ${anchor} error:`, e.message);
    }
});

// 检查 metrics
console.log('\n=== Metrics ===');
const metrics = textToSVG.getMetrics('测', { fontSize: 36 });
console.log(metrics);
