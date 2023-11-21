export const getFormattedTime = (seconds?: number): string => {
  if (!seconds) {
    return '00:00';
  }

  const secs = Math.round(seconds);

  if (secs >= 60) {
    const minutes = Math.floor(secs / 60);
    const leftSeconds = secs - minutes * 60;

    const minutesText = minutes < 10 ? `0${minutes}` : minutes;
    const leftSecondsText = leftSeconds < 10 ? `0${leftSeconds}` : leftSeconds;

    return `${minutesText}:${leftSecondsText}`;
  }

  return secs < 10 ? `00:0${secs}` : `00:${secs}`;
};

type GetTimerTextArgs = {
  seconds: number;
  minutes: number;
  hours: number;
};

export const getTimerText = ({
  seconds,
  minutes,
  hours
}: GetTimerTextArgs): string => {
  let minutesText = '';

  if (hours > 0) {
    minutesText = `${hours * 60 + minutes}`;
  } else if (minutes < 10) {
    minutesText = `0${minutes}`;
  } else {
    minutesText = minutes.toString();
  }

  const secondsText = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutesText}:${secondsText}`;
};

export const getTimeLeft = (seconds: number | null): string => {
  if (!seconds) {
    return 'Time up';
  }

  const secs = Math.round(seconds);
  const minutes = Math.floor(secs / 60);

  if (secs >= 120) {
    return `${minutes} minutes`;
  }

  if (secs >= 60) {
    return `${minutes} minute`;
  }

  return `${seconds} seconds`;
};
