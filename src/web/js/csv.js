// const csvUrl =
//     'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv';
const csvUrl =
    'data.csv';
var sizeName = ['S', 'M', 'L', 'XL', 'XXL'];
var height = [];
var size = [];


async function run() {
    // We want to predict the column "size", which represents a median value of
    // a home (in $1000s), so we mark it as a label.
    const csvDataset = tf.data.csv(
        csvUrl, {
            columnConfigs: {
                size: {
                    isLabel: true
                },
                height: {
                    isLabel: false
                },
                weight: {
                    isLabel: false
                }
            }
        });

    const newDt = await csvDataset.toArray();

    newDt.map(item => {
        var temp = [];
        temp.push((item.xs.height - 1400) / 500);
        temp.push((item.xs.weight - 40) / 50);
        height.push(temp);
        size.push(sizeName.indexOf(item.ys.size));
    });
    const xs1 = tf.tensor2d(height);
    const sizeTensor = tf.tensor1d(size, 'int32');
    const ys1 = tf.oneHot(sizeTensor, 5);
    const model = tf.sequential();
    let hidden = tf.layers.dense({
        units: 16,
        // activation:'sigmoid',
        inputDim: 2
    });
    let output = tf.layers.dense({
        units: 5,
        activation: 'softmax',
    });

    model.add(hidden);
    model.add(output);
    model.compile({
        optimizer: tf.train.sgd(0.2),
        loss: 'categoricalCrossentropy'
    });
    // Fit the model using the prepared Dataset

    let option = {
        epochs: 99,
        validationSplit: 0.1,
        shuffle: true
    }
     await model.fit(xs1, ys1, option).then(e=>{
        console.log(e);
     });
    let valueTensor = tf.tensor2d([[(1678 - 1400) / 500, (60 - 40) / 50]]);
    let perdic = model.predict(valueTensor);
    console.log(perdic.dataSync());
    let max = perdic.argMax(1).dataSync()[0];
    console.log(sizeName[max]);

}

run();