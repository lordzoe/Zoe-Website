<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="images/favicon.png" type="image/png" sizes="16x16">
    <link rel="icon" href="images/favicon.png" type="image/png" sizes="32x32">
    <link rel="apple-touch-icon" href="images/favicon.png">
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

            <!-- Content Box 1 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/iac_2024_1.png" alt="IAC Conference 2024">
                </div>
                <div class="content-info">
                    <h2>Attending the IAC Conference</h2>
                    <p>October 2024</p>
                </div>
                <div class="content-details">
                    <?php include('iac_2024.html'); ?>
                </div>
            </div>

            <!-- Content Box 2 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <video autoplay muted loop playsinline>
                        <source src="videos/eva_2024_1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="content-info">
                    <h2>Conducting Research in EVA Space Suit</h2>
                    <p>October 2024</p>
                </div>
                <div class="content-details">
                    <?php include('eva_2024.html'); ?>
                </div>
            </div>

            <!-- Content Box 3 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/USNA_2024_1.jpg" alt="USNA">
                </div>
                <div class="content-info">
                    <h2>Visiting the United States Naval Academy</h2>
                    <p>October 2024</p>
                </div>
                <div class="content-details">
                    <?php include('USNA_2024.html'); ?>
                </div>
            </div>

            <!-- Content Box 4 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/science_rendezvous_2024_1.jpg" alt="Science Rendezvous 2">
                </div>
                <div class="content-info">
                    <h2>Science Rendezvous!</h2>
                    <p>May 2024</p>
                </div>
                <div class="content-details">
                    <?php include('science_rendezvous_2024.html'); ?>
                </div>
            </div>

            <!-- Content Box 5 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/solar_eclipse_2024_1.jpg" alt="Solar Eclipse">
                </div>
                <div class="content-info">
                    <h2>Total Solar Eclipse Ambassador</h2>
                    <p>April 2024</p>
                </div>
                <div class="content-details">
                    <?php include('solar_eclipse_2024.html'); ?>
                </div>
            </div>

            <!-- Content Box 6 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/hackathon_2024_1.png" alt="Hackthon">
                </div>
                <div class="content-info">
                    <h2>Next Generation Medical Simulation Hackathon</h2>
                    <p>February 2024</p>
                </div>
                <div class="content-details">
                    <?php include('hackathon_2024.html'); ?>
                </div>
            </div>

            <!-- Content Box 7 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/cognitive_load_2023_1.jpg" alt="Cognitive Load in VR">
                </div>
                <div class="content-info">
                    <h2>Conducting Research in VR</h2>
                    <p>December 2023</p>
                </div>
                <div class="content-details">
                    <?php include('cognitive_load_2023.html'); ?>
                </div>
            </div>

            <!-- Content Box 8 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/space_medicine_2023_1.jpg" alt="Space Medicine">
                </div>
                <div class="content-info">
                    <h2>Venturing Into the Lava Tubes</h2>
                    <p>September 2023</p>
                </div>
                <div class="content-details">
                    <?php include('space_medicine_2023.html'); ?>
                </div>
            </div>

            <!-- Content Box 9 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <video autoplay muted loop playsinline>
                        <source src="videos/CAN-RGX_2023_1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="content-info">
                    <h2>Conducting Research in Microgravity</h2>
                    <p>August 2023</p>
                </div>
                <div class="content-details">
                    <?php include('CAN-RGX_2023.html'); ?>
                </div>
            </div>

            <!-- Content Box 10 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/PADI_2023_1.jpg" alt="PADI">
                </div>
                <div class="content-info">
                    <h2>PADI Scuba Diving</h2>
                    <p>July 2023</p>
                </div>
                <div class="content-details">
                    <?php include('PADI_2023.html'); ?>
                </div>
            </div>

            <!-- Content Box 11 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/CSC_2023_1.jpg" alt="CSC">
                </div>
                <div class="content-info">
                    <h2>Attending the CSC Conference</h2>
                    <p>June 2023</p>
                </div>
                <div class="content-details">
                    <?php include('CSC_2023.html'); ?>
                </div>
            </div>

            <!-- Content Box 12 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <video autoplay muted loop playsinline>
                        <source src="videos/science_rendezvous_2023_1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="content-info">
                    <h2>Science Rendezvous! 2023</h2>
                    <p>May 2023</p>
                </div>
                <div class="content-details">
                    <?php include('science_rendezvous_2023.html'); ?>
                </div>
            </div>

            <!-- Content Box 13 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/IIAS_2023_1.jpg" alt="IIAS">
                </div>
                <div class="content-info">
                    <h2>Training with IIAS</h2>
                    <p>March 2023</p>
                </div>
                <div class="content-details">
                    <?php include('IIAS_2023.html'); ?>
                </div>
            </div>

            <!-- Content Box 14 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/MSC_1_2022_1.jpg" alt="MSC 1">
                </div>
                <div class="content-info">
                    <h2>Visiting Pineview Public School</h2>
                    <p>October 2022</p>
                </div>
                <div class="content-details">
                    <?php include('MSC_1_2022.html'); ?>
                </div>
            </div>

            <!-- Content Box 15 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/iac_2022_1.jpg" alt="IAC Conference 2022">
                </div>
                <div class="content-info">
                    <h2>Attending the IAC Conference</h2>
                    <p>September 2022</p>
                </div>
                <div class="content-details">
                    <?php include('iac_2022.html'); ?>
                </div>
            </div>

            <!-- Content Box 16 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/graduation_2022_1.jpg" alt="Graduation 2">
                </div>
                <div class="content-info">
                    <h2>Graduating from 2nd Bachelors</h2>
                    <p>June 2022</p>
                </div>
                <div class="content-details">
                    <?php include('graduation_2022.html'); ?>
                </div>
            </div>

            <!-- Content Box 17 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/student_leadership_2022_1.jpg" alt="Student Leadership Conference">
                </div>
                <div class="content-info">
                    <h2>Attending the Student Leadership Conference</h2>
                    <p>May 2022</p>
                </div>
                <div class="content-details">
                    <?php include('student_leadership_2022.html'); ?>
                </div>
            </div>

            <!-- Content Box 18 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <video autoplay muted loop playsinline>
                        <source src="videos/research_assistant_2022_1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="content-info">
                    <h2>Engineering CPR Manikin Testing Platform</h2>
                    <p>May 2022</p>
                </div>
                <div class="content-details">
                    <?php include('research_assistant_2022.html'); ?>
                </div>
            </div>

            <!-- Content Box 19 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/undergraduate_thesis_2022_1.jpg" alt="Undergraduate Thesis">
                </div>
                <div class="content-info">
                    <h2>Stabilizing Perovskite Nanocrystals</h2>
                    <p>January 2022</p>
                </div>
                <div class="content-details">
                    <?php include('undergraduate_thesis_2022.html'); ?>
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
    <script src="script.js"></script>

    <?php include 'footer.html'; ?>
</body>
</html>
