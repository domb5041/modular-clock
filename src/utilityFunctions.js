import moment from "moment";
import "moment-timezone";

export const timeToDegrees = (timezone) => {
    const d = timezone ? moment().tz(timezone) : moment();

    const hrsToSeconds = d.hours() * 3600;
    const minsToSeconds = d.minutes() * 60;
    const seconds = d.seconds();

    const hrsToDeg = (hrsToSeconds + minsToSeconds + seconds) * (360 / 43200);
    const minsToDeg = (minsToSeconds + seconds) * (360 / 3600);
    const secsToDeg = seconds * (360 / 60);

    return [hrsToDeg, minsToDeg, secsToDeg];
};

export const transformHands = (hand) => ({
    transform: `translateX(-50%) rotate(${hand}deg)`
});

export const getAmPm = (timezone) => {
    const d = timezone ? moment().tz(timezone) : moment();
    return d.hours() < 12 ? "AM" : "PM";
};
