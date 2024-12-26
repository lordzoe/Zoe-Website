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
        <div class="tech-header speaking-header">
            <h1>Technical Skills</h1>
        </div>

        <!-- Section 1 -->
        <section class="tech-section" style="background-image: url('images/headshot_image.jpg');">
            <div class="tech-content">
                <div class="tech-text">
                    <h2>Programming Languages</h2>
                    <p>
                        Proficient in Python, JavaScript, and C++. Experience building interactive applications and conducting data analysis.
                    </p>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#9664;</button>
                        <div class="gallery-items">
                            <img src="images/eva_2024_2.jpg" alt="Programming 1">
                            <img src="images/eva_2024_4.jpg" alt="Programming 2">
                            <video autoplay muted loop>
                                <source src="videos/eva_2024_1.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#9654;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 2 -->
        <section class="tech-section" style="background-image: url('images/headshot_image.jpg');">
            <div class="tech-content reverse-layout">
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#9664;</button>
                        <div class="gallery-items">
                            <img src="images/iac_2024_1.png" alt="Hardware 1">
                            <video autoplay muted loop>
                                <source src="videos/eva_2024_3.mp4" type="video/mp4">
                            </video>
                            <img src="images/iac_2024_5.jpg" alt="Hardware 2">
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#9654;</button>
                    </div>
                </div>
                <div class="tech-text">
                    <h2>Hardware Development</h2>
                    <p>
                        Experience with Arduino projects, including sensor integration and wireless data transmission using NRF24L01 modules.
                    </p>
                </div>
            </div>
        </section>

        <!-- Section 3 -->
        <section class="tech-section" style="background-image: url('images/headshot_image.jpg');">
            <div class="tech-content">
                <div class="tech-text">
                    <h2>Data Analysis</h2>
                    <p>
                        Skilled in analyzing physiological sensor data like ECG and GSR. Expertise in feature extraction and machine learning integration.
                    </p>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#9664;</button>
                        <div class="gallery-items">
                            <img src="images/data1.jpg" alt="Data 1">
                            <img src="images/data2.jpg" alt="Data 2">
                            <video autoplay muted loop>
                                <source src="videos/data.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#9654;</button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <?php include 'footer.html'; ?>

    <!-- JavaScript -->
    <script src="tech_gallery.js"></script>
    <script src="script.js"></script>

</body>
</html>
