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
    <title>Publications - Zoé Victoria Lord</title>
    <meta name="description" content="Zoé Victoria Lord, also known as Zoe Lord, is a French Canadian researcher in STEM, space medicine, and cognitive load.">
    <link rel="stylesheet" href="styles/base.css">
    <link rel="stylesheet" href="styles/navbar.css">
    <link rel="stylesheet" href="styles/footer.css">
    <link rel="stylesheet" href="styles/publications.css">
</head>

<body>
    <!-- Navigation -->
    <?php include 'navigation.html'; ?>

    <!-- Animated Background -->
    <canvas id="orb-canvas"></canvas>

    <!-- Publications Section -->
    <main class="pub-container">
        <!-- Header Title -->
        <div class="pub-header">
            <h1>Publications</h1>
        </div>
        
        <!-- Text Content -->
        <div class="pub-text">
            <p>Stay up to date with Zoé's latest publications below. More coming soon!</p>

            <ul class="pub-list">
                <li>
                    <img src="images/alumni_medal_2025_3.webp" alt="Event Icon" class="pub-img">
                    <a href="https://doi.org/10.1038/s41526-026-00577-1" target="_blank">
                        <p><strong>Lord, Z. <em>et al.</em> A high-fidelity simulator for evaluation of hemodynamic response during cardiopulmonary resuscitation in hypogravity environments. <em>npj Microgravity</em> (2026).</strong></p> 
                    </a>
                </li>
            </ul>
        </div>
    </main>

    <!-- Footer -->
    <?php include 'footer.html'; ?>

    <!-- JavaScript -->
    <script src="scripts/orbs.js"></script>
</body>
</html>
