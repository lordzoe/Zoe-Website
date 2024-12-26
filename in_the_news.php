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
                    <h2>Attending the IAC Conference 2024</h2>
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
                    <h2>EVA Space Suit Evaluation Course 2024</h2>
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
                    <h2>Science Rendezvous! 2024</h2>
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
                    <h2>Total Solar Eclipse 2024</h2>
                    <p>April 2024</p>
                </div>
                <div class="content-details">
                    <?php include('solar_eclipse_2024.html'); ?>
                </div>
            </div>

            <!-- Content Box 6 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/hackathon_2024_1.jpg" alt="Hackthon">
                </div>
                <div class="content-info">
                    <h2>Next Generation Medical Simulation Hackathon 2024</h2>
                    <p>February 2024</p>
                </div>
                <div class="content-details">
                    <?php include('hackathon_2024.html'); ?>
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
