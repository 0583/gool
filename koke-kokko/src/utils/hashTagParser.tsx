import React from "react";
import {Link, Typography} from "@mui/material";

export function parseHashTag(s: string): string[] {
    let hashTags: string[] = [];

    let tmp: string = "";
    let isActivate: boolean = false;

    for (const chr of s) {
        if (isActivate) {
            if (' \n\t，。！？；,.!?\'"…~～-+【】{}[]「」、\\'.includes(chr)) {
                isActivate = false
                if (tmp.length > 0) {
                    hashTags.push(tmp)
                    tmp = ""
                }
            } else if (chr === '#') {
                if (tmp.length > 0) {
                    hashTags.push(tmp)
                    tmp = ""
                }
            } else {
                tmp += chr
            }
        } else if (chr === '#') {
            isActivate = true;
        }
    }

    if (isActivate) {
        if (tmp.length > 0) {
            hashTags.push(tmp);
        }
    }
    return hashTags
}

export function renderTypographyWithTags(s: string) {

    const buildTag = (cont: string) => {
        return (
            <Link href={"#/tag?name=" + cont}>#{cont}</Link>
        )
    }

    const escapeEnter = (chr: string) => {
        if (chr === '\n') {
            return (<br />)
        } else {
            return chr
        }
    }

    let hashTags: string[] = [];

    let tmp: string = "";
    let isActivate: boolean = false;

    return (
        <Typography variant="body1">
            {
                [...s].map((chr) => {
                    if (isActivate) {
                        if (' \n\t，。！？；,.!?\'"…~～-+【】{}[]「」、\\'.includes(chr)) {
                            isActivate = false
                            const c = tmp
                            tmp = ""
                            if (c.length > 0) {
                                return (
                                    <>
                                        {buildTag(c)}
                                        {escapeEnter(chr)}
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        {'#' + c}
                                        {escapeEnter(chr)}
                                    </>
                                )
                            }
                        } else if (chr === '#') {
                            hashTags.push(tmp)
                            const c = tmp
                            tmp = ""
                            if (c.length > 0) {
                                return buildTag(c)
                            } else {
                                return '#' + c
                            }
                        } else {
                            tmp += chr
                            return ""
                        }
                    } else if (chr === '#') {
                        isActivate = true;
                        return ""
                    } else {
                        return escapeEnter(chr)
                    }
                })
            }
            {
                ( isActivate &&
                    (tmp.length > 0 ? buildTag(tmp) : '#' + tmp)
                )
            }
        </Typography>
    )
}