const adjustForTimezone = (offset) => {
    const d = new Date();
    const mSecUTC = d.getTime() + d.getTimezoneOffset() * 60000;
    const newTime = mSecUTC + offset * 3600000;
    return new Date(newTime);
};

export const timeToDegrees = (offset) => {
    const d = adjustForTimezone(offset);

    const hrsToSeconds = d.getHours() * 3600;
    const minsToSeconds = d.getMinutes() * 60;
    const seconds = d.getSeconds();

    const hrsToDeg = (hrsToSeconds + minsToSeconds + seconds) * (360 / 43200);
    const minsToDeg = (minsToSeconds + seconds) * (360 / 3600);
    const secsToDeg = seconds * (360 / 60);

    return [hrsToDeg, minsToDeg, secsToDeg];
};

export const transformHands = (hand) => ({
    transform: `translateX(-50%) rotate(${hand}deg)`
});

export const getAmPm = (offset) => {
    const d = adjustForTimezone(offset);
    return d.getHours() < 12 ? "AM" : "PM";
};
