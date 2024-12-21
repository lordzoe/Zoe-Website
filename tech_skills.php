<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="images/favicon.png" type="image/png" sizes="16x16">
    <link rel="icon" href="images/favicon.png" type="image/png" sizes="32x32">
    <link rel="apple-touch-icon" href="images/favicon.png">
    <title>Technical Skills - Zoé Victoria Lord</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>

<body>
    <!-- Navigation -->
    <?php include 'navigation.html'; ?>

    <!-- Animated Background -->
    <canvas id="orb-canvas"></canvas>

    <!-- Tech Skills Section -->
    <main class="tech-container">
        <!-- Header Title -->
        <div class="tech-header">
            <h1>Technical Skills</h1>
            <p>Explore my technical expertise and projects that highlight my skill set.</p>
        </div>
        
        <!-- Skills and Projects Timeline -->
        <section class="timeline">
            <!-- Skill 1 -->
            <div class="timeline-item">
                <div class="timeline-content">
                    <h2>Web Development</h2>
                    <p>Proficient in HTML, CSS, JavaScript, and PHP for creating dynamic, responsive websites.</p>
                    <img src="images/webdev.png" alt="Web Development">
                </div>
            </div>

            <!-- Skill 2 -->
            <div class="timeline-item">
                <div class="timeline-content">
                    <h2>Data Analysis</h2>
                    <p>Experienced in Python, MATLAB, and R for statistical analysis and visualization.</p>
                    <img src="images/data-analysis.png" alt="Data Analysis">
                </div>
            </div>

            <!-- Skill 3 -->
            <div class="timeline-item">
                <div class="timeline-content">
                    <h2>Embedded Systems</h2>
                    <p>Hands-on experience with Arduino and Raspberry Pi for IoT and hardware integration projects.</p>
                    <img src="images/embedded-systems.png" alt="Embedded Systems">
                </div>
            </div>

            <!-- Skill 4 -->
            <div class="timeline-item">
                <div class="timeline-content">
                    <h2>Machine Learning</h2>
                    <p>Developed predictive models using TensorFlow, Scikit-learn, and other ML frameworks.</p>
                    <img src="images/machine-learning.png" alt="Machine Learning">
                </div>
            </div>
        </section>
    </main>

    <!-- JavaScript -->
    <script src="script.js"></script>

    <!-- Footer -->
    <?php include 'footer.html'; ?>    
</body>
</html>
