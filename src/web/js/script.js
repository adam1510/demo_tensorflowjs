
var height =[];
var size = [];
var sizeName = ['S','M','L','XL','XXL'];

// create data
data.map(item=>{
    var temp=[];
    temp.push((item.height-1400)/500);
    temp.push((item.weight-40)/50);
    height.push(temp);
    size.push(sizeName.indexOf(item.size));
});

// make tensor
let xs = tf.tensor2d(height);
let sizeTensor = tf.tensor1d(size,'int32');
let ys = tf.oneHot(sizeTensor,5);

// make model
const model = tf.sequential();
let hidden=tf.layers.dense({
    units:16,
    // activation:'sigmoid',
    // input is array 2 dimensional
    inputDim:2
});
let output=tf.layers.dense({
    units:5,
    activation:'softmax',
});
model.add(hidden);
model.add(output);

model.compile({
    optimizer: tf.train.sgd(0.2),
    loss: 'categoricalCrossentropy'
});

async function train() {
    let option = {
        // train 10 times
        epochs:10,
        // get 10% to validate
        validationSplit:0.1,
        shuffle:true
    }
    return await model.fit(xs,ys,option);
}

train().then(result =>{
    console.log(result);
    console.log("Done!");
    var txtHeight = document.getElementById('txtHeight');
    var txtWeight = document.getElementById('txtWeight');
    var btn = document.getElementById('btn');
    var resultTxt = document.getElementById('result');
    document.getElementById('loading').innerHTML= "done!";
    btn.addEventListener('click',function () {
        let valHeight= parseInt(txtHeight.value);
        let h = (valHeight-1400)/500;
        let valWeight= parseInt(txtWeight.value);
        let w = (valWeight-40)/50;

        let valueTensor = tf.tensor2d([[h,w]]);
        let perdic = model.predict(valueTensor);
        let rawData = perdic.dataSync();
        console.log(rawData);
        printData(rawData);
        let max = perdic.argMax(1).dataSync()[0];
        resultTxt.innerHTML=sizeName[max];
    });
});

function printData(data) {
    let result ="";
    for (let i = 0; i < sizeName.length; i++) {
        let rate = (data[i] * 100).toFixed(2);
        let temp = sizeName[i] +": rate is "+ rate + "% <br>";
        result +=temp;

    }
    document.getElementById('summary').innerHTML= result;

}
