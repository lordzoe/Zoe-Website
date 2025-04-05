<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="favicon.png" type="image/png" sizes="16x16">
    <link rel="icon" href="favicon.png" type="image/png" sizes="32x32">
    <link rel="apple-touch-icon" href="favicon.png">
    <title>News - Zoé Victoria Lord</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>

<body>

    <!-- Navigation -->
    <?php include 'navigation.html'; ?>

    <!-- Animated Background -->
    <canvas id="orb-canvas"></canvas>

    <!-- News Section -->
    <main class="news-container">
        <!-- Header Title -->
        <div class="news-header">
            <h1>In the News</h1>
        </div>

        <!-- Content Boxes Section -->
        <section class="content-container">

            <!-- Content Box 20 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/GRC_2025.html">
                <div class="content-image">
                    <img data-src="images/GRC_2025_1.webp" alt="GRC 2025" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Founding the Gravitas Research Corps</h2>
                    <p>January 2025</p>
                </div>
            </div>

            <!-- Content Box 19 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/iac_2024.html">
                <div class="content-image">
                    <img data-src="images/iac_2024_1.webp" alt="IAC Conference 2024" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Attending the IAC Conference</h2>
                    <p>October 2024</p>
                </div>
            </div>

            <!-- Content Box 18 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/eva_2024.html">
                <div class="content-image">
                    <video class="lazyload" muted loop playsinline>
                        <source data-src="videos/eva_2024_1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="content-info">
                    <h2>Conducting Research in EVA Space Suit</h2>
                    <p>October 2024</p>
                </div>
            </div>

            <!-- Content Box 17 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/USNA_2024.html">
                <div class="content-image">
                    <img data-src="images/USNA_2024_1.webp" alt="USNA" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Visiting the United States Naval Academy</h2>
                    <p>October 2024</p>
                </div>
            </div>

            <!-- Content Box 16 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/science_rendezvous_2024.html">
                <div class="content-image">
                    <img data-src="images/science_rendezvous_2024_1.webp" alt="Science Rendezvous 2" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Science Rendezvous!</h2>
                    <p>May 2024</p>
                </div>
            </div>

            <!-- Content Box 15 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/solar_eclipse_2024.html">
                <div class="content-image">
                    <img data-src="images/solar_eclipse_2024_1.webp" alt="Solar Eclipse" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Total Solar Eclipse Ambassador</h2>
                    <p>April 2024</p>
                </div>
            </div>

            <!-- Content Box 14 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/hackathon_2024.html">
                <div class="content-image">
                    <img data-src="images/hackathon_2024_1.webp" alt="Hackathon" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Next Generation Medical Simulation Hackathon</h2>
                    <p>February 2024</p>
                </div>
            </div>

            <!-- Content Box 13 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/cognitive_load_2023.html">
                <div class="content-image">
                    <img data-src="images/cognitive_load_2023_1.webp" alt="Cognitive Load in VR" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Conducting Research in VR</h2>
                    <p>December 2023</p>
                </div>
            </div>

            <!-- Content Box 12 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/space_medicine_2023.html">
                <div class="content-image">
                    <img data-src="images/space_medicine_2023_1.webp" alt="Space Medicine" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Venturing Into the Lava Tubes</h2>
                    <p>September 2023</p>
                </div>
            </div>

            <!-- Content Box 11 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/CAN-RGX_2023.html">
                <div class="content-image">
                    <video class="lazyload" muted loop playsinline>
                        <source data-src="videos/CAN-RGX_2023_1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="content-info">
                    <h2>Conducting Research in Microgravity</h2>
                    <p>August 2023</p>
                </div>
            </div>

            <!-- Content Box 10 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/PADI_2023.html">
                <div class="content-image">
                    <img data-src="images/PADI_2023_1.webp" alt="PADI" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>PADI Scuba Diving</h2>
                    <p>July 2023</p>
                </div>
            </div>

            <!-- Content Box 9 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/CSC_2023.html">
                <div class="content-image">
                    <img data-src="images/CSC_2023_1.webp" alt="CSC" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Attending the CSC Conference</h2>
                    <p>June 2023</p>
                </div>
            </div>

            <!-- Content Box 8 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/science_rendezvous_2023.html">
                <div class="content-image">
                    <video class="lazyload" muted loop playsinline>
                        <source data-src="videos/science_rendezvous_2023_1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="content-info">
                    <h2>Science Rendezvous! 2023</h2>
                    <p>May 2023</p>
                </div>
            </div>

            <!-- Content Box 7 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/IIAS_2023.html">
                <div class="content-image">
                    <img data-src="images/IIAS_2023_1.webp" alt="IIAS" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Training with IIAS</h2>
                    <p>March 2023</p>
                </div>
            </div>

            <!-- Content Box 6 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/MSC_1_2022.html">
                <div class="content-image">
                    <img data-src="images/MSC_1_2022_1.webp" alt="MSC 1" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Visiting Pineview Public School</h2>
                    <p>October 2022</p>
                </div>
            </div>

            <!-- Content Box 5 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/iac_2022.html">
                <div class="content-image">
                    <img data-src="images/iac_2022_1.webp" alt="IAC Conference 2022" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Attending the IAC Conference</h2>
                    <p>September 2022</p>
                </div>
            </div>

            <!-- Content Box 4 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/graduation_2022.html">
                <div class="content-image">
                    <img data-src="images/graduation_2022_1.webp" alt="Graduation 2" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Graduating from 2nd Bachelors</h2>
                    <p>June 2022</p>
                </div>
            </div>

            <!-- Content Box 3 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/student_leadership_2022.html">
                <div class="content-image">
                    <img data-src="images/student_leadership_2022_1.webp" alt="Student Leadership Conference" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Attending the Student Leadership Conference</h2>
                    <p>May 2022</p>
                </div>
            </div>

            <!-- Content Box 2 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/research_assistant_2022.html">
                <div class="content-image">
                    <video class="lazyload" muted loop playsinline>
                        <source data-src="videos/research_assistant_2022_1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="content-info">
                    <h2>Engineering CPR Manikin Testing Platform</h2>
                    <p>May 2022</p>
                </div>
            </div>

            <!-- Content Box 1 -->
            <div class="content-box" onclick="expandBox(this)" data-content="content_box/undergraduate_thesis_2022.html">
                <div class="content-image">
                    <img data-src="images/undergraduate_thesis_2022_1.webp" alt="Undergraduate Thesis" class="lazyload">
                </div>
                <div class="content-info">
                    <h2>Stabilizing Perovskite Nanocrystals</h2>
                    <p>January 2022</p>
                </div>
            </div>

        </section>
    </main>

    <!-- Dedicated Overlay for Expanded Content -->
    <div class="expanded-overlay" id="expanded-overlay">
      <div class="expanded-content">
          <span class="expanded-close" onclick="closeBox()">×</span>
          <div id="expanded-box-content"></div>
      </div>
    </div>

    <!-- Image Lightbox Overlay -->
    <div class="image-lightbox" id="image-lightbox">
        <span class="lightbox-close" id="lightbox-close">&times;</span>
        <div class="lightbox-arrow left" id="lightbox-prev">&#10094;</div>
        <div class="lightbox-arrow right" id="lightbox-next">&#10095;</div>
        <div id="lightbox-content" style="display: flex; justify-content: center; align-items: center;"></div>
    </div>

    <!-- JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js" async></script>
    <script src="script.js"></script>

    <?php include 'footer.html'; ?>
</body>
</html>
