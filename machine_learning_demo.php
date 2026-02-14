<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="favicon.png" type="image/png" sizes="16x16" />
    <link rel="icon" href="favicon.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" href="favicon.png" />
    <link rel="stylesheet" href="styles.css">
    <title>Machine Learning Classifier Tool</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100vh;
      }

      body {
        display: flex;
        flex-direction: column;
        font-family: Arial, sans-serif;
        overflow-y: auto;
      }

      #content-row {
        display: flex;
        flex-direction: row;
        flex-grow: 1; 
      }

      .sidebar {
        width: 220px;
        padding: 20px;
        border-right: 1px solid;
      }

      .sidebar h3 {
        margin-top: 0;
      }

      .sidebar button {
        width: 100%;
        margin: 5px 0;
        padding: 10px;
        font-size: 14px;
      }

      .sidebar button.active {
        background-color: #007BFF;
        color: #fff;
      }

      #right-panel.dark {
        background: #1a1a2e;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center; 
        flex-grow: 1;        
      }

      #canvas-row {
        display: flex;
        flex-direction: row;
        align-items: flex-start; 
        margin-top: 10px;
      }

      .parameters {
        width: 500px;
        margin-top: 10px;
        padding: 10px;
        font-family: monospace;
        font-size: 13px;
        border: 1px solid;
        white-space: pre-wrap;
      }

      table.confusion-matrix {
        border-collapse: collapse;
        margin-top: 10px;
      }

      table.confusion-matrix td {
        width: 80px;
        height: 60px;
        text-align: center;
        vertical-align: middle;
        font-weight: bold;
        border: 1px solid;
      }

      /* Light Theme */
      body.light{
        background-color: #0f4c75; 
        color: #fff;
      }

      .sidebar.light {
        background: #f4f4f4;
        border-color: #ccc;
      }

      .sidebar.light h3 {
        color: #000;
      }

      body.light #themeText {
        color: #000;
      }

      #right-panel.light {
        background: #fff;
        color: #000;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
      }

      .parameters.light {
        background: #f8f8f8;
        border-color: #ccc;
        color: #000;
      }

      canvas.light {
        border: 1px solid #000;
      }

      table.confusion-matrix td.light {
        color: #000;
        border-color: #aaa;
      }

      /* Dark Theme */
      body.dark {
        background-color: #0f4c75; 
        color: #fff;
      }
      
      .sidebar.dark {
        background: #2c2c2c;
        border-color: #444;
      }

      .sidebar.dark h3 {
        color: #fff;
      }

      .parameters.dark {
        background: #2c2c2c;
        border-color: #444;
        color: #fff;
      }

      canvas.dark {
        border: 1px solid #fff;
      }

      table.confusion-matrix td.dark {
        color: #fff;
        border-color: #aaa;
      }

      .toggle-container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }

      .toggle-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
        margin-right: 10px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 24px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #2196F3;
      }

      input:checked + .slider:before {
        transform: translateX(26px);
      }

      .toggle-label {
        font-size: 14px;
        display: flex;
        align-items: center;
      }

      .toggle-label span {
        margin-left: 5px;
      }
    </style>
  </head>
  <body class="dark">

    <?php include 'navigation.html'; ?>
    
    <div id="content-row">
      <div class="sidebar dark">
        <div class="toggle-container">
          <label class="toggle-switch">
            <input type="checkbox" id="themeToggle" />
            <span class="slider"></span>
          </label>
          <div class="toggle-label">
            <span id="themeText">Dark</span>
            <span id="themeIcon">🌙</span>
          </div>
        </div>
        <h3>Select Dataset</h3>
        <div id="datasetButtons">
          <button onclick="selectDataset('A')">Dataset A (Linear)</button>
          <button onclick="selectDataset('B')">Dataset B (Circular)</button>
          <button onclick="selectDataset('C')">Dataset C (Noisy)</button>
        </div>
        <br>
        <h3>Select Model</h3>
        <div id="modelButtons">
          <button onclick="selectModel('logistic')">Logistic Regression (LR)</button>
          <button onclick="selectModel('knn')">K-Nearest Neighbors (KNN)</button>
          <button onclick="selectModel('dt')">Decision Tree (DT)</button>
          <button onclick="selectModel('svm')">Support Vector Machine (SVM)</button>
          <button onclick="selectModel('perceptron')">Perceptron</button>
          <button onclick="selectModel('ensemble')">Ensemble</button>
        </div>
      </div>
      <div id="right-panel" class="dark">
        <div id="canvas-row">
          <canvas
            id="modelVisCanvas"
            width="500"
            height="500"
            class="dark"
            style="margin-right: 10px;"
          ></canvas>
          <canvas id="modelCanvas" width="500" height="500" class="dark"></canvas>
        </div>
        <div
          id="dtControls"
          style="display: none; margin-top: 10px;"
        >
          <label for="depthSlider">
            Tree Depth: <span id="depthValue">2</span>
          </label><br />
          <input
            type="range"
            min="1"
            max="5"
            value="2"
            id="depthSlider"
            onchange="updateDepth(this.value)"
          />
        </div>
        <div id="parameterBox" class="parameters dark"></div>
      </div>
    </div>
    <div
      id="demo-copyright"
      style="
        font-family: Arial, sans-serif;
        text-align: center;
        font-size: 1rem;
        margin: 5px 0;
        padding: 20px 20px;
        letter-spacing: 1px;
      "
    >
      Copyright © 2025 Zoé Victoria Lord
    </div>

    <!-- JavaScript -->
    <script src="ml_demo.js"></script>

    <!-- Toggle Theme -->
    <script>
      const themeToggle = document.getElementById("themeToggle");
      const body = document.body;
      const sidebar = document.querySelector(".sidebar");
      const rightPanel = document.getElementById("right-panel");
      const parameterBox = document.getElementById("parameterBox");
      const themeText = document.getElementById("themeText");
      const themeIcon = document.getElementById("themeIcon");
      themeToggle.checked = true;
      themeToggle.addEventListener("change", function() {
        if (this.checked) {
          body.classList.remove("light");
          body.classList.add("dark");
          sidebar.classList.remove("light");
          sidebar.classList.add("dark");
          rightPanel.classList.remove("light");
          rightPanel.classList.add("dark");
          parameterBox.classList.remove("light");
          parameterBox.classList.add("dark");
          themeText.textContent = "Dark";
          themeIcon.textContent = "🌙";
          document.querySelectorAll("canvas").forEach(c => {
            c.classList.remove("light");
            c.classList.add("dark");
          });
          document.querySelectorAll("table.confusion-matrix td").forEach(td => {
            td.classList.remove("light");
            td.classList.add("dark");
          });
        } else {
          body.classList.remove("dark");
          body.classList.add("light");
          sidebar.classList.remove("dark");
          sidebar.classList.add("light");
          rightPanel.classList.remove("dark");
          rightPanel.classList.add("light");
          parameterBox.classList.remove("dark");
          parameterBox.classList.add("light");
          themeText.textContent = "Light";
          themeIcon.textContent = "☀️";
          document.querySelectorAll("canvas").forEach(c => {
            c.classList.remove("dark");
            c.classList.add("light");
          });
          document.querySelectorAll("table.confusion-matrix td").forEach(td => {
            td.classList.remove("dark");
            td.classList.add("light");
          });
        }
      });
    </script>
  </body>
</html>
