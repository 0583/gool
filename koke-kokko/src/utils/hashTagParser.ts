export function parseHashTag(s: string): string[] {
    let hashTags: string[] = [];

    let tmp: string = "";
    let isActivate: boolean = false;

    for (const chr of s) {
        if (isActivate) {
            if (chr === ' ' || chr === '\n' || chr === ' ' || chr === '\t') {
                isActivate = false
                hashTags.push(tmp)
                tmp = ""
            } else if (chr === '#') {
                hashTags.push(tmp)
                tmp = ""
            } else {
                tmp += chr
            }
        } else if (chr === '#') {
            isActivate = true;
        }
    }

    if (isActivate) {
        hashTags.push(tmp);
    }

    return hashTags;
}