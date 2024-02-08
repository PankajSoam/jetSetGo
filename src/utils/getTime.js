export function getTime(time) {
  const newTime = time.split("T");
  if (newTime.length > 1) return newTime[1];
}
