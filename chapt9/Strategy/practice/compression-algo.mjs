class CompressionStrategy {
    compress(data) {
        throw new Error('compress method should be implemented');
    }
}

class ZipCompression extends CompressionStrategy {
    compress(data) {
        console.log(`Compressed using ZIP: ${data}`);
    }
}

class RarCompression extends CompressionStrategy {
    compress(file) {
        console.log(`Compressing ${file} using RAR.`);
    }
}

class GzipCompression extends CompressionStrategy {
    compress(file) {
        console.log(`Compressing ${file} using GZIP.`);
    }
}

class CompressionContext {
    constructor(strat){
        this.strat = strat
    }
    compress(data){
        this.strat.compress(data)
    }
    setStrategy(strat){
        this.strat = strat
    }
}

const compressor = new CompressionContext(new ZipCompression());
compressor.executeCompression("document.txt");

compressor.setStrategy(new RarCompression());
compressor.executeCompression("image.png");

compressor.setStrategy(new GzipCompression());
compressor.executeCompression("video.mp4");