/* global chrome */
export const topFourColors = async () => {
  const paletteCode = await chrome.storage.local
    .get(['paletteCode'])
    .then(res => {
      if (res.paletteCode !== undefined) {
        return res.paletteCode;
      } else {
        return 0;
      }
    });

  return await chrome.storage.local.get(['allMood']).then(res => {
    const colorCodeArr = res.allMood.map(each => each.moodCode);
    // 색상별 개수 요약 {"a":2,"b":2,"c":1}
    let colorSummary = {};
    colorCodeArr.forEach(x => {
      colorSummary[x] = (colorSummary[x] || 0) + 1;
    });
    const colorSorted = Object.entries(colorSummary).sort(
      (a, b) => b[1] - a[1]
    );
    const topFourColors = [];
    for (let el of colorSorted) {
      topFourColors.push(Number(el[0]));
    }
    // console.log(paletteCode);
    // console.log(topFourColors);
    return [paletteCode, topFourColors]; // 상위 4개 색상
  });
};
