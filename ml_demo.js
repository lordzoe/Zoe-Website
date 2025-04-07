const canvas = document.getElementById("modelCanvas");
const ctx = canvas.getContext("2d");
const modelVisCanvas = document.getElementById("modelVisCanvas");
const modelVisCtx = modelVisCanvas.getContext("2d");
const paramBox = document.getElementById("parameterBox");
const W = canvas.width;
const H = canvas.height;

let currentModel = "logistic";
let currentDataset = "A";

let maxTreeDepth = 2;
const depthSlider = document.getElementById("depthSlider");
const depthValue = document.getElementById("depthValue");

// The dataset we train/predict on
let data = [];
let selectedPoint = null;

// Weights for different models
let perceptronWeights = Array.from({
    length: 6
}, () => Math.random() - 0.5);
let perceptronHiddenWeights = Array.from({
    length: 6
}, () => Math.random() - 0.5);
let dtModel = null;
let logisticWeights = [Math.random(), Math.random(), Math.random()];
let svmWeights = [Math.random(), Math.random(), Math.random()];

let perceptronInputHiddenWeights = [];
let perceptronTopPaths = [];


/***********************
 * Decision Tree Setup *
 ***********************/

// 1) Slider callback
function updateDepth(val) {
    maxTreeDepth = parseInt(val);
    depthValue.textContent = val;
    if (currentModel === "dt") {
        trainDecisionTree();
        drawDecisionBoundary();
        drawDataset();
        updateParameterDisplay();
    }
}

// 2) Convert the tree structure to text
function stringifyTree(node, indent = 0) {
    if (typeof node === "number") {
        return " ".repeat(indent) + `Leaf: ${node}\n`;
    }
    let str = " ".repeat(indent) + `if (${node.feature} <= ${node.threshold.toFixed(2)})\n`;
    str += stringifyTree(node.left, indent + 2);
    str += " ".repeat(indent) + `else\n`;
    str += stringifyTree(node.right, indent + 2);
    return str;
}

// 3) Build the tree
function buildSimpleTree(dataset, depth = 0, maxDepth = 2) {
    // If we are at or beyond max depth or have few data => leaf
    if (depth >= maxDepth || dataset.length < 4) {
        const majority =
            dataset.reduce((acc, p) => acc + p.label, 0) / dataset.length > 0.5 ?
            1 :
            0;
        return majority;
    }
    const split = getBestSplit(dataset);
    const [left, right] = splitData(dataset, split.feature, split.threshold);
    // Recurse
    return {
        feature: split.feature,
        threshold: split.threshold,
        left: buildSimpleTree(left, depth + 1, maxDepth),
        right: buildSimpleTree(right, depth + 1, maxDepth),
    };
}

// 4) Actually train on the entire dataset (no random subset)
function trainDecisionTree() {
    dtModel = buildSimpleTree(data, 0, maxTreeDepth);
}

// 5) Find best split
function getBestSplit(dataset) {
    const classValues = [...new Set(dataset.map((p) => p.label))];
    let bestGini = Infinity;
    let bestFeature = null;
    let bestThreshold = null;

    for (const feature of ["x", "y"]) {
        const values = dataset.map((p) => p[feature]);
        for (const t of values) {
            const groups = splitData(dataset, feature, t);
            const gini = giniImpurity(groups, classValues);
            if (gini < bestGini) {
                bestGini = gini;
                bestFeature = feature;
                bestThreshold = t;
            }
        }
    }
    return {
        feature: bestFeature,
        threshold: bestThreshold
    };
}

function splitData(dataset, feature, threshold) {
    const left = dataset.filter((p) => p[feature] <= threshold);
    const right = dataset.filter((p) => p[feature] > threshold);
    return [left, right];
}

function giniImpurity(groups, classes) {
    const nInstances = groups[0].length + groups[1].length;
    let gini = 0.0;
    for (const group of groups) {
        const size = group.length;
        if (size === 0) continue;
        let score = 0.0;
        for (const classVal of classes) {
            const proportion = group.filter((p) => p.label === classVal).length / size;
            score += proportion * proportion;
        }
        gini += (1.0 - score) * (size / nInstances);
    }
    return gini;
}

/*********************
 * Model & Data Setup
 *********************/
function selectModel(model) {
    const modelButtons = document.querySelectorAll(".sidebar button[onclick^='selectModel']");
    modelButtons.forEach(btn => {
        btn.classList.remove("active");
    });

    // Add 'active' to the button corresponding to model
    const activeModelBtn = document.querySelector(`.sidebar button[onclick="selectModel('${model}')"]`);
    if (activeModelBtn) {
        activeModelBtn.classList.add("active");
    }
    currentModel = model;
    const dtControls = document.getElementById("dtControls");
    if (model === "dt") {
        dtControls.style.display = "block";
        trainDecisionTree();
    } else {
        dtControls.style.display = "none";
    }
    ctx.clearRect(0, 0, W, H);
    drawDecisionBoundary();
    drawDataset();
    updateParameterDisplay();
}

function selectDataset(ds) {
    document.querySelectorAll("#datasetButtons button").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeBtn = document.querySelector(`#datasetButtons button[onclick="selectDataset('${ds}')"]`);
    if (activeBtn) {
        activeBtn.classList.add("active");
    }
    selectedPoint = null;
    perceptronTopPaths = [];

    currentDataset = ds;

    logisticWeights = [Math.random(), Math.random(), Math.random()];
    svmWeights = [Math.random(), Math.random(), Math.random()];

    if (ds === "B") {
        // Hard-code the circle boundary for radius = 0.2 at (0.5, 0.5).
        // hidden = 5 * ( (x-0.5)^2 + (y-0.5)^2 - 0.04 )
        //        = 5x^2 + 5y^2 - 5x - 5y + 2.3
        const baseHiddenWeights = [-5, -5, 0, 5, 5, 2.3];

        // Output = sigmoid( -10 * hidden + 5 )
        // Inside circle => hidden < 0 => output ~ 1
        // Outside circle => hidden > 0 => output ~ 0
        const baseOutputWeights = [-10, 0, 0, 0, 0, 5];

        // Add a tiny amount of noise to each weight
        const noiseScale = 0.05;
        perceptronHiddenWeights = baseHiddenWeights.map(
            w => w + (Math.random() - 0.5) * noiseScale
        );
        perceptronWeights = baseOutputWeights.map(
            w => w + (Math.random() - 0.5) * noiseScale
        );
    } else {
        // Default random initialization for other datasets
        perceptronHiddenWeights = Array.from({
            length: 6
        }, () => Math.random() - 0.5);
        perceptronWeights = Array.from({
            length: 6
        }, () => Math.random() - 0.5);
    }

    resetAndVisualize();
}


/*********************
 * Generate Datasets
 *********************/
