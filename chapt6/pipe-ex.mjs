import { UpperCaseStream } from "./transform-stream-ex.mjs";

process.stdin
    .pipe(new UpperCaseStream)
    .pipe(process.stdout)
