<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News - Zoé Victoria Lord</title>
    <link rel="stylesheet" type="text/css" href="styles.css">

</head>
<body>
    <!-- Navigation -->
    <?php include 'navigation.html'; ?>

    <!-- Animated Background -->
    <canvas id="orb-canvas"></canvas>

    <!-- Main Content -->
    <main>
        <div class="news-header">
            <h1>In the News</h1>
        </div>
        <section class="content-container">

            <!-- Content Box 1 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="images/iac_2024_1.png" alt="IAC Conference 2024">
                </div>
                <div class="content-info">
                    <h2>IAC Conference 2024</h2>
                    <p>Exhibition: 26 September 2024 – 23 February 2025</p>
                </div>
                <div class="content-details">
                    <?php include('iac_2024.html'); ?>
                </div>
            </div>

            <!-- Content Box 2 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <video autoplay muted loop>
                        <source src="videos/eva_2024_1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="content-info">
                    <h2>EVA Space Suit Evaluation Course 2024</h2>
                    <p>Exhibition: 17 October 2024 – 9 February 2025</p>
                </div>
                <div class="content-details">
                    <?php include('eva_2024.html'); ?>
                </div>
            </div>

            <!-- Content Box 3 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="image.png" alt="Picasso">
                </div>
                <div class="content-info">
                    <h2>Picasso</h2>
                    <p>Exhibition: 7 November 2024 – 30 March 2025</p>
                </div>
                <div class="content-details">
                    <?php include('picasso.html'); ?>
                </div>
            </div>

        </section>
    </main>

    <!-- Blur Overlay -->
    <div class="blur-overlay" onclick="closeBox()"></div>

    <!-- Image Lightbox Overlay -->
    <div class="image-lightbox" id="image-lightbox">
        <span class="lightbox-close" id="lightbox-close">&times;</span>
        <div id="lightbox-content" style="display: flex; justify-content: center; align-items: center;"></div>
    </div>

    <!-- JavaScript -->
    <script src="script.js"></script>

    <?php include 'footer.html'; ?>    
</body>
</html>