function generateDatasetA() {
    data = [];
    for (let i = 0; i < 100; i++) {
        const x = Math.random();
        const y = Math.random();
        // label=1 if y>x
        const label = y > x ? 1 : 0;
        data.push({
            x,
            y,
            label
        });
    }
}

function generateDatasetB() {
    data = [];
    // center class
    for (let i = 0; i < 50; i++) {
        const r = Math.random() * 0.15;
        const angle = Math.random() * 2 * Math.PI;
        data.push({
            x: 0.5 + r * Math.cos(angle),
            y: 0.5 + r * Math.sin(angle),
            label: 1,
        });
    }
    // ring class
    for (let i = 0; i < 50; i++) {
        const r = 0.25 + Math.random() * 0.15;
        const angle = Math.random() * 2 * Math.PI;
        data.push({
            x: 0.5 + r * Math.cos(angle),
            y: 0.5 + r * Math.sin(angle),
            label: 0,
        });
    }
}

function generateDatasetC() {
    data = [];
    for (let i = 0; i < 100; i++) {
        const x = Math.random();
        const y = Math.random();
        const ideal = y > x ? 1 : 0;
        // 20% chance to flip
        const label = Math.random() < 0.2 ? 1 - ideal : ideal;
        data.push({
            x,
            y,
            label
        });
    }
}

function generateDataset() {
    if (currentDataset === "A") generateDatasetA();
    else if (currentDataset === "B") generateDatasetB();
    else generateDatasetC();
}

/***********************
 * Train Other Models
 ***********************/
function trainPerceptron() {
    for (const point of data) {
        const inputs = [
            point.x,
            point.y,
            point.x * point.y,
            point.x ** 2,
            point.y ** 2,
            1,
        ];
        const hidden = tanh(dot(inputs, perceptronHiddenWeights));
        const output = sigmoid(hidden * perceptronWeights[0] + perceptronWeights[5]);
        const error = point.label - output;
        for (let i = 0; i < 5; i++) {
            perceptronWeights[i] += 0.05 * error * hidden;
            perceptronHiddenWeights[i] +=
                0.05 * error * perceptronWeights[0] * (1 - hidden ** 2) * inputs[i];
        }
        perceptronWeights[5] += 0.05 * error;
    }
}

function trainLogistic() {
    for (const point of data) {
        const x = point.x;
        const y = point.y;
        const z = logisticWeights[0] * x + logisticWeights[1] * y + logisticWeights[2];
        const pred = sigmoid(z);
        const error = pred - point.label;
        logisticWeights[0] -= 0.1 * error * x;
        logisticWeights[1] -= 0.1 * error * y;
        logisticWeights[2] -= 0.1 * error * 1;
    }
}

function trainSVM() {
    for (const point of data) {
        const x = point.x;
        const y = point.y;
        const label = point.label === 1 ? 1 : -1;
        const margin = label * (svmWeights[0] * x + svmWeights[1] * y + svmWeights[2]);
        if (margin < 1) {
            svmWeights[0] += 0.01 * label * x;
            svmWeights[1] += 0.01 * label * y;
            svmWeights[2] += 0.01 * label;
        }
    }
}

/****************
 *  Prediction  *
 ****************/
function evaluateDecisionTree(x, y, node = dtModel) {
    if (typeof node === "number") return node;
    const val = node.feature === "x" ? x : y;
    if (val <= node.threshold) return evaluateDecisionTree(x, y, node.left);
    else return evaluateDecisionTree(x, y, node.right);
}

function predict(x, y) {
    switch (currentModel) {
        case "logistic":
            return sigmoid(
                logisticWeights[0] * x + logisticWeights[1] * y + logisticWeights[2]
            );
        case "knn":
            return knnPredict(x, y);
        case "dt":
            return evaluateDecisionTree(x, y);
        case "svm":
            return sigmoid(
                svmWeights[0] * x + svmWeights[1] * y + svmWeights[2]
            );
        case "perceptron": {
            const features = [x, y, x * y, x ** 2, y ** 2, 1];
            const hidden = tanh(dot(features, perceptronHiddenWeights));
            return sigmoid(hidden * perceptronWeights[0] + perceptronWeights[5]);
        }
        case "ensemble": {
            const logistic = sigmoid(logisticWeights[0] * x + logisticWeights[1] * y + logisticWeights[2]);
            const knn = knnPredict(x, y);
            const svm = sigmoid(svmWeights[0] * x + svmWeights[1] * y + svmWeights[2]);
            return (logistic + knn + svm) / 3;
        }

        default:
            return 0.5;
    }
}

/************************
 *   Utility Functions
 ************************/
function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
}

function tanh(z) {
    return Math.tanh(z);
}

function dot(a, b) {
    return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
}

function knnPredict(x, y, k = 3) {
    return data
        .map((p) => ({
            dist: (p.x - x) ** 2 + (p.y - y) ** 2,
            label: p.label
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, k)
        .reduce((sum, p) => sum + p.label, 0) / k;
}

/************************
 *   Drawing & UI
 ************************/
function drawDataset() {
    for (const point of data) {
        ctx.beginPath();
        ctx.arc(point.x * W, point.y * H, 5, 0, 2 * Math.PI);
        ctx.fillStyle = point.label === 1 ? "green" : "red";
        ctx.fill();
    }
}

function drawDecisionBoundary() {
    for (let x = 0; x < W; x += 4) {
        for (let y = 0; y < H; y += 4) {
            const normX = x / W;
            const normY = y / H;
            const prediction = predict(normX, normY);
            ctx.fillStyle = prediction > 0.5 ? "#90ee90" : "#ffb6b6";
            ctx.fillRect(x, y, 4, 4);
        }
    }
}

/***********************************************
 *  Metrics: F1, Accuracy, Precision, Recall
 *  + Confusion Matrix
 ***********************************************/
function computeMetrics() {
    let TP = 0,
        TN = 0,
        FP = 0,
        FN = 0;

    for (const p of data) {
        const pred = predict(p.x, p.y) > 0.5 ? 1 : 0;

        if (p.label === 1 && pred === 1) TP++;
        else if (p.label === 0 && pred === 0) TN++;
        else if (p.label === 0 && pred === 1) FP++;
        else if (p.label === 1 && pred === 0) FN++;
    }

    const total = data.length;
    const accuracy = (TP + TN) / total;
    const precision = TP + FP === 0 ? 0 : TP / (TP + FP);
    const recall = TP + FN === 0 ? 0 : TP / (TP + FN);
    const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);

    return {
        TP,
        TN,
        FP,
        FN,
        accuracy,
        precision,
        recall,
        f1
    };
}


function colorTPorTN(value) {
    // from 0..60 => green
    const v = Math.min(value, 60);
    const ratio = v / 60;
    const r = Math.floor(255 * (1 - ratio));
    const g = Math.floor(255 * ratio);
    return `rgb(${r},${g},0)`;
}

function colorFPorFN(value) {
    // from 0..30 => red
    const v = Math.min(value, 30);
    const ratio = v / 30;
    const r = Math.floor(255 * ratio);
    const g = Math.floor(255 * (1 - ratio));
    return `rgb(${r},${g},0)`;
}

function buildConfusionMatrixHTML(TP, TN, FP, FN) {
    const total = TP + TN + FP + FN;
    const tpPercent = ((TP / total) * 100).toFixed(2);
    const tnPercent = ((TN / total) * 100).toFixed(2);
    const fpPercent = ((FP / total) * 100).toFixed(2);
    const fnPercent = ((FN / total) * 100).toFixed(2);

    const tpColor = colorTPorTN(parseFloat(tpPercent));
    const tnColor = colorTPorTN(parseFloat(tnPercent));
    const fpColor = colorFPorFN(parseFloat(fpPercent));
    const fnColor = colorFPorFN(parseFloat(fnPercent));

    return `
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 10px;">
    <div style="font-weight: bold; margin-bottom: 4px;">Confusion Matrix</div>
    <table class="confusion-matrix">
        <tr>
        <td style="background:${tpColor}">TP<br>${tpPercent}%</td>
        <td style="background:${fpColor}">FP<br>${fpPercent}%</td>
        </tr>
        <tr>
        <td style="background:${tnColor}">TN<br>${tnPercent}%</td>
        <td style="background:${fnColor}">FN<br>${fnPercent}%</td>
        </tr>
    </table>
    </div>
`;
}

/*****************************
 *  reset & re-draw pipeline
 *****************************/
function resetAndVisualize() {
    generateDataset();
    if (currentModel === "dt") {
        trainDecisionTree();
    }
    ctx.clearRect(0, 0, W, H);
    drawDecisionBoundary();
    drawDataset();
    updateParameterDisplay();
}

function convexHull(points) {
    points.sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));
    const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    const lower = [];
    for (const p of points) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
            lower.pop();
        lower.push(p);
    }
    const upper = [];
    for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
            upper.pop();
        upper.push(p);
    }
    upper.pop();
    lower.pop();
    return lower.concat(upper);
}

