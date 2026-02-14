<?php
// iOS detection (runs once per request)
$is_ios = isset($_SERVER['HTTP_USER_AGENT']) && preg_match('/iPhone|iPad|iPod/i', $_SERVER['HTTP_USER_AGENT']);
// (Optional but good if you use caching/CDN)
// header('Vary: User-Agent');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <title>Technical Skills - Zoé Victoria Lord</title>
    <meta name="description" content="Zoe Victoria Lord, also known as Zoe Lord, is a Canadian researcher in STEM, space medicine, and cognitive load.">
    <link rel="stylesheet" href="styles/base.css">
    <link rel="stylesheet" href="styles/navbar.css">
    <link rel="stylesheet" href="styles/footer.css">
    <link rel="stylesheet" href="styles/components.css">
    <link rel="stylesheet" href="styles/overlays.css">
    <link rel="stylesheet" href="styles/tech.css">
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
        <section class="tech-section" style="background-image: url('images/section_1_image.webp');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Virtual Reality Gaming Development</h2>
                        <p></p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Virtual Reality (VR)</li>
                            <li>Extended Reality (XR)</li>
                            <li>Unity Gaming Engine</li>
                            <li>C#</li>
                            <li>Lab Streaming Layer (LSL) Library</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <!-- <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button> -->
                        <div class="gallery-items">
                            <video autoplay muted loop style="object-fit: fill;">
                                <?php if (!$is_ios): ?>
                                  <source src="videos/cognitive_load_2023_4.webm" type="video/webm">
                                <?php endif; ?>
                                <source src="videos/cognitive_load_2023_4.mp4" type="video/mp4">
                            </video>
                        </div>
                        <!-- <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button> -->
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 2 -->
        <section class="tech-section" style="background-image: url('images/section_2_image.webp');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Neuroimaging and Cognitive Science</h2>
                        <p></p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>functional Near-Infrared Spectroscopy (fNIRS)</li>
                            <li>Cognitive Load</li>
                            <li>OxySoft Software</li>
                            <li>PsychoPy Software</li>
                            <li>MATLAB</li>
                            <li>FieldTrip Toolbox</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <!-- <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button> -->
                        <div class="gallery-items">
                            <video autoplay muted loop style="object-fit: contain; background-color: #BABCB8;">
                                <?php if (!$is_ios): ?>
                                  <source src="videos/tech_skills_neuro_1.webm" type="video/webm">
                                <?php endif; ?>
                                <source src="videos/tech_skills_neuro_1.mp4" type="video/mp4">
                            </video>
                        </div>
                        <!-- <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button> -->
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 3 -->
        <section class="tech-section" style="background-image: url('images/section_3_image.webp');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Human-Computer Interactions</h2>
                        <p></p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Eye-Tracking</li>
                            <li>Cognitive Load</li>
                            <li>IBM SPSS Statistics Software</li>
                            <li>Python</li>
                            <li>SRanipal Runtime SDK</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <!-- <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button> -->
                        <div class="gallery-items">
                            <video autoplay muted loop style="object-fit: fill;">
                                <?php if (!$is_ios): ?>
                                  <source src="videos/tech_skills_human-computer_1.webm" type="video/webm">
                                <?php endif; ?>
                                <source src="videos/tech_skills_human-computer_1.mp4" type="video/mp4">
                            </video>
                        </div>
                        <!-- <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button> -->
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 4 -->
        <section class="tech-section" style="background-image: url('images/section_4_image.webp');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Machine Learning</h2>
                        <p></p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Data Preprocessing</li>
                            <li>Feature Engineering</li>
                            <li>Cross-Validation</li>
                            <li>Hyperparameter Tuning</li>
                            <li>Advanced Ensemble Methods</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media" onclick="expandDemoBox('ml_demo.html')" style="position: relative; cursor: pointer;">
                    <div class="tech-gallery">
                        <div class="gallery-items">
                            <img src="images/ml_demo.webp" alt="Demo Preview" style="width: 100%; object-fit: fill;">
                            <div  style="position: absolute; top: 28%; left: 50%; transform: translate(-50%, -50%);">
                                <a href="javascript:void(0)" class="index-button" style="text-align: center;" onclick="expandDemoBox('ml_demo.html')">
                                    Click Here to Try the Interactive Demo!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 5 -->
        <section class="tech-section" style="background-image: url('images/section_5_image.webp');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Biomechanical Testing Platforms</h2>
                        <p></p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Cardiopulmonary Rescuscitation (CPR)</li>
                            <li>Cardiovascular Fluid Dynamics</li>
                            <li>Catheter Pressure Transducer</li>
                            <li>Electric Linear Actuator</li>
                            <li>3D-Printing and CAD Modeling</li>
                            <li>SolidWorks Software</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <video autoplay muted loop>
                                <?php if (!$is_ios): ?>
                                  <source src="videos/research_assistant_2022_1.webm" type="video/webm">
                                <?php endif; ?>
                                <source src="videos/research_assistant_2022_1.mp4" type="video/mp4">
                            </video>

                            <img src="images/tech_skills_biomechanical_2.webp" alt="Biomechanical 2">
                            <img src="images/tech_skills_biomechanical_3.webp" alt="Biomechanical 3">
                            <img src="images/tech_skills_biomechanical_4.webp" alt="Biomechanical 4">
                            <img src="images/tech_skills_biomechanical_5.webp" alt="Biomechanical 5">
                            <img src="images/tech_skills_biomechanical_6.webp" alt="Biomechanical 6" style="object-fit: fill;">
                            <img src="images/tech_skills_biomechanical_7.webp" alt="Biomechanical 7" style="object-fit: fill;">

                            <video autoplay muted loop>
                                <?php if (!$is_ios): ?>
                                  <source src="videos/tech_skills_biomechanical_8.webm" type="video/webm">
                                <?php endif; ?>
                                <source src="videos/tech_skills_biomechanical_8.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 6 -->
        <section class="tech-section" style="background-image: url('images/section_6_image.webp'); background-size: cover;">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Biomonitoring and Microcontroller Systems</h2>
                        <p></p>
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
                            <img src="images/tech_skills_biomonitoring_1.webp" alt="Biomonitoring 1">
                            <img src="images/tech_skills_biomonitoring_2.webp" alt="Biomonitoring 2">
                            <img src="images/tech_skills_biomonitoring_3.webp" alt="Biomonitoring 3">
                            <img src="images/tech_skills_biomonitoring_4.webp" alt="Biomonitoring 4">
                            <img src="images/tech_skills_biomonitoring_5.webp" alt="Biomonitoring 5">
                            <img src="images/eva_2024_2.webp" alt="Biomonitoring 6">
                            <img src="images/eva_2024_5.webp" alt="Biomonitoring 7">
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 7 -->
        <section class="tech-section" style="background-image: url('images/section_7_image.webp'); background-size: cover;">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Perovskite Nanoparticle Synthesis</h2>
                        <p></p>
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
                    <div class="tech-gallery perovskite">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/undergraduate_thesis_2022_4.webp" alt="Perovskite 1">
                            <img src="images/tech_skills_perovskite_2.webp" alt="Perovskite 2" style="object-fit: fill;">
                            <img src="images/undergraduate_thesis_2022_5.webp" alt="Perovskite 3">
                            <img src="images/tech_skills_perovskite_4.webp" alt="Perovskite 4" style="object-fit: fill;">
                            <img src="images/tech_skills_perovskite_5.webp" alt="Perovskite 5" style="object-fit: fill;">
                            <img src="images/tech_skills_perovskite_6.webp" alt="Perovskite 6" style="object-fit: fill;">
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 8 -->
        <section class="tech-section" style="background-image: url('images/section_8_image.webp')">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Web Development and Backend Design</h2>
                        <p></p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>JavaScript</li>
                            <li>HTML/CSS</li>
                        </ul>
                    </div>
                </div>
                <!-- No video in this section -->
            </div>
        </section>

        <!-- Overlay for Expanded Content -->
        <div class="expanded-overlay" id="expanded-overlay">
            <div class="expanded-content-ml-demo">
                <span class="expanded-close" onclick="closeDemoBox()">×</span>
                <div id="expanded-box-content"></div>
            </div>
        </div>

    </main>

    <!-- Footer -->
    <?php include 'footer.html'; ?>
    
    <!-- JavaScript -->
    <script src="scripts/orbs.js"></script>
    <script src="scripts/tech.js"></script>
    <script src="ml_demo.js"></script>
</body>
</html>
