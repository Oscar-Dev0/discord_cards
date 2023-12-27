export function abbreviateNumber(value: number): string {
  let newValue: number | string = value;
  if (value >= 1000) {
    const suffixes: string[] = ["", "K", "M", "B", "T"];
    const suffixNum: number = Math.floor(("" + value).length / 3);
    let shortValue: number | string = "";
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision),
      );
      const dotLessShortValue: string = (shortValue + "").replace(
        /[^a-zA-Z 0-9]+/g,
        "",
      );
      if (dotLessShortValue.length <= 2) break;
    }
    if (typeof shortValue !== "string" && shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue.toString();
}