function drawModelVisualizer() {
    // 1) Clear the modelVisCanvas
    modelVisCtx.clearRect(0, 0, modelVisCanvas.width, modelVisCanvas.height);

    // Inside drawModelVisualizer(), AFTER clearing the canvas, insert:

    switch (currentModel) {

        case "logistic": {
            const canvasW = modelVisCanvas.width;
            const canvasH = modelVisCanvas.height;
            const scaleX = canvasW / 40; // now -10 to +10 range
            const scaleY = canvasH * 0.8; // compress vertically
            const centerX = canvasW / 2;
            const centerY = canvasH / 2;
            
            const gridColor = document.body.classList.contains("dark") ? "#555" : "#eee";
            // Draw grid
            modelVisCtx.strokeStyle = gridColor;
            for (let i = 0; i <= canvasW; i += 50) {
            modelVisCtx.beginPath();
            modelVisCtx.moveTo(i, 0);
            modelVisCtx.lineTo(i, canvasH);
            modelVisCtx.stroke();
            }
            for (let j = 0; j <= canvasH; j += 50) {
            modelVisCtx.beginPath();
            modelVisCtx.moveTo(0, j);
            modelVisCtx.lineTo(canvasW, j);
            modelVisCtx.stroke();
            }


            // Sigmoid curve from x = -10 to 10
            modelVisCtx.beginPath();
            for (let xVal = -20; xVal <= 20; xVal += 0.1) {
                const yVal = 1 / (1 + Math.exp(-xVal));
                const xPix = centerX + xVal * scaleX;
                const yPix = centerY - (yVal - 0.5) * scaleY;
                if (xVal === -20) modelVisCtx.moveTo(xPix, yPix);
                else modelVisCtx.lineTo(xPix, yPix);
            }
            modelVisCtx.strokeStyle = document.body.classList.contains("dark") ? "white" : "blue";
            modelVisCtx.lineWidth = 2;
            modelVisCtx.stroke();

            // Data points in model space (clamped to [-20, 20])
            data.forEach((p) => {
                const score = logisticWeights[0] * p.x + logisticWeights[1] * p.y + logisticWeights[2];
                const sigmoidVal = 1 / (1 + Math.exp(-score));
                const clampedScore = Math.max(-20, Math.min(20, score));
                const xPix = centerX + clampedScore * scaleX;
                const yPix = centerY - (sigmoidVal - 0.5) * scaleY;

                // Fill point
                modelVisCtx.beginPath();
                modelVisCtx.arc(xPix, yPix, 4, 0, 2 * Math.PI);
                modelVisCtx.fillStyle = p.label === 1 ? "green" : "red";
                modelVisCtx.fill();

                // Highlight if selected
                if (selectedPoint && selectedPoint === p) {
                    modelVisCtx.beginPath();
                    modelVisCtx.arc(xPix, yPix, 6, 0, 2 * Math.PI);
                    modelVisCtx.strokeStyle = document.body.classList.contains("dark") ? "white" : "black";
                    modelVisCtx.lineWidth = 2;
                    modelVisCtx.stroke();
                }
            });

            break;
        }

        case "knn": {
            const drawCluster = (label, color, fillColor) => {
                const clusterPoints = data
                    .filter((p) => p.label === label)
                    .map((p) => ({
                        x: p.x * modelVisCanvas.width,
                        y: p.y * modelVisCanvas.height,
                    }));
                if (clusterPoints.length < 3) return;
                const hull = convexHull(clusterPoints);
                modelVisCtx.beginPath();
                modelVisCtx.moveTo(hull[0].x, hull[0].y);
                for (let i = 1; i < hull.length; i++) {
                    modelVisCtx.lineTo(hull[i].x, hull[i].y);
                }
                modelVisCtx.closePath();
                modelVisCtx.fillStyle = fillColor;
                modelVisCtx.globalAlpha = 0.1;
                modelVisCtx.fill();
                modelVisCtx.globalAlpha = 1.0;
                modelVisCtx.strokeStyle = color;
                modelVisCtx.setLineDash([5, 5]);
                modelVisCtx.stroke();
                modelVisCtx.setLineDash([]);
            };
            drawCluster(0, "orange", "orange");
            drawCluster(1, "green", "green");

            data.forEach((p) => {
                modelVisCtx.beginPath();
                modelVisCtx.arc(
                    p.x * modelVisCanvas.width,
                    p.y * modelVisCanvas.height,
                    5,
                    0,
                    2 * Math.PI
                );
                modelVisCtx.fillStyle = p.label === 1 ? "green" : "red";
                modelVisCtx.fill();
            });

            if (selectedPoint) {
                const k = 3;
                const distances = data
                    .map((p) => ({
                        dist: (p.x - selectedPoint.x) ** 2 + (p.y - selectedPoint.y) ** 2,
                        point: p,
                    }))
                    .sort((a, b) => a.dist - b.dist)
                    .slice(1, k + 1); // skip self

                distances.forEach(({
                    point
                }) => {
                    modelVisCtx.beginPath();
                    modelVisCtx.moveTo(
                        selectedPoint.x * modelVisCanvas.width,
                        selectedPoint.y * modelVisCanvas.height
                    );
                    modelVisCtx.lineTo(
                        point.x * modelVisCanvas.width,
                        point.y * modelVisCanvas.height
                    );
                    modelVisCtx.strokeStyle = document.body.classList.contains("dark") ? "white" : "black";
                    modelVisCtx.stroke();
                });
            }
            break;
        }

        case "dt": {
            if (!dtModel) {
                modelVisCtx.clearRect(0, 0, modelVisCanvas.width, modelVisCanvas.height);
                break;
            }

            // Optional roundRect polyfill
            if (!CanvasRenderingContext2D.prototype.roundRect) {
                CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
                    if (typeof radius === "number") {
                        radius = {
                            tl: radius,
                            tr: radius,
                            br: radius,
                            bl: radius
                        };
                    } else {
                        const defaultRadius = {
                            tl: 0,
                            tr: 0,
                            br: 0,
                            bl: 0
                        };
                        for (let side in defaultRadius) {
                            radius[side] = radius[side] || defaultRadius[side];
                        }
                    }
                    this.beginPath();
                    this.moveTo(x + radius.tl, y);
                    this.lineTo(x + width - radius.tr, y);
                    this.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
                    this.lineTo(x + width, y + height - radius.br);
                    this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
                    this.lineTo(x + radius.bl, y + height);
                    this.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
                    this.lineTo(x, y + radius.tl);
                    this.quadraticCurveTo(x, y, x + radius.tl, y);
                    this.closePath();
                    return this;
                };
            }

            // ---- Helpers ----
            function parseLabel(label) {
                if (!label.includes(" ≤ ")) {
                    return [label]; // e.g. "Leaf: 1"
                }
                const [feat, thr] = label.split(" ≤ ");
                return [feat + " ≤", thr];
            }

            function countLeaves(node) {
                if (typeof node === "number") return 1;
                return countLeaves(node.left) + countLeaves(node.right);
            }

            function getTreeDepth(node) {
                if (typeof node === "number") return 1;
                return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
            }

            function traceDecisionPath(node, xVal, yVal, path = []) {
                if (typeof node === "number") return [path];
                const val = node.feature === "x" ? xVal : yVal;
                if (val <= node.threshold) {
                    return traceDecisionPath(node.left, xVal, yVal, path.concat("L"));
                } else {
                    return traceDecisionPath(node.right, xVal, yVal, path.concat("R"));
                }
            }

            // Which nodes/edges are highlighted?
            let highlightPath = [];
            if (selectedPoint) {
                highlightPath = traceDecisionPath(dtModel, selectedPoint.x, selectedPoint.y);
            }

            // ---- 1) Abstract Layout ----
            const layoutNodes = [];
            const depth = getTreeDepth(dtModel);
            const totalLeaves = countLeaves(dtModel);

            // We'll define an "abstract" fontSize. Each node can have lines of text.
            // The node's height in abstract space = (number of lines * abstractFontSize) + padding.
            const abstractFontSize = 20;
            const padding = 10; // extra vertical padding
            // Horizontal spacing per leaf
            const leafWidth = 100;
            // Vertical spacing between levels
            const verticalGap = 120;
            // Root starts at y=0 in abstract space
            const topMargin = 0;

            // We'll store in each layout node:
            // { x, y, lines, isLeaf, highlighted, leftChildIdx, rightChildIdx, width, height, path }
            function layoutDecisionTree(node, level, leftBoundary, path) {
                const isLeaf = typeof node === "number";
                const label = isLeaf ?
                    `${node}` :
                    `${node.feature} ≤ ${node.threshold.toFixed(2)}`;

                const lines = parseLabel(label);
                // For example, for "x ≤ 0.37", lines = ["x ≤", "0.37"]
                // For "Leaf: 1", lines = ["Leaf: 1"]

                const isHighlighted =
                    highlightPath.length &&
                    highlightPath[0].length >= path.length &&
                    path.every((step, i) => highlightPath[0][i] === step);

                // Define the size in abstract space:
                const nodeHeight = lines.length * abstractFontSize + padding;
                // For leaves, use a circle (use height as width) else a rectangle (fixed multiple)
                const nodeWidth = isLeaf ? nodeHeight : 3 * abstractFontSize;

                if (isLeaf) {
                    const centerX = leftBoundary + leafWidth / 2;
                    const yPos = topMargin + level * verticalGap;
                    const idx = layoutNodes.length;
                    layoutNodes.push({
                        x: centerX,
                        y: yPos,
                        lines,
                        isLeaf: true,
                        highlighted: isHighlighted,
                        leftChildIdx: null,
                        rightChildIdx: null,
                        path: [...path],
                        width: nodeWidth,
                        height: nodeHeight
                    });
                    return {
                        idx,
                        leaves: 1,
                        centerX
                    };
                } else {
                    const leftLeaves = countLeaves(node.left);
                    const rightLeaves = countLeaves(node.right);

                    const leftInfo = layoutDecisionTree(
                        node.left,
                        level + 1,
                        leftBoundary,
                        path.concat("L")
                    );
                    const rightStart = leftBoundary + leftLeaves * leafWidth;
                    const rightInfo = layoutDecisionTree(
                        node.right,
                        level + 1,
                        rightStart,
                        path.concat("R")
                    );

                    const subTreeLeaves = leftLeaves + rightLeaves;
                    const parentX = (leftInfo.centerX + rightInfo.centerX) / 2;
                    const yPos = topMargin + level * verticalGap;
                    const idx = layoutNodes.length;
                    layoutNodes.push({
                        x: parentX,
                        y: yPos,
                        lines,
                        isLeaf: false,
                        highlighted: isHighlighted,
                        leftChildIdx: leftInfo.idx,
                        rightChildIdx: rightInfo.idx,
                        path: [...path],
                        width: nodeWidth,
                        height: nodeHeight
                    });
                    return {
                        idx,
                        leaves: subTreeLeaves,
                        centerX: parentX
                    };
                }
            }

            layoutDecisionTree(dtModel, 0, 0, []); // root at x=0

            // ---- 2) Compute bounding box of abstract layout ----
            let minX = Infinity,
                maxX = -Infinity;
            let minY = Infinity,
                maxY = -Infinity;
            for (const n of layoutNodes) {
                if (n.x < minX) minX = n.x;
                if (n.x > maxX) maxX = n.x;
                if (n.y < minY) minY = n.y;
                if (n.y > maxY) maxY = n.y;
            }
            // Expand bounding box to include node widths and heights
            for (const n of layoutNodes) {
                const halfW = n.width / 2;
                const topY = n.y;
                const bottomY = n.y + n.height;
                if (n.x - halfW < minX) minX = n.x - halfW;
                if (n.x + halfW > maxX) maxX = n.x + halfW;
                if (topY < minY) minY = topY;
                if (bottomY > maxY) maxY = bottomY;
            }
            const boundingWidth = maxX - minX || 1;
            const boundingHeight = maxY - minY || 1;

            // 3) Scale to fit the canvas
            const margin = 20;
            const availW = modelVisCanvas.width - 2 * margin;
            const availH = modelVisCanvas.height - 2 * margin;
            const scaleX = availW / boundingWidth;
            const scaleY = availH / boundingHeight;
            const scale = Math.min(scaleX, scaleY);

            // 4) Transform each node into final canvas coordinates
            for (const n of layoutNodes) {
                n.canvasX = margin + (n.x - minX) * scale;
                n.canvasY = margin + (n.y - minY) * scale;
                n.canvasWidth = n.width * scale;
                n.canvasHeight = n.height * scale;
            }

            // ---- NEW: Increase node sizes vertically as tree depth increases ----
            // Use the slider value (maxTreeDepth) to compute a multiplier.
            const nodeScaleMultiplier = 1 + (maxTreeDepth - 1) * 0.3;

            // Define base font size (from our abstract font size scaled)
            const baseFontSize = abstractFontSize * scale;

            function getFontSize() {
                return Math.max(10, baseFontSize * nodeScaleMultiplier); // never below 10px
            }

            // ---- 5) Draw the tree ----
            modelVisCtx.clearRect(0, 0, modelVisCanvas.width, modelVisCanvas.height);

            // Draw edges first
            function drawConnection(x1, y1, x2, y2, highlight) {
                modelVisCtx.beginPath();
                modelVisCtx.moveTo(x1, y1);
                modelVisCtx.lineTo(x2, y2);
                modelVisCtx.strokeStyle = highlight ? "blue" : (document.body.classList.contains("dark") ? "white" : "black");
                modelVisCtx.lineWidth = highlight ? 4 : 3;
                modelVisCtx.stroke();
            }

            for (const n of layoutNodes) {
                if (n.leftChildIdx !== null) {
                    const child = layoutNodes[n.leftChildIdx];
                    const edgeHighlight =
                        highlightPath.length &&
                        highlightPath[0][n.path.length] === "L" &&
                        n.path.every((step, idx) => step === highlightPath[0][idx]);
                    drawConnection(n.canvasX, n.canvasY + 5, child.canvasX, child.canvasY - 5, edgeHighlight);
                }
                if (n.rightChildIdx !== null) {
                    const child = layoutNodes[n.rightChildIdx];
                    const edgeHighlight =
                        highlightPath.length &&
                        highlightPath[0][n.path.length] === "R" &&
                        n.path.every((step, idx) => step === highlightPath[0][idx]);
                    drawConnection(n.canvasX, n.canvasY + 5, child.canvasX, child.canvasY - 5, edgeHighlight);
                }
            }

            // Draw nodes (and text) with increased vertical size via nodeScaleMultiplier
            function drawNode(node) {
                const fontSize = getFontSize();
                modelVisCtx.font = `${fontSize}px Arial`;
                modelVisCtx.textAlign = "center";
                modelVisCtx.textBaseline = "middle";

                if (node.isLeaf) {
                    // For leaves, scale the drawn circle dimensions
                    const scaledWidth = node.canvasWidth * nodeScaleMultiplier;
                    const scaledHeight = node.canvasHeight * nodeScaleMultiplier;
                    const r = Math.min(scaledWidth, scaledHeight) / 2;
                    modelVisCtx.beginPath();
                    // Adjust circle so its center is at (node.canvasX, node.canvasY + r)
                    modelVisCtx.arc(node.canvasX, node.canvasY + r, r, 0, 2 * Math.PI);
                    modelVisCtx.fillStyle = "#dff0ff"; //ffd700 = gold
                    modelVisCtx.fill();
                    modelVisCtx.strokeStyle = node.highlighted ? "blue" : (document.body.classList.contains("dark") ? "white" : "black");
                    modelVisCtx.lineWidth = node.highlighted ? 3 : 2;
                    modelVisCtx.stroke();
                    // Draw text lines, centered in the circle
                    node.lines.forEach((ln, i) => {
                        const offsetY = (i - (node.lines.length - 1) / 2) * (fontSize + 2);
                        modelVisCtx.fillStyle = "black";
                        modelVisCtx.fillText(ln, node.canvasX, node.canvasY + r + offsetY);
                    });
                } else {
                    // For decision nodes, scale rectangle dimensions
                    const w = node.canvasWidth * nodeScaleMultiplier;
                    const h = node.canvasHeight * nodeScaleMultiplier;
                    const rx = node.canvasX - w / 2;
                    const ry = node.canvasY;
                    modelVisCtx.beginPath();
                    modelVisCtx.roundRect(rx, ry, w, h, Math.min(w, h) * 0.2);
                    modelVisCtx.fillStyle = "#dff0ff";
                    modelVisCtx.fill();
                    modelVisCtx.strokeStyle = node.highlighted ? "blue" : (document.body.classList.contains("dark") ? "white" : "black");
                    modelVisCtx.lineWidth = node.highlighted ? 3 : 2;
                    modelVisCtx.stroke();
                    // Draw text lines in the rectangle
                    node.lines.forEach((ln, i) => {
                        const offsetY = (i + 0.75) * fontSize + i * 2;
                        modelVisCtx.fillStyle = "black";
                        modelVisCtx.fillText(ln, node.canvasX, ry + offsetY);
                    });
                }
            }

            layoutNodes.forEach((n) => drawNode(n));
            break;
        }
        case "svm": {
            modelVisCtx.clearRect(0, 0, modelVisCanvas.width, modelVisCanvas.height);

            // Draw all data points
            for (let p of data) {
                modelVisCtx.beginPath();
                modelVisCtx.arc(p.x * modelVisCanvas.width, p.y * modelVisCanvas.height, 5, 0, 2 * Math.PI);
                modelVisCtx.fillStyle = p.label === 1 ? "green" : "red";
                modelVisCtx.fill();
            }

            const w = svmWeights;
            const canvasW = modelVisCanvas.width;
            const canvasH = modelVisCanvas.height;

            function toCanvasCoords(x, y) {
                return [x * canvasW, y * canvasH];
            }

            function drawLine(slope, intercept, color, dashed = false) {
                let x1 = 0,
                    x2 = 1;
                let y1 = slope * x1 + intercept;
                let y2 = slope * x2 + intercept;
                const [cx1, cy1] = toCanvasCoords(x1, y1);
                const [cx2, cy2] = toCanvasCoords(x2, y2);
                modelVisCtx.beginPath();
                modelVisCtx.moveTo(cx1, cy1);
                modelVisCtx.lineTo(cx2, cy2);
                modelVisCtx.strokeStyle = color;
                modelVisCtx.setLineDash(dashed ? [5, 5] : []);
                modelVisCtx.stroke();
                modelVisCtx.setLineDash([]); // reset for next line
            }

            const slope = -w[0] / w[1];
            const intercept = -w[2] / w[1];

            modelVisCtx.lineWidth = 2;
            drawLine(slope, intercept, document.body.classList.contains("dark") ? "white" : "black", false);
            const norm = Math.sqrt(w[0] * w[0] + w[1] * w[1]);
            const offset = 1 / norm;
            drawLine(slope, intercept + offset, document.body.classList.contains("dark") ? "white" : "black", true);
            drawLine(slope, intercept - offset, document.body.classList.contains("dark") ? "white" : "black", true);

            // Highlight support vectors
            for (let p of data) {
                const label = p.label === 1 ? 1 : -1;
                const margin = label * (w[0] * p.x + w[1] * p.y + w[2]);
                if (margin <= 1.05) {
                    modelVisCtx.beginPath();
                    modelVisCtx.arc(
                        p.x * modelVisCanvas.width,
                        p.y * modelVisCanvas.height,
                        7,
                        0,
                        2 * Math.PI
                    );
                    modelVisCtx.strokeStyle = document.body.classList.contains("dark") ? "white" : "black";
                    modelVisCtx.lineWidth = 2;
                    modelVisCtx.stroke();
                }
            }

            modelVisCtx.lineWidth = 1;
            break;
        }

        case "perceptron": {
            // Clear the canvas
            modelVisCtx.clearRect(0, 0, modelVisCanvas.width, modelVisCanvas.height);
            modelVisCtx.font = "16px Arial";

            // Constants for node layout
            const inputCount = 6;
            const hiddenCount = 6;
            const inputLayerX = 80;
            const hiddenLayerX = 250;
            const outputLayerX = 460;
            const activationX = 360;
            const spacingY = modelVisCanvas.height / (inputCount + 1);
            const nodeRadius = 28; // Increased for better readability

            // Example weight arrays:
            // A 2D array for input->hidden connections (6x6)
            perceptronInputHiddenWeights = Array.from({
                    length: inputCount
                }, () =>
                Array.from({
                    length: hiddenCount
                }, () => Math.random() - 0.5)
            );

            // A 1D array for hidden->activation connections (6 weights)
            //perceptronWeights = Array.from({ length: hiddenCount }, () => Math.random() - 0.5);
            // Activation->output weight (single value)
            const activationWeight = 0.5;

            // Build node arrays
            let inputNodes = [];
            let hiddenNodes = [];
            let activationNode, outputNode;

            const inputLabels = ["x", "y", "x*y", "x^2", "y^2", "bias"];

            // Calculate positions for input nodes
            for (let i = 0; i < inputCount; i++) {
                inputNodes.push({
                    x: inputLayerX,
                    y: spacingY * (i + 1),
                    index: i,
                    type: "input"
                });
            }

            // Calculate positions for hidden nodes
            for (let j = 0; j < hiddenCount; j++) {
                hiddenNodes.push({
                    x: hiddenLayerX,
                    y: spacingY * (j + 1),
                    index: j,
                    type: "hidden"
                });
            }

            // Position of activation and output node
            activationNode = {
                x: activationX,
                y: modelVisCanvas.height / 2,
                type: "activation"
            };
            outputNode = {
                x: outputLayerX,
                y: modelVisCanvas.height / 2,
                type: "output"
            };

            // --- Helper functions ---

            // Draw a circle node with a given border color
            function drawNodeWithBorder(node, label, borderColor = "black") {
                modelVisCtx.beginPath();
                modelVisCtx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
                modelVisCtx.fillStyle = "#cce5ff";
                modelVisCtx.fill();
                modelVisCtx.strokeStyle = borderColor;
                modelVisCtx.stroke();
                if (label) {
                    modelVisCtx.fillStyle = "black";
                    modelVisCtx.textAlign = "center";
                    modelVisCtx.textBaseline = "middle";
                    modelVisCtx.fillText(label, node.x, node.y);
                }
            }

            // Draw a node in default style (grey border)
            function drawNode(node, label) {
                drawNodeWithBorder(node, label, document.body.classList.contains("dark") ? "white" : "gray");
            }

            // Draw an arrow from (fromX, fromY) to (toX, toY) using a given color
            function drawArrowWithColor(fromX, fromY, toX, toY, color) {
                const headLength = 10;
                const dx = toX - fromX;
                const dy = toY - fromY;
                const angle = Math.atan2(dy, dx);
                modelVisCtx.beginPath();
                modelVisCtx.moveTo(fromX, fromY);
                modelVisCtx.lineTo(toX, toY);
                modelVisCtx.strokeStyle = color;
                modelVisCtx.stroke();
                // arrowhead
                modelVisCtx.beginPath();
                modelVisCtx.moveTo(toX, toY);
                modelVisCtx.lineTo(
                    toX - headLength * Math.cos(angle - Math.PI / 6),
                    toY - headLength * Math.sin(angle - Math.PI / 6)
                );
                modelVisCtx.lineTo(
                    toX - headLength * Math.cos(angle + Math.PI / 6),
                    toY - headLength * Math.sin(angle + Math.PI / 6)
                );
                modelVisCtx.lineTo(toX, toY);
                modelVisCtx.fillStyle = color;
                modelVisCtx.fill();
            }

            // Tanh utility
            function tanh(z) {
                return Math.tanh(z);
            }

            // Draw everything in the default (black/gray) style, ignoring highlight
            function drawAllGray() {
                // 1) Input nodes in black border, hidden nodes in black border
                inputNodes.forEach((n, i) => {
                    drawNode(n, inputLabels[i]);
                });
                hiddenNodes.forEach((n) => {
                    drawNode(n, "");
                });
                // Activation node + output node also in black
                drawNode(activationNode, "σ");
                drawNode(outputNode, "Output");

                // 2) Arrows: input->hidden in gray, hidden->activation in gray,
                //    activation->output in gray
                // input->hidden
                inputNodes.forEach((inNode) => {
                    hiddenNodes.forEach((hidNode) => {
                        drawArrowWithColor(
                            inNode.x + nodeRadius,
                            inNode.y,
                            hidNode.x - nodeRadius,
                            hidNode.y,
                            document.body.classList.contains("dark") ? "white" : "gray"
                        );
                    });
                });
                // hidden->activation
                hiddenNodes.forEach((hidNode) => {
                    drawArrowWithColor(
                        hidNode.x + nodeRadius,
                        hidNode.y,
                        activationNode.x - nodeRadius,
                        activationNode.y,
                        document.body.classList.contains("dark") ? "white" : "gray"
                    );
                });
                // activation->output
                drawArrowWithColor(
                    activationNode.x + nodeRadius,
                    activationNode.y,
                    outputNode.x - nodeRadius,
                    outputNode.y,
                    document.body.classList.contains("dark") ? "white" : "gray"
                );
            }

            // Highlight the input node, the arrow input->hidden, the hidden node,
            // and the arrow hidden->activation with a given color.
            // We do NOT highlight the activation node or arrow activation->output.
            function highlightPartialPath(i, j, color) {
                // 1) highlight input node i
                let inNode = inputNodes[i];
                drawNodeWithBorder(inNode, inputLabels[i], color);

                // 2) highlight arrow input->hidden
                drawArrowWithColor(
                    inNode.x + nodeRadius,
                    inNode.y,
                    hiddenNodes[j].x - nodeRadius,
                    hiddenNodes[j].y,
                    color
                );

                // 3) highlight hidden node j
                drawNodeWithBorder(hiddenNodes[j], "", color);

                // 4) highlight arrow hidden->activation
                drawArrowWithColor(
                    hiddenNodes[j].x + nodeRadius,
                    hiddenNodes[j].y,
                    activationNode.x - nodeRadius,
                    activationNode.y,
                    color
                );
                // do NOT highlight activation node or arrow activation->output
            }

            function drawNetwork() {
                modelVisCtx.clearRect(0, 0, modelVisCanvas.width, modelVisCanvas.height);

                // If no selectedPoint => everything is default
                if (!selectedPoint) {
                    drawAllGray();
                    return;
                }

                // 1) compute features + hiddenActivations
                const xVal = selectedPoint.x;
                const yVal = selectedPoint.y;
                const features = [xVal, yVal, xVal * yVal, xVal ** 2, yVal ** 2, 1];

                // hiddenActivations
                const hiddenActivations = [];
                for (let j = 0; j < hiddenCount; j++) {
                    let sum = 0;
                    for (let i = 0; i < inputCount; i++) {
                        sum += features[i] * perceptronInputHiddenWeights[i][j];
                    }
                    hiddenActivations[j] = tanh(sum);
                }

                // We'll define path score from input->hidden->activation->output
                // but only highlight input->hidden->activation portion.
                // pathScore(i, j) = sum of absolute contributions
                //   (|f[i] * w_{i,j}| + |hiddenActivations[j] * perceptronWeights[j]| + |activationWeight|)
                let pathScores = [];
                for (let i = 0; i < inputCount; i++) {
                    for (let j = 0; j < hiddenCount; j++) {
                        const scoreIH = Math.abs(features[i] * perceptronInputHiddenWeights[i][j]);
                        const scoreHA = Math.abs(hiddenActivations[j] * perceptronWeights[j]);
                        const scoreAO = Math.abs(activationWeight);
                        const totalScore = scoreIH + scoreHA + scoreAO;
                        pathScores.push({
                            i,
                            j,
                            score: totalScore
                        });
                    }
                }
                // Sort descending
                pathScores.sort((a, b) => b.score - a.score);

                // The top path is green, the second & third are blue
                // all others remain default gray
                // => we first draw everything in gray
                drawAllGray();

                // highlight top 3 if exist
                if (perceptronTopPaths.length > 0) {
                    highlightPartialPath(perceptronTopPaths[0].i, perceptronTopPaths[0].j, "blue");
                }
                if (perceptronTopPaths.length > 1) {
                    highlightPartialPath(perceptronTopPaths[1].i, perceptronTopPaths[1].j, "purple");
                }
                if (perceptronTopPaths.length > 2) {
                    highlightPartialPath(perceptronTopPaths[2].i, perceptronTopPaths[2].j, "purple");
                }
            }

            // Finally, draw
            drawNetwork();

            break;
        }

        case "ensemble": {
            modelVisCtx.clearRect(0, 0, modelVisCanvas.width, modelVisCanvas.height);

            const nodeRadius = 40;

            const inputNode = {
                x: 250,
                y: 50,
                label: "Input"
            };
            const subModels = [{
                    name: "LR",
                    x: 150,
                    y: 175
                },
                {
                    name: "KNN",
                    x: 250,
                    y: 175
                },
                {
                    name: "SVM",
                    x: 350,
                    y: 175
                },
            ];
            const finalNode = {
                x: 250,
                y: 325,
                label: "final vote:\n0.00"
            };
            const predictionNode = {
                x: 250,
                y: 450,
                label: "Prediction:\n?"
            };

            /********************************************
             * 1) Compute sub-model votes and prediction
             ********************************************/
            if (selectedPoint) {
                const x = selectedPoint.x;
                const y = selectedPoint.y;

                const logistic = sigmoid(logisticWeights[0] * x + logisticWeights[1] * y + logisticWeights[2]);
                const knn = knnPredict(x, y);
                const svm = sigmoid(svmWeights[0] * x + svmWeights[1] * y + svmWeights[2]);

                subModels[0].vote = logistic;
                subModels[1].vote = knn;
                subModels[2].vote = svm;

                const average = (logistic + knn + svm) / 3;
                finalNode.label = `final vote:\n${average.toFixed(2)}`;
                predictionNode.label = `Prediction:\n ${average > 0.5 ? 1 : 0}`;
            } else {
                finalNode.label = "final vote:\n0.00";
                predictionNode.label = "Prediction:\n ?";
            }

            /********************************
             * 2) Helper: draw a circle node
             ********************************/
            function drawNode(ctx, node, radius, fillColor = "#cce5ff") {
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = fillColor;
                ctx.fill();
                ctx.strokeStyle = document.body.classList.contains("dark") ? "white" : "gray";
                ctx.stroke();

                if (node.label) {
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.font = "16px Arial";
                    const lines = node.label.split("\n");
                    lines.forEach((ln, i) => {
                        ctx.fillText(ln, node.x, node.y + (i - (lines.length - 1) / 2) * 16);
                    });
                }
            }

            /********************************
             * 3) Helper: draw an arrow line
             ********************************/
            function drawArrow(ctx, x1, y1, x2, y2, color = document.body.classList.contains("dark") ? "white" : "gray") {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = color;
                ctx.stroke();

                const headLength = 10;
                const dx = x2 - x1;
                const dy = y2 - y1;
                const angle = Math.atan2(dy, dx);
                ctx.beginPath();
                ctx.moveTo(x2, y2);
                ctx.lineTo(
                    x2 - headLength * Math.cos(angle - Math.PI / 6),
                    y2 - headLength * Math.sin(angle - Math.PI / 6)
                );
                ctx.lineTo(
                    x2 - headLength * Math.cos(angle + Math.PI / 6),
                    y2 - headLength * Math.sin(angle + Math.PI / 6)
                );
                ctx.lineTo(x2, y2);
                ctx.fillStyle = color;
                ctx.fill();
            }

            /**********************************************
             * 4) Draw the ensemble diagram (real-time)
             **********************************************/
            drawNode(modelVisCtx, inputNode, nodeRadius);

            subModels.forEach((m) => {
                drawNode(modelVisCtx, {
                    x: m.x,
                    y: m.y,
                    label: m.name
                }, nodeRadius);
                if (selectedPoint && typeof m.vote === "number") {
                    modelVisCtx.fillStyle = document.body.classList.contains("dark") ? "white" : "black"
                    modelVisCtx.textAlign = "center";
                    modelVisCtx.textBaseline = "middle";
                    modelVisCtx.font = "14px Arial";
                    modelVisCtx.fillText(`vote = ${m.vote.toFixed(2)}`, m.x, m.y + nodeRadius + 15);
                }
            });

            drawNode(modelVisCtx, finalNode, nodeRadius);
            drawNode(modelVisCtx, predictionNode, nodeRadius);

            subModels.forEach((m) => {
                drawArrow(modelVisCtx, inputNode.x, inputNode.y + nodeRadius, m.x, m.y - nodeRadius);
                drawArrow(modelVisCtx, m.x, m.y + nodeRadius + 25, finalNode.x, finalNode.y - nodeRadius);
            });

            drawArrow(
                modelVisCtx,
                finalNode.x,
                finalNode.y + nodeRadius,
                predictionNode.x,
                predictionNode.y - nodeRadius
            );

            break;
        }


        default:
            // No special visualization for other models
            break;
    }

    // For example, a placeholder text:
    modelVisCtx.save();
    modelVisCtx.resetTransform();
    modelVisCtx.fillStyle = document.body.classList.contains("dark") ? "white" : "black";
    modelVisCtx.font = "16px Arial";
    modelVisCtx.textAlign = "left";
    modelVisCtx.textBaseline = "top";
    if (currentModel == "logistic") {
        modelVisCtx.fillText("Model: lr ", 20, 20);
    } else {
        modelVisCtx.fillText("Model: " + currentModel, 20, 20);
        modelVisCtx.restore();
    }
}

