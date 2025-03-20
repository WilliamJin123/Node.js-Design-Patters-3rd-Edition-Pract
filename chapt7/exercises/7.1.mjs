class ColorConsole {
    log(){

    }
}

class RedConsole extends ColorConsole {
    log(string){
        console.log('\x1b[31m%s\x1b[0m', string);
    }
}


class BlueConsole extends ColorConsole {
    log(string){
        console.log('\x1b[34m%s\x1b[0m', string);
    }
}

class GreenConsole extends ColorConsole {
    log(string){
        console.log('\x1b[32m%s\x1b[0m', string);
    }
}

function ColorLogger(color){
    if(color === 'red'){
        return new RedConsole();
    } else if(color === 'blue'){
        return new BlueConsole();
    } else if(color === 'green'){
        return new GreenConsole();
    }
}

const redLogger = ColorLogger('red');
const blueLogger = ColorLogger('blue');
const greenLogger = ColorLogger('green');

redLogger.log('this is red')
blueLogger.log('this is blue')
greenLogger.log('this is green')