<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zoé Victoria Lord - Home</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <?php include 'navigation.html'; ?>

    <!-- Main Content -->
    <main>
        <h2>Welcome to Zoé Victoria Lord's website</h2>
        <p>Here you will find information about me and my projects.</p>

        <section class="content-container">

            <!-- Content Box 1 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="image.png" alt="Silk Roads">
                </div>
                <div class="content-info">
                    <h2>Silk Roads</h2>
                    <p>Exhibition: 26 September 2024 – 23 February 2025</p>
                </div>
                <div class="content-details">
                    <?php include('silk_roads.html'); ?>
                </div>
            </div>

            <!-- Content Box 2 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="image.png" alt="Hew Locke">
                </div>
                <div class="content-info">
                    <h2>Hew Locke</h2>
                    <p>Exhibition: 17 October 2024 – 9 February 2025</p>
                </div>
                <div class="content-details">
                    <?php include('hew_locke.html'); ?>
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

    <script>
        function expandBox(box) {
            document.querySelectorAll('.content-box').forEach(b => b.classList.remove('expanded'));
            box.classList.add('expanded');
            document.querySelector('.blur-overlay').classList.add('active');
        }

        function closeBox() {
            document.querySelectorAll('.content-box').forEach(b => b.classList.remove('expanded'));
            document.querySelector('.blur-overlay').classList.remove('active');
        }
    </script>

    <?php include 'footer.html'; ?>
</body>
</html>