/*****************************
 *  Animation loop
 *****************************/
function loop() {
    // Train only these models in real time
    if (currentModel === "perceptron") trainPerceptron();
    if (currentModel === "logistic") trainLogistic();
    if (currentModel === "svm") trainSVM();

    ctx.clearRect(0, 0, W, H);
    drawDecisionBoundary();
    drawDataset();
    updateParameterDisplay();
    drawModelVisualizer();
    requestAnimationFrame(loop);

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "right";
    ctx.fillText("Click on a datapoint to interact.", W - 50, 30);
}

function updateParameterDisplay() {
    let text = currentModel === "logistic" ? "Model: lr\n" : `Model: ${currentModel}\n`;
    if (currentModel === "perceptron") {
        text += `\nInput Weights:\n${perceptronWeights
        .map((w) => w.toFixed(3))
        .join(", ")}\n`;
        text += `Hidden Weights:\n${perceptronHiddenWeights
        .map((w) => w.toFixed(3))
        .join(", ")}`;
    } else if (currentModel === "logistic") {
        text += `\nLR Weights:\n${logisticWeights
        .map((w) => w.toFixed(3))
        .join(", ")}`;
    } else if (currentModel === "svm") {
        text += `\nSVM Weights:\n${svmWeights.map((w) => w.toFixed(3)).join(", ")}`;
    } else if (currentModel === "dt") {
        text += `\nDT Structure:\n` + JSON.stringify(dtModel, null, 2);
    }
    // Add code if you want other models to show weights, etc.

    // Metrics
    const {
        TP,
        TN,
        FP,
        FN,
        accuracy,
        precision,
        recall,
        f1
    } = computeMetrics();
    text += `\n\nPerformance Metrics:\n`;
    text += `Accuracy: ${(accuracy * 100).toFixed(2)}%\n`;
    text += `Precision: ${(precision * 100).toFixed(2)}%\n`;
    text += `Recall: ${(recall * 100).toFixed(2)}%\n`;
    text += `F1 Score: ${(f1 * 100).toFixed(2)}%\n`;

    // Confusion matrix
    const cmHTML = buildConfusionMatrixHTML(TP, TN, FP, FN);

    paramBox.innerHTML = text.replace(/\n/g, "<br>") + cmHTML;
}

