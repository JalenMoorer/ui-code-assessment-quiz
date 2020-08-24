export const entitiesRegex = /(&quot;|&#039;|&amp;)/g;

export const specialCharsMap = new Map();
specialCharsMap.set("&quot;", '"');
specialCharsMap.set("&#039;", "'");
specialCharsMap.set("&amp;", "&");