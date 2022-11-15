import * as FNS from "date-fns";
import TimeAgo from "timeago-react";

export const tweetTimeFormat = (
    number: number,
    index: number,
    totalSec: number
): [string, string] => {
    return [
        ["just now", "right now"],
        ["%ss", "in %ss"],
        ["1m", "in 1m"],
        ["%sm", "in %sm"],
        ["1h", "in 1h"],
        ["%sh", "in %sh"],
    ][index] as [string, string];
};

export const formatDate = (time: Date) => {
    if (!time) {
        return null;
    }

    if (time.getTime() > new Date().getTime() - 86400000) {
        return (
            <TimeAgo
                datetime={time}
                locale="tweet-format"
                opts={{
                    minInterval: 15,
                }}
            />
        );
    }

    return time.getFullYear() === new Date().getFullYear()
        ? FNS.format(time, "MMM d")
        : FNS.format(time, "MMM d, Y");
};
