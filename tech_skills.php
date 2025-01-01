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
        <section class="tech-section" style="background-image: url('images/section_1_image.jpg');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Virtual Reality Gaming Development</h2>
                        <p>
                            Text here.
                        </p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Virtual Reality (VR)</li>
                            <li>Extended Reality (XR)</li>
                            <li>Unity Engine</li>
                            <li>C#</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/CAN-RGX_2023_2.jpg" alt="VR Project 1">
                            <img src="images/CAN-RGX_2023_3.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/CAN-RGX_2023_1.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 2 -->->
        <section class="tech-section" style="background-image: url('images/section_2_image.jpg');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Neuroimaging and Cognitive Science</h2>
                        <p>
                            Text here.
                        </p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>functional Near-Infrared Spectroscopy (fNIRS)</li>
                            <li>Cognitive Load</li>
                            <li>OxySoft</li>
                            <li>PsychoPy</li>
                            <li>Python</li>
                            <li>MATLAB</li>
                            <li>FieldTrip</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>


        <!-- Section 3 -->
        <section class="tech-section" style="background-image: url('images/section_3_image.jpg');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Human-Computer Interactions</h2>
                        <p>
                            Text here.
                        </p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Eye-Tracking</li>
                            <li>Cognitive Load</li>
                            <li>SRanipal Runtime</li>
                            <li>Python</li>
                            <li>IBM SPSS Statistics</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 4 -->
        <section class="tech-section" style="background-image: url('images/section_3_image.jpg');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Machine Learning Modelling</h2>
                        <p>
                            Text here.
                        </p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Random Forest</li>
                            <li>Support Vector Machine (SVM)</li>
                            <li>Linear Regression</li>
                            <li>Linear Discriminant Analysis (LDA)</li>
                            <li>Convolutional Neural Networks (CNNs)</li>
                            <li>Recurrent Neural Networks (RNNs)</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 5 -->
        <section class="tech-section" style="background-image: url('images/section_4_image.jpg');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Biomechanical Testing Platforms</h2>
                        <p>
                            Text here.
                        </p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Cardiopulmonary Rescuscitation (CPR)</li>
                            <li>Cardiovascular Fluid Dynamics</li>
                            <li>FISO Pressure Transducer</li>
                            <li>Electric Linear Actuator</li>
                            <li>3D Printing</li>
                            <li>SolidWorks</li>
                            <li>Evolution</li>
                            <li>Python</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 6 -->
        <section class="tech-section" style="background-image: url('images/section_5_image.jpg'); background-size: cover;">">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Biomonitoring and Microcontroller Systems</h2>
                        <p>
                            Text here.
                        </p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Microcontrollers and Electronics</li>
                            <li>Biomonitor Sensors</li>
                            <li>Tranceiver Modules</li>
                            <li>Soldering/Desoldering</li>
                            <li>Arduino IDE</li>
                            <li>Python</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 7 -->
        <section class="tech-section" style="background-image: url('images/section_6_image.jpg'); background-size: contain;">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Perovskite Nanoparticle Synthesis</h2>
                        <p>
                            Text here.
                        </p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Inorganic Synthesis</li>
                            <li>Microwave-Assisted Solvothermal Reactor</li>
                            <li>ATR-IR Spectroscopy</li>
                            <li>UV/VIS Spectroscopy</li>
                            <li>Powder X-Ray Diffraction (pXRD)</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 8 -->
        <section class="tech-section" style="background-image: url('images/section_7_image.jpg')">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Web Development and Backend Design</h2>
                        <p>
                            Text here.
                        </p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>JavaScript</li>
                            <li>HTML/CSS</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- Footer -->
    <?php include 'footer.html'; ?>

    <!-- JavaScript -->
    <script src="script.js"></script>

</body>
</html>
