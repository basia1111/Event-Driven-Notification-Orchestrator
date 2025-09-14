export function isInDND(eventTime: string, start: string, end: string) {
  const [evH, evM] = eventTime.slice(11, 16).split(":").map(Number);
  const [sH, sM] = start.split(":").map(Number);
  const [eH, eM] = end.split(":").map(Number);

  const eventMinutes = evH * 60 + evM;
  const startMinutes = sH * 60 + sM;
  const endMinutes = eH * 60 + eM;

  if (startMinutes < endMinutes) {
    return eventMinutes >= startMinutes && eventMinutes < endMinutes;
  } else {
    return eventMinutes >= startMinutes || eventMinutes < endMinutes;
  }
}
