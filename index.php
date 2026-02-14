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
    <title>Home - Zoé Victoria Lord</title>
    <meta name="description" content="Zoe Victoria Lord, also known as Zoe Lord, is a Canadian researcher in STEM, space medicine, and cognitive load.">
    <link rel="stylesheet" href="styles/base.css">
    <link rel="stylesheet" href="styles/navbar.css">
    <link rel="stylesheet" href="styles/footer.css">
    <link rel="stylesheet" href="styles/index.css">
</head>

<body>
    <!-- Navigation -->
    <?php include 'navigation.html'; ?>

    <!-- Background Image -->
    <div class="background-image"></div>

    <!-- Animated Background -->
    <canvas id="orb-canvas"></canvas>

    <!-- Main Index Section -->
    <main class="index-container">
    <div id="index-content" class="index-content">
        <h1>Exploring the Frontiers of Science and Engineering</h1>
        <p>
        A journey of interdisciplinary research, from cognitive load to 
        medical technologies for spaceflight environments. Discovering 
        how curiosity and persistence can push us towards new horizons 
        in human exploration.
        </p>
        <a href="in_the_news.php" class="index-button">Learn More</a>
    </div>
    </main>

    <!-- Footer -->
    <?php include 'footer.html'; ?>

    <!-- JavaScript -->
    <script src="script.js"></script>
</body>
</html>
