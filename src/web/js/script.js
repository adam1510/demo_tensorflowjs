
var height =[];
var size = [];
var sizeName = ['S','M','L','XL','XXL'];

data.map(item=>{
    var temp=[];
    temp.push((item.height-1400)/500);
    temp.push((item.weight-40)/50);
    height.push(temp);
    size.push(sizeName.indexOf(item.size));
});
let xs = tf.tensor2d(height);
let sizeTensor = tf.tensor1d(size,'int32');
let ys = tf.oneHot(sizeTensor,5);
const model = tf.sequential();
let hidden=tf.layers.dense({
    units:16,
    // activation:'sigmoid',
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
        epochs:10,
        validationSplit:0.1,
        shuffle:true
    }
    return await model.fit(xs,ys,option);
}
train().then(result =>{
    console.log(result);
    console.log("done");
    var txtHeight = document.getElementById('txtHeight');
    var txtWeight = document.getElementById('txtWeight');
    var btn = document.getElementById('btn');
    var resultTxt = document.getElementById('result');
    document.getElementById('loading').innerHTML= "done!";
    btn.addEventListener('click',function () {
        let valHeight= txtHeight.value;
        let h = (valHeight-1400)/500;
        let valWeight= txtWeight.value;
        let w = (valWeight-40)/50;
        let input = [];
        input.push(h);
        input.push(w);

        let valueTensor = tf.tensor2d([[h,w]]);
        let perdic = model.predict(valueTensor);
        console.log(perdic.dataSync());
        let max = perdic.argMax(1).dataSync()[0];
        resultTxt.innerHTML=sizeName[max];
    });
});