function expandDemoBox(url) {
    const overlay = document.getElementById("expanded-overlay");
    const content = document.getElementById("expanded-box-content");
  
    content.innerHTML = `
      <iframe src="${url}" frameborder="0"></iframe>
    `;
    overlay.classList.add("active");
  }
  
  function closeDemoBox() {
    const overlay = document.getElementById("expanded-overlay");
    const content = document.getElementById("expanded-box-content");
    overlay.classList.remove("active");
    content.innerHTML = "";
  }
  

// Initialize with dataset A by default
selectDataset("A");
selectModel("logistic");
loop();



// Fix: Call drawModelVisualizer immediately after click
modelVisCanvas.addEventListener("click", function(event) {
    const rect = modelVisCanvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    let minDist = Infinity;
    let chosen = null;
    for (const p of data) {
        const dx = p.x * modelVisCanvas.width - clickX;
        const dy = p.y * modelVisCanvas.height - clickY;
        const dist = dx * dx + dy * dy;
        if (dist < minDist && dist < 400) {
            minDist = dist;
            chosen = p;
        }
    }
    selectedPoint = chosen;
    drawModelVisualizer(); // <<< force redraw so lines appear
});

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Find which data point (if any) was clicked
    let nearest = null,
        minDist = Infinity;
    for (const p of data) {
        const dx = p.x * W - clickX;
        const dy = p.y * H - clickY;
        const dist = dx * dx + dy * dy;
        if (dist < minDist) {
            minDist = dist;
            nearest = p;
        }
    }

    // If close enough, show how the current model interprets that point:
    if (minDist < 25) {
        selectedPoint = nearest;

        if (currentModel === "perceptron" && selectedPoint) {
            const xVal = selectedPoint.x;
            const yVal = selectedPoint.y;
            const features = [xVal, yVal, xVal * yVal, xVal ** 2, yVal ** 2, 1];
            const hiddenActivations = [];

            for (let j = 0; j < 6; j++) {
                let sum = 0;
                for (let i = 0; i < 6; i++) {
                    sum += features[i] * perceptronInputHiddenWeights[i][j];
                }
                hiddenActivations[j] = Math.tanh(sum);
            }

            perceptronTopPaths = [];
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 6; j++) {
                    const scoreIH = Math.abs(features[i] * perceptronInputHiddenWeights[i][j]);
                    const scoreHA = Math.abs(hiddenActivations[j] * perceptronWeights[j]);
                    const scoreAO = Math.abs(0.5);
                    const totalScore = scoreIH + scoreHA + scoreAO;
                    perceptronTopPaths.push({
                        i,
                        j,
                        score: totalScore
                    });
                }
            }
            perceptronTopPaths.sort((a, b) => b.score - a.score);
            perceptronTopPaths = perceptronTopPaths.slice(0, 3); // keep top 3
        }
        drawModelVisualizer(); // Redraw visualizer
    }

    
});