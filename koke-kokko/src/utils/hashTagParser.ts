export function parseHashTag(s: string): string[] {
    let hashTags: string[] = [];

    let tmp: string = "";
    let isActivate: boolean = false;

    for (const chr of s) {
        if (isActivate) {
            if (' \n\t，。！？；,.!?\'"…~～-+【】{}[]「」、\\'.includes(chr)) {
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

    return hashTags.map((v: string) => {
        return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
    })
}