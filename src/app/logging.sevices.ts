import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})

export class LoggingServices {
lastLog: string;

printLog(message) {
    console.log(message)
    console.log(this.lastLog)

    this.lastLog = message;
}
}